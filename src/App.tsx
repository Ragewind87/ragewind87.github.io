import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { GridImage, GridSection, IGridSectionProps, IMainGrid } from './GridSection';
import { Stack } from '@fluentui/react';


function App() {

  const nextId = React.useRef<number>(0);
  const gridHeight = React.useRef<number>(6);
  const gridWidth = React.useRef<number>(6);

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
        <Stack horizontal>
          {cells.map(c => <GridSection {...c} />)}
        </Stack>
      )
    }

    let grid = playGrid.grid.map(gridRow => {
      return (
        <Stack>
          {renderRow(gridRow)}
        </Stack>
      )
    })

    return grid;
  }

  return (
    <div className="App" key="app">

      <div style={{alignContent: 'center', fontSize: '50', fontWeight: 'bold'}}>
        {"Connect Four"}
      </div>
      <div style={{
        display: 'block',
        margin: '25px auto 25px auto'
      }}>
        {renderGrid()}
      </div>


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
    </div>
  );
}

export default App;
