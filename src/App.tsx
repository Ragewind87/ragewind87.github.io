import React from 'react';
import './App.css';
import { GridSection, IGridSectionProps, IMainGrid, Status as CellStatus } from './GridSection';
import { Stack } from '@fluentui/react';
import KayBearIcon from './Icons/kaybearIcon.png';
import ZoeyIcon from './Icons/zoeyIcon.png';
import Xarrow, { Xwrapper } from 'react-xarrows';

interface ArrowStartEnd {
  start: string;
  end: string;
  startOffset: Coordinate;
  endOffset: Coordinate;
}

interface Coordinate {
  x: number;
  y: number;
}

function App() {

  const nextId = React.useRef<number>(0);
  const gridHeight = React.useRef<number>(6);
  const gridWidth = React.useRef<number>(7);
  const [playerTurn, setPlayerTurn] = React.useState<number>(0);
  const [gameWinner, setGameWinner] = React.useState<number>(-1);
  const winningCellsRef =  React.useRef<IGridSectionProps[]>([]);
  const [mouseOverColumn, setMouseOverColumn] = React.useState<number>(-1);
  const [arrowStartEnd, setArrowStartEnd] = React.useState<ArrowStartEnd>({
    start: '', end: '', startOffset: {x: 0, y: 0}, endOffset: {x: 0, y: 0}
  });

  // use this inside event handlers like onClick to get the latest state
  const turnRef = React.useRef(0);

  React.useEffect(() => {
    turnRef.current = playerTurn
  }, [playerTurn]);

  React.useEffect(() => {
    console.log(arrowStartEnd);
  }, [arrowStartEnd])

  const getUniqueId = () => {
    return nextId.current++;
  }

  const getCurrentPlayerStatus = () : CellStatus => {
    if (turnRef.current === 1)
      return CellStatus.Player1Owned
    else
      return CellStatus.Player2Owned
  };

  const updateMouseoverColumn = React.useCallback((column: number) => {
    setMouseOverColumn(column);
  }, []);

  const onCellClick = (event: React.MouseEvent, x: number, y: number) => {
    let tempGrid = playGrid.grid;

    let playableY = 0;
    while (tempGrid[playableY][x].status !== CellStatus.Playable) {
      playableY++;
    }

    if (tempGrid[playableY][x].status !== CellStatus.Playable)
      return;


    tempGrid[playableY][x].status = getCurrentPlayerStatus();

    if (playableY > 0)
      tempGrid[playableY-1][x].status = CellStatus.Playable;

    if (!checkWinCondition(tempGrid, x, playableY))
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
          disabled: false,
          winningCell: false,
          gameOver: false,
          onClick: onCellClick,
          status: CellStatus.Empty,
          columnIsMouseover: false,
          setMouseoverColumn: updateMouseoverColumn
        } as IGridSectionProps);
      }
      if (row === gridHeight.current - 1) {
        for (let col = 0; col < gridWidth.current; col++){
          gridRow[col].status = CellStatus.Playable;
          gridRow[col].disabled = false;
        }
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
        tempGrid[row][col].disabled = false;
        tempGrid[row][col].winningCell = false;
      }

      if (row === gridHeight.current - 1) {
        for (let col = 0; col < gridWidth.current; col++){
          tempGrid[row][col].status = CellStatus.Playable;
          tempGrid[row][col].disabled = false;
        }
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
      const rowStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        // marginTop: `${idx === 0 ? -5 : 0}px`,
        // marginRight: '-20px',
        // marginBottom: `${idx === gridHeight.current-1 ? -5 : 0}px`,
        // marginLeft: '-20px'
      }
      return (
        <div style={rowStyle}>
          {cells.map((c, i) => {
            let props = {...c, columnIsMouseover: i === mouseOverColumn} as IGridSectionProps
            return (
              <GridSection
                key={`cell-${idx}-${i}}`}
                {...props}
              />
            )
          })}
        </div>
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
    resetPlayGrid();
    setGameWinner(-1);
    setPlayerTurn(1);
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
    highlightWinningCells();
    setMouseOverColumn(-1);
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
          setArrowStartEnd({
            ...arrowStartEnd, 
            start: `${winCells[0].y}, ${winCells[0].x}`,
            end: `${winCells[winCells.length-1].y}, ${winCells[winCells.length-1].x}`,
            startOffset: {x: 0, y: -25},
            endOffset: {x: 0, y: 25}
          })

          winningCellsRef.current = winCells;
          return true;
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
      setArrowStartEnd({
        ...arrowStartEnd, 
        start: `${y}, ${hLeft}`,
        end: `${y}, ${hRight}`,
        startOffset: {x: -25, y: 0},
        endOffset: {x: 25, y: 0}
      })

      winningCellsRef.current = winCells;
      return true;
    }

    // check for diagonal win
    // to top right 
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
    // to bottom left
    for (let row = y, col = x; row < gridHeight.current && col >= 0; row++, col--) {
      if (grid[row][col].status === getCurrentPlayerStatus()) {
        left = col;
        winCells.push(grid[row][col])
      }
      else break;
    }
    if (right - left >= 3) {
      let start = winCells.find(c => c.x === left);
      let end = winCells.find(c => c.x === right);
      if (start && end)
        setArrowStartEnd({
          ...arrowStartEnd, 
          start: `${start.y}, ${start.x}`,
          end: `${end.y}, ${end.x}`,
          startOffset: {x: -25, y: 25},
          endOffset: {x: 25, y: -25}
        })

      winningCellsRef.current = winCells;
      return true;
    }

    // to top left
    winCells = [];
    left = right = -1;
    for (let row = y, col = x; row >= 0 && col >= 0; row--, col--) {
      if (grid[row][col].status === getCurrentPlayerStatus()) {
        left = col;
        winCells.push(grid[row][col])
      }
      else break;
    }
    // to bottom right
    for (let row = y, col = x; row < gridHeight.current && col < gridWidth.current; row++, col++) {
      if (grid[row][col].status === getCurrentPlayerStatus()) {
        right = col;
        winCells.push(grid[row][col])
      }
      else break;
    }
    if (right - left >= 3) {
      let start = winCells.find(c => c.x === left);
      let end = winCells.find(c => c.x === right);
      if (start && end)
        setArrowStartEnd({
          ...arrowStartEnd, 
          start: `${start.y}, ${start.x}`,
          end: `${end.y}, ${end.x}`,
          startOffset: {x: -25, y: -25},
          endOffset: {x: 25, y: 25}
        })

      winningCellsRef.current = winCells;
      return true;
    }

    winCells = [];
    return false;
  }

  const getWinnerImage = (player: number) : string => {
    return player === 1 ? KayBearIcon : ZoeyIcon;
  }


  const leftPanelStyle: React.CSSProperties = {
    border: '1px solid black',
    margin: '15px auto', 
    minWidth: '30vw', 
    maxWidth: '30vw',
  }

  const rightPanelStyle: React.CSSProperties = {
    border: '1px solid black',
    margin: '15px auto', 
    minWidth: '18vw',
    maxWidth: '18vw'
  }

  const centerPanelStyle: React.CSSProperties = {
    border: '2px solid black',
    alignContent: 'center',
    padding: '20px',
    overflow: 'hidden',
    backgroundColor: 'rgb(74, 74, 74)',
    minWidth: '45vw',
    maxWidth: '45vw',
    minHeight: '83.5vh',
    maxHeight: '83.5vh'
  }
  
  const headerStyle: React.CSSProperties = {
    color: `#7c795d`,
    fontFamily: 'Trocchi',
    fontSize: `32px`,
    fontWeight: `1000`,
    lineHeight: `0px`,
    marginTop: '26px',
    marginBottom: '-3px'
  }

  const subHeaderStyle: React.CSSProperties = {
    color: '#ffcc66',
    fontSize: `17px`,
    fontWeight: `300`,
    marginBottom: '48px',
    marginLeft: '30px'
  }
  
  const sidePanelsColor = 'black'

  return (
    <div style={{backgroundColor: '#2e2e2e', height: '100vh'}}>
      <Stack>
        <div id={'headerPanel'} style={{
            height: '10vh', 
            border: '1px solid black',
            display: 'flex',
            justifyContent: 'center',
            paddingLeft: '10%'}}>
          <div>
            <h1 style={headerStyle}>
              Connect Four
            </h1>
            <h2 style={subHeaderStyle}>
              By CordyGoat
            </h2>
          </div>
        </div>

        {/* Three bottom panels */}
        <Stack horizontal={true} style={{justifyContent: 'center'}}>

          <div id="leftPanel" style={leftPanelStyle}>
            <Stack style={{height: '100%', width: '100%'}}>
              <div id={'top'}
                style={{
                  alignItems: 'center', 
                  alignContent: 'flex-start', 
                  height: '80%', 
                  backgroundColor: sidePanelsColor}}>
                {gameWinner === -1 &&
                  getCurrentPlayerText()}
                {gameWinner !== -1 &&
                  getWinnerText()}
                {gameWinner !== -1 &&
                <div style={{margin: '25px'}}>
                  <img
                    src={getWinnerImage(gameWinner)}
                    style={{width: '100%'}}
                  />
                </div>}
              </div>  
              <div id={'bottom'}
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  height: '20%', 
                  backgroundColor: sidePanelsColor,
                  paddingBottom: '20px'
                }}>
                
                <button onClick={onResetButtonClick} 
                  style={{ 
                    width: '80%',
                    height: '30px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    overflow: 'clip'
                  }}>
                  Reset Game
                </button>
              </div>
            </Stack>

          </div>

          <Xwrapper>
            <div
              className="main"
              style={centerPanelStyle}
            >
              {renderGrid()}

              {gameWinner !== -1 &&
              <Xarrow
                start={arrowStartEnd.start}
                end={arrowStartEnd.end}
                startAnchor={{position: 'middle', offset: {x: arrowStartEnd.startOffset.x, y: arrowStartEnd.startOffset.y}}}
                endAnchor={{position: 'middle', offset: {x: arrowStartEnd.endOffset.x, y: arrowStartEnd.endOffset.y}}}
                color={"red"}
                strokeWidth={10}
                showHead={false}
                path={'straight'}
              />}
            </div>
          </Xwrapper>

          <div id="rightPanel" style={rightPanelStyle}>
            <Stack style={{height: '100%', width: '100%'}}>
              <div id={'top'}
                style={{
                  alignItems: 'center', 
                  alignContent: 'flex-start', 
                  height: '50%', 
                  backgroundColor: sidePanelsColor
                }}>              
              </div>  
              <div id={'bottom'}
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  height: '50%', 
                  backgroundColor: sidePanelsColor
                }}>
              </div>
            </Stack>

          </div>
        </Stack>
      </Stack>
    </div>
  );
}

export default App;
