import React from 'react';
import './App.css';
import { GridSection, IGridSectionProps, IMainGrid, Status as CellStatus } from './GridSection';
import { IDropdownOption, Stack } from '@fluentui/react';
import KayBearIcon from './Icons/Kaybear/kaybearIcon.png';
import KayBearBg from './Icons/Kaybear/kaybearBg.png';
import KayBearWindow from './Icons/Kaybear/kaybearWindow.png';
import KayBearWindowWin from './Icons/Kaybear/kaybearWindowWin.png';
import ZoeyIcon from './Icons/Zoey/zoeyIcon.png';
import ZoeyBg from './Icons/Zoey/zoeyBg.png';
import ZoeyWindow from './Icons/Zoey/zoeyWindow.png';
import ZoeyWindowWin from './Icons/Zoey/zoeyWindowWin.png';
import SkyeIcon from './Icons/Skye/skyeIcon.png';
import SkyeBg from './Icons/Skye/skyeBg.png';
import SkyeWindow from './Icons/Skye/skyeWindow.png';
import SkyeWindowWin from './Icons/Skye/skyeWindowWin.png';
import Xarrow, { Xwrapper } from 'react-xarrows';
import { FormDialog, PlayerChoice } from './FormDialog';

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

interface PlayerOption {
  key: string,
  icon: string,
  normalCell: string,
  wincell: string,
  background: string,
  dropdown: IDropdownOption
}

export interface Player {
  id: number,
  options?: PlayerOption,
}

function App() {

  const nextId = React.useRef<number>(0);
  const gridHeight = React.useRef<number>(6);
  const gridWidth = React.useRef<number>(7);
  const [playerTurn, setPlayerTurn] = React.useState<number>(1);
  const [gameWinner, setGameWinner] = React.useState<number>(-1);
  const winningCellsRef =  React.useRef<IGridSectionProps[]>([]);
  const [mouseOverColumn, setMouseOverColumn] = React.useState<number>(-1);
  const [arrowStartEnd, setArrowStartEnd] = React.useState<ArrowStartEnd>({
    start: '', end: '', startOffset: {x: 0, y: 0}, endOffset: {x: 0, y: 0}
  });
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(true);
  const playersRef = React.useRef<Player[]>();

  const playerOptions = [
    {
      key: 'kayBear',
      icon: KayBearIcon,
      normalCell: KayBearWindow,
      wincell: KayBearWindowWin,
      background: KayBearBg,      
      dropdown: {
        key: 'kayBear',
        text: 'Kay Bear'
      },
    },
    {
      key: 'zoey',
      icon: ZoeyIcon,
      normalCell: ZoeyWindow,
      wincell: ZoeyWindowWin,
      background: ZoeyBg,
      dropdown: {
        key: 'zoey',
        text: 'Zoey'
      },
    },
    {
      key: 'skye',
      icon: SkyeIcon,
      normalCell: SkyeWindow,
      wincell: SkyeWindowWin,
      background: SkyeBg,
      dropdown: {
        key: 'skye',
        text: 'Skye'
      },
    }
  ] as PlayerOption[]

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
          players: [{id: 1}, {id: 2}],
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
            let props = {
              ...c,
              columnIsMouseover: i === mouseOverColumn,
              players: playersRef.current
            } as IGridSectionProps

            return ( <GridSection key={`cell-${idx}-${i}}`} {...props} />)            
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

  const onResetButtonClick = () => {
    resetPlayGrid();
    setGameWinner(-1);
    setPlayerTurn(1);
    setDialogOpen(true)
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

  const getPlayerImage = (playerId: number) : string => {
    return playersRef.current?.find(p => p.id === playerId)?.options?.icon ?? '';
  }

  const handleCloseDialog = () => {
    setDialogOpen(false);
  }

  const sidePanelsColor = 'black';
  const mainBgColor = '#2e2e2e';

  const leftPanelStyle: React.CSSProperties = {
    borderTop: `10px solid ${mainBgColor}`,
    borderLeft: `10px solid ${mainBgColor}`,
    borderRight: `10px solid ${mainBgColor}`,
    minWidth: '22vw', 
    maxWidth: '22vw',
    backgroundImage: `url(${playersRef.current?.find(p => p.id === playerTurn)?.options?.background ?? ''})`,
    backgroundPositionX: 'left',
    backgroundPositionY: 'bottom',
    backgroundSize: 'cover'
  }

  const rightPanelStyle: React.CSSProperties = {
    borderTop: `10px solid ${mainBgColor}`,
    borderLeft: `25px solid ${mainBgColor}`,
    borderRight: `10px solid ${mainBgColor}`,
    minWidth: '20.5vw',
    maxWidth: '20.5vw',
    backgroundColor: sidePanelsColor,
  }

  const centerPanelStyle: React.CSSProperties = {
    borderLeft: `2px solid black`,
    borderRight: `2px solid black`,
    borderBottom: `2px solid black`,
    alignContent: 'center',
    padding: '20px',
    overflow: 'hidden',
    backgroundColor: 'rgb(74, 74, 74)',
    minWidth: '50.5vw',
    maxWidth: '50.5vw',
    minHeight: '91.5vh',
    maxHeight: '91.5vh',
    boxShadow: '10px 10px 15px black',
    zIndex: 5
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

  const handleSetPlayerChoices = (choices: PlayerChoice[]) => {    
    let players: Player[] = [];

    console.log(choices);

    choices.forEach(c => {
      const id = c.player;
      const choiceKey = c.choice;
      
      players.push({
        id: id,
        options: playerOptions.find(po => po.key === choiceKey)
      } as Player);
    })
    playersRef.current = players;
    console.log(`handleSetPlayerChoices() fired`)
    console.log(playersRef.current)
  }

  return (
    <div style={{backgroundColor: mainBgColor, height: '100vh'}}>
    
      <FormDialog
        isOpen={dialogOpen}
        playerOptions={playerOptions.map(op => op.dropdown)}
        closeDialog={handleCloseDialog}
        setPlayerChoices={handleSetPlayerChoices}
      />

      <Stack horizontal={true} style={{justifyContent: 'center'}}>

        {/* Left Panel */}
        <div style={leftPanelStyle}>
          <Stack style={{height: '100%', width: '100%'}}>
            <div id={'top'} style={{alignItems: 'center', alignContent: 'flex-start', height: '92%'}}>
              
              {/* Current player panel */}
              {gameWinner === -1 &&
                <div style={{display: 'flex', justifyContent: 'flex-end', alignSelf: 'top', width: '100%', height: '36%'}}>
                  <Stack style={{
                    display: 'flex',
                    justifyContent: 'top',
                    border: '2px solid white',
                    backgroundColor: 'black',
                    padding: '5px',
                    margin: '10px',
                    }}>
                    
                    {/* Image */}
                    <div style={{maxWidth: '150px', maxHeight: '150px'}}>
                      <img
                        alt="Player Icon"
                        src={getPlayerImage(playerTurn)}
                        style={{width: '100%'}}
                      />
                    </div>

                    {/* Text */}
                    <div style={{textAlign: 'center', width: '100%'}}>
                      <h1 style={{
                        color: 'white',
                        fontFamily: 'Trocchi',
                        fontSize: '24px',
                        fontWeight: '700',
                        lineHeight: '0px',
                        marginBottom: '-3px'
                      }}>
                        {playerTurn !== 0 ? `Player ${playerTurn}` : ''}
                      </h1>
                      <h2 style={{
                        color: '#ffcc66',
                        fontSize: `17px`,
                        fontWeight: `300`,
                        marginBottom: '48px'
                      }}>
                        Turn
                      </h2>
                    </div>
                    
                  </Stack>
                </div>
              }

              {/* Game winner image / text */}
              {gameWinner !== -1 &&
              <Stack>
                <div style={{margin: '60px 25px 25px 25px'}}>
                  <img
                    alt="Game Winner Icon"
                    src={getPlayerImage(gameWinner)}
                    style={{width: '100%'}}
                  />
                </div>
                <div style={{
                  marginTop: '-30px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  textAlign: 'center',
                  width: '70%',
                  wordWrap: 'normal', 
                  color: 'white', fontSize: '36px', fontWeight: '1000'}}
                >
                  {`PLAYER ${playerTurn}\nWINS`}
                </div>
              </Stack>}

            </div>  
            <div id={'bottom'}
              style={{
                borderTop: `10px solid ${mainBgColor}`,
                display: 'flex',
                alignItems: 'flex-end',
                height: '8%', 
                paddingBottom: '20px',
                backgroundColor: sidePanelsColor,
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

        {/* Main Panel */}
        <Xwrapper>
          <div className="main" style={centerPanelStyle}>

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

        {/* Right Panel */}
        <div style={rightPanelStyle}>
          <Stack style={{height: '100%', width: '100%'}}>
            <div id={'top'}
              style={{
                alignItems: 'center', 
                alignContent: 'flex-start', 
                height: '50%', 
              }}>

              <div id={'headerPanel'} style={{
                height: '10vh', 
                border: '2px solid black',
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: mainBgColor,
              }}>
                <div>
                  <h1 style={headerStyle}>
                    Connect Four
                  </h1>
                  <h2 style={subHeaderStyle}>
                    By CordyGoat
                  </h2>
                </div>
              </div>  

            </div>  
            <div id={'bottom'}
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                height: '50%', 
              }}>
            </div>
          </Stack>
        </div>
      </Stack>
    </div>
  );
}

export default App;
