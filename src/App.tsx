import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { GridSection, IGridSectionProps } from './GridSection';
import { Stack } from '@fluentui/react';


function App() {

  const nextId = React.useRef<number>(0);

  const getUniqueId = () => {
    console.log(`getUniqueId() ${nextId.current}`)
    return nextId.current++;
  }

  const getInitialGrid = () : IGridSectionProps[][] => {
    let grid = [];
    for (let row = 0; row < 6; row++) {
      let gridRow = [];
      for (let column = 0; column < 6; column++) {
        gridRow.push({
          id: getUniqueId()
        } as IGridSectionProps)
      }
      grid.push(gridRow)
    }  
    return grid;
  }

  const [playGrid, setPlayGrid] = React.useState<IGridSectionProps[][]>(getInitialGrid());


  const renderGrid = () : React.ReactNode => {

    const renderRow = (cells: IGridSectionProps[]) : React.ReactNode => {
      return (
        <Stack horizontal>
          {cells.map(c => <GridSection {...c} />)}
        </Stack>
      )
    }

    let grid = playGrid.map(gridRow => {
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

      <div style={{alignContent: 'center', fontSize: '20', fontWeight: 'bold'}}>
        {"Connect Four"}
      </div>
      {renderGrid()}


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
