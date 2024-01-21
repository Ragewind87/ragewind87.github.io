import React from 'react';
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, Link, Outlet, RouterProvider, useLoaderData } from "react-router-dom";
import "./index.css";
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
import BiskyIcon from './Icons/Bisky/biskyIcon.png';
import BiskyBg from './Icons/Bisky/biskyBg.png';
import BiskyWindow from './Icons/Bisky/biskyWindow.png';
import BiskyWindowWin from './Icons/Bisky/biskyWindowWin.png';
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

export interface PlayerOption {
  id: string,
  name: string,
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

export interface IAppProps {
  key: string
}

export async function loader() {
  const contacts: PlayerOption[] = [];//await getContacts();
  return contacts;
}

export const Root: React.FunctionComponent = (props) => {

  const nextId = React.useRef<number>(0);
  const gridHeight = React.useRef<number>(6);
  const gridWidth = React.useRef<number>(7);
  const [playerTurn, setPlayerTurn] = React.useState<number>(1);
  const [gameWinner, setGameWinner] = React.useState<number>(-1);
  const [gameStarted, setGameStarted] = React.useState<boolean>(false);
  const winningCellsRef =  React.useRef<IGridSectionProps[]>([]);
  const [mouseOverColumn, setMouseOverColumn] = React.useState<number>(-1);
  const [arrowStartEnd, setArrowStartEnd] = React.useState<ArrowStartEnd>({
    start: '', end: '', startOffset: {x: 0, y: 0}, endOffset: {x: 0, y: 0}
  });
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const playersRef = React.useRef<Player[]>();

  const contacts = useLoaderData() as PlayerOption[];


  const playerOptions = [
    {
      id: 'kayBear',
      name: 'Kaylaena Bear',
      icon: KayBearIcon,
      normalCell: KayBearWindow,
      wincell: KayBearWindowWin,
      background: KayBearBg,      
    },
    {
      id: 'zoey',
      name: 'Z-Bomb',
      icon: ZoeyIcon,
      normalCell: ZoeyWindow,
      wincell: ZoeyWindowWin,
      background: ZoeyBg,
    },
    {
      id: 'skye',
      name: 'Skibby Bibbies',
      icon: SkyeIcon,
      normalCell: SkyeWindow,
      wincell: SkyeWindowWin,
      background: SkyeBg,
    },
    {
      id: 'bisky',
      name: 'Risky Bisky',
      icon: BiskyIcon,
      normalCell: BiskyWindow,
      wincell: BiskyWindowWin,
      background: BiskyBg,
    }
  ] as PlayerOption[];

  const handleCloseDialog = () => {
    setGameStarted(true);
    setDialogOpen(false);
  }

  const sidePanelsColor = 'black';
  const mainBgColor = '#2e2e2e';

  const rightPanelStyle: React.CSSProperties = {
    borderTop: `10px solid ${mainBgColor}`,
    borderLeft: `25px solid ${mainBgColor}`,
    borderRight: `10px solid ${mainBgColor}`,
    minWidth: '20.5vw',
    maxWidth: '20.5vw',
    backgroundColor: sidePanelsColor,
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

    choices.forEach(c => {
      const id = c.player;
      const choiceKey = c.choice;
      
      players.push({
        id: id,
        options: playerOptions.find(po => po.id === choiceKey)
      } as Player);
    })
    playersRef.current = players;
  }

  return (
    <div style={{backgroundColor: mainBgColor, height: '100vh'}}>
    {"Root"}
      <FormDialog
        isOpen={dialogOpen}
        playerOptions={playerOptions}
        closeDialog={handleCloseDialog}
        setPlayerChoices={handleSetPlayerChoices}
      />

      <Stack horizontal={true} style={{justifyContent: 'center'}}>

        <Outlet />

        {/* Right Panel */}
        <div style={rightPanelStyle}>
          {"RightPanel"}
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
              <Link to={`connectFour`}>ConnectFour</Link>
            </div>
          </Stack>
        </div>
      </Stack>
    </div>
  );
}

export default Root;
