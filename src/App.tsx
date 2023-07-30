import React from 'react';
import './App.css';
import { GridSection, IGridSectionProps, IMainGrid, Status as CellStatus } from './GridSection';
import { Stack } from '@fluentui/react';


function App() {

  const nextId = React.useRef<number>(0);
  const gridHeight = React.useRef<number>(6);
  const gridWidth = React.useRef<number>(7);
  const [playerTurn, setPlayerTurn] = React.useState<number>(0);
  const [gameStarted, setGameStarted] = React.useState<boolean>(false);
  const [gameWinner, setGameWinner] = React.useState<number>(-1);
  const winningCellsRef =  React.useRef<IGridSectionProps[]>([]);

  // use this inside event handlers like onClick to get the latest state
  const turnRef = React.useRef(0);  

  React.useEffect(() => {
    turnRef.current = playerTurn

  }, [playerTurn]);

  const getUniqueId = () => {
    return nextId.current++;
  }

  const getCurrentPlayerStatus = () : CellStatus => {
    if (turnRef.current === 1)
      return CellStatus.Player1Owned
    else
      return CellStatus.Player2Owned
  };
 
  const onButtonClick = (event: React.MouseEvent, x: number, y: number) => {
    let tempGrid = playGrid.grid;
    tempGrid[y][x].status = getCurrentPlayerStatus(); 
    tempGrid[y][x].disabled = true;

    if (y > 0){
      tempGrid[y-1][x].status = CellStatus.Playable;
      tempGrid[y-1][x].disabled = false;
    }

    if (!checkWinCondition(tempGrid, x, y))
      setPlayerTurn(turnRef.current === 1 ? 2 : 1)
    else
      doWin();

    setPlayGrid({...playGrid, grid: tempGrid});
  };

  const getInitialGrid = () : IMainGrid => {
    let grid = [];
    for (let row = 0; row < gridHeight.current; row++) {
      let gridRow: IGridSectionProps[] = [];
      for (let col = 0; col < gridWidth.current; col++) {
        gridRow.push({
          id: getUniqueId(),
          y: row,
          x: col,
          disabled: true,
          winningCell: false,
          onClick: onButtonClick,
          status: CellStatus.Empty,
        } as IGridSectionProps);
      }
      if (row === gridHeight.current - 1) {
        for (let col = 0; col < gridWidth.current; col++)
          gridRow[col].status = CellStatus.Playable;
      }

      grid.push(gridRow);
    }  
    return {
      grid: grid
    };
  };

  const [playGrid, setPlayGrid] = React.useState<IMainGrid>(getInitialGrid());

  const resetPlayGrid = () => {
    let tempGrid = playGrid.grid;
    for (let row = 0; row < gridHeight.current; row++){
      for (let col = 0; col < gridWidth.current; col++){
        tempGrid[row][col].status = CellStatus.Empty;
        tempGrid[row][col].disabled = true;
        tempGrid[row][col].winningCell = false;
      }

      if (row === gridHeight.current - 1) {
        for (let col = 0; col < gridWidth.current; col++)
          tempGrid[row][col].status = CellStatus.Playable;
      }
    }
    setPlayGrid({...playGrid, grid: tempGrid});
  }

  const disablePlayGrid = () => {
    let tempGrid = playGrid.grid;
    for (let row = 0; row < gridHeight.current; row++){
      for (let col = 0; col < gridWidth.current; col++){
        tempGrid[row][col].disabled = true;
      }
    }
    setPlayGrid({...playGrid, grid: tempGrid});
  }

  const renderGrid = () : React.ReactNode => {

    const renderRow = (cells: IGridSectionProps[], idx: number) : React.ReactNode => {
      return (
        <Stack horizontal key={`row-${idx}`} style={{alignSelf: 'center'}}>
          {cells.map((c, i) => <GridSection key={`cell-${idx}-${i}}`} {...c} />)}
        </Stack>
      )
    }

    let grid = 
      <Stack>
        {playGrid.grid.map((gridRow, i) => {
          return renderRow(gridRow, i)
        })}
      </Stack>    

    return grid;
  }

  const getCurrentPlayerText = () => {
    return (
      <div style={{marginTop: '20px', fontFamily: 'Verdana, sans-serif', fontSize: '20px', color: 'white'}}>
        {playerTurn !== 0 ? `Player ${playerTurn}` : ''}
      </div>      
    )
  }

  const getWinnerText = () => {  
      return (
        <div style={{marginTop: '20px', fontFamily: 'Verdana, sans-serif', fontSize: '20px', color: 'white'}}>
          {`PLAYER ${playerTurn} WINS`}
        </div>      
      )
  }

  const onResetButtonClick = () => {
    setPlayerTurn(0);
    setGameStarted(false);
    resetPlayGrid();
    setGameWinner(-1);
  }

  const onStartGameClick = () => {
    let tempGrid = playGrid.grid;
    for (let col = 0; col < gridWidth.current; col++){
      tempGrid[gridHeight.current-1][col].disabled = false;
    }
    setPlayerTurn(1);
    setGameStarted(true);
    setPlayGrid({...playGrid, grid: tempGrid});
  }

  const highlightWinningCells = () => {
    let tempGrid: IGridSectionProps[][] = playGrid.grid;
    winningCellsRef.current.forEach(c => {
      tempGrid[c.y][c.x].winningCell = true;
    })
    setPlayGrid({...playGrid, grid: tempGrid});
  }

  const doWin = () => {
    setGameWinner(turnRef.current);
    disablePlayGrid();
    console.log(winningCellsRef.current);
    highlightWinningCells();
  }

  const checkWinCondition = (grid: IGridSectionProps[][], x: number, y: number) : boolean => {
    let winCells: IGridSectionProps[] = [];

    // check for vertical wins
    for (let row = y; row < gridHeight.current; row++) {
      if (y > 2) {
        break;
      }
      if (grid[row][x].status !== getCurrentPlayerStatus()) {
        break;
      }
      else {
        winCells.push(grid[row][x])
        if (winCells.length >= 4) {
          winningCellsRef.current = winCells;
          return true
        }
      }
    }

    // check for horizontal win
    winCells = [];
    let hLeft = -1;
    let hRight = -1;
    for (let col = x; col < gridWidth.current; col++) {
      if (grid[y][col].status === getCurrentPlayerStatus()) {
        winCells.push(grid[y][col]);
        hRight = col;
      }
      else {
        break;
      }
    }
    for (let col = x; col >= 0; col--) {
      if (grid[y][col].status === getCurrentPlayerStatus()) {
        hLeft = col;
        winCells.push(grid[y][col]);
      }
      else break;
    }
    if (hRight - hLeft >= 3) {
      winningCellsRef.current = winCells;
      return true;
    }

    // check for diagonal win
    // to top right and bottom left
    winCells = [];
    let left = -1;
    let right = -1;
    for (let row = y, col = x; row >= 0 && col < gridWidth.current; row--, col++) {
      if (grid[row][col].status === getCurrentPlayerStatus()) {
        right = col;
        winCells.push(grid[row][col])
      }
      else break;
    }
    for (let row = y, col = x; row < gridHeight.current && col >= 0; row++, col--) {
      if (grid[row][col].status === getCurrentPlayerStatus()) {
        left = col;
        winCells.push(grid[row][col])
      }
      else break;
    }
    if (right - left >= 3) {
      winningCellsRef.current = winCells;
      return true;
    }

    // to top left and bottom right
    winCells = [];
    left = right = -1;
    for (let row = y, col = x; row >= 0 && col >= 0; row--, col--) {
      if (grid[row][col].status === getCurrentPlayerStatus()) {
        left = col;
        winCells.push(grid[row][col])
      }
      else break;
    }
    for (let row = y, col = x; row < gridHeight.current && col < gridWidth.current; row++, col++) {
      if (grid[row][col].status === getCurrentPlayerStatus()) {
        right = col;
        winCells.push(grid[row][col])
      }
      else break;
    }
    if (right - left >= 3) {
      winningCellsRef.current = winCells;
      return true;
    }

    winCells = [];
    return false;
  }

  const buttonStyle: React.CSSProperties = {
    width: '80%', 
    minWidth: '125px', 
    height: '30px', 
    overflow: 'hidden', 
    whiteSpace: 'nowrap'
  }

  return (
    <div className="grid-container">
      <div className="main" style={{alignContent: 'center', fontSize: '50', fontWeight: 'bold'}}>
        {renderGrid()}
      </div>
      <div className="header">
        Connect Four
      </div>
      <div className="leftPanel">
        <Stack style={{alignItems: 'center', minWidth: '150px'}}>
          {!gameStarted &&
            <button
              onClick={onStartGameClick}
              style={buttonStyle}
            >
              Start Game Yaya
            </button>
          }
          {gameStarted &&
            <button
              onClick={onResetButtonClick}
              style={buttonStyle}
            >
              Reset Game
            </button>
          }
          {gameWinner === -1 &&
            getCurrentPlayerText()
          }
          {gameWinner != -1 &&
            getWinnerText()
          }     
        </Stack>
      </div>
      <div className="rightPanel" style={{border: "1px solid black"}}>
        rightPanel
      </div>

    </div>
  );
}

export default App;
