import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { GridImage, GridSection, IGridSectionProps, IMainGrid } from './GridSection';
import { Stack } from '@fluentui/react';


function App() {

  const nextId = React.useRef<number>(0);
  const gridHeight = React.useRef<number>(6);
  const gridWidth = React.useRef<number>(7);
  const [playerTurn, setPlayerTurn] = React.useState<number>(0)
  const [gameStarted, setGameStarted] = React.useState<boolean>(false)

  const mouseButtonToImage = (mouseEvent: React.MouseEvent) : GridImage => {
    if (mouseEvent.shiftKey)
      return GridImage.Zoey2
    else
      return GridImage.Zoey1
  }

  const toggleButtonToken = (event: React.MouseEvent, y: number, x: number) => {
    let tempGrid = playGrid.grid;
    tempGrid[y][x].image = mouseButtonToImage(event);
    setPlayGrid({...playGrid, grid: tempGrid});
  }

  const onButtonClick = React.useCallback(
    (event: React.MouseEvent, y: number, x: number) => {
      toggleButtonToken(event, y, x);
  }, [toggleButtonToken]);

  const getUniqueId = () => {
    return nextId.current++;
  }

  const getInitialGrid = () : IMainGrid => {
    let grid = [];
    for (let row = 0; row < gridHeight.current; row++) {
      let gridRow = [];
      for (let col = 0; col < gridWidth.current; col++) {
        gridRow.push({
          id: getUniqueId(),
          y: row,
          x: col,
          image: GridImage.Transparent,
          onClick: onButtonClick,
        } as IGridSectionProps);
      }
      grid.push(gridRow);
    }  
    return {
      grid: grid
    };
  }

  const [playGrid, setPlayGrid] = React.useState<IMainGrid>(getInitialGrid());

  // React.useEffect(() => {
  //   console.log(`useEffect`)
  //   console.log(playGrid);
  // }, [playGrid]);

  const renderGrid = () : React.ReactNode => {
    if (!playGrid.grid)
      return

    const renderRow = (cells: IGridSectionProps[]) : React.ReactNode => {
      return (
        <Stack horizontal style={{alignSelf: 'center'}}>
          {cells.map(c => <GridSection {...c} />)}
        </Stack>
      )
    }

    let grid = 
      <Stack>
        {playGrid.grid.map(gridRow => {
          return renderRow(gridRow)
        })}
      </Stack>    

    return grid;
  }

  const getCurrentPlayerNumber = () => {    
    return (
      `Turn: Player ${playerTurn}`
    )
  }

  const onStartGameClick = () => {

  }

  return (
    <div className="grid-container" key="app" style={{border: "1px solid blue"}}>
      <div className="main" style={{alignContent: 'center', fontSize: '50', fontWeight: 'bold'}}>
        {renderGrid()}
      </div>
      <div className="header" style={{border: "1px solid red"}}>
        Connect Four
      </div>
      <div className="leftPanel" style={{border: "1px solid black"}}>
        <Stack style={{alignItems: 'center'}}>
          {getCurrentPlayerNumber()}
          {!gameStarted &&
            <button
              onClick={onStartGameClick}
              style={{width: '200px', height: '30px', marginTop:'20px'}}
            >
              Start Game Yaya
            </button>
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

{/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}