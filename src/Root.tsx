import React, { CSSProperties } from 'react';
import { Link, Outlet } from "react-router-dom";
import "./index.css";
import { IDropdownOption, Stack } from '@fluentui/react';
import { Button } from '@fluentui/react-components';


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
  const contacts: PlayerOption[] = [];
  return contacts;
}

export const Root: React.FunctionComponent = (props) => {

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

  const linkButtonStyle: React.CSSProperties = {
    height: '50px',
    borderRadius: '10px',
    width: '100%',
    backgroundColor: 'rgb(100, 100, 100)'
  }

  const linkTextStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: '600',
    color: 'black',
  }

  return (
    <div style={{backgroundColor: mainBgColor, height: '100vh', color: 'white'}}>
      {"Root"}
      <Stack horizontal={true} style={{justifyContent: 'center'}}> 

        {/* renders current game */}
        <Outlet />

        {/* Right Panel */}
        <div style={rightPanelStyle}>
          {"RightPanel"}
          <div id={'top'}
            style={{
              alignItems: 'center', 
              alignContent: 'flex-start', 
              height: '100%', 
              padding: '10px',
            }}
          >
            <Stack style={{ height: '100%' }} tokens={{ childrenGap: '10px' }}>
              <Link to={`WelcomePage`}>
                <Button style={linkButtonStyle}>
                  <span style={linkTextStyle}>Welcome Page</span>                    
                </Button>
              </Link>
              <Link to={`ConnectFour`}>
                <Button style={linkButtonStyle}>
                  <span style={linkTextStyle}>Connect Four</span>                    
                </Button>
              </Link>
              <Link to={`Chess`}>
                <Button style={linkButtonStyle}>
                  <span style={linkTextStyle}>TSP Chess</span>                    
                </Button>                    
              </Link>
            </Stack>

          </div>  
        </div>
      </Stack>
    </div>
  );
}

export default Root;
