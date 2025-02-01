import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './index.css';
import { type IDropdownOption, Stack } from '@fluentui/react';
import { Button } from '@fluentui/react-components';
import { Circle20Filled, CircleRegular, FluentIconsProps, bundleIcon, wrapIcon } from '@fluentui/react-icons';

import { HouseIcon } from './ConnectFour/Icons/HouseIcon.tsx';
import whiteKnight from './ChessGame/Assets/whiteKnight.png';

export type PlayerOption = {
    id: string;
    name: string;
    icon: string;
    normalCell: string;
    wincell: string;
    background: string;
    dropdown: IDropdownOption;
};

export type Player = {
    id: number;
    options?: PlayerOption;
};

export type IAppProps = {
    key: string;
};

export async function loader() {
    const contacts: PlayerOption[] = [];
    return contacts;
}

export const linkButtonStyle: React.CSSProperties = {
    height: '45px',
    border: '1.5px solid black',
    borderRadius: '7px',
    width: '100%',
    backgroundColor: 'rgb(100, 100, 100)',
};

const linkTextStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: '600',
    color: 'black',
};

const iconStyle: React.CSSProperties = {
    width: '25px',
    height: '25px',
    color: 'white',
    marginRight: '8px',
};

export const sidePanelsColor = 'rgb(43, 43, 43)';
export const mainBgColor = 'rgb(43, 43, 43)';

export const Root: React.FunctionComponent = () => {
    return (
        <div
            style={{
                backgroundColor: mainBgColor,
                overflowX: 'hidden',
                height: '100%',
                color: 'white',
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <Outlet />

                {/* Right Panel */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        border: `10px 10px 0px 25px solid ${mainBgColor}`,
                        width: '25vw',
                        backgroundColor: sidePanelsColor,
                        alignContent: 'center',
                        gap: '10px',
                        padding: '15px',
                        marginLeft: '10px',
                    }}
                >
                    <Link to={'/'}>
                        <Button style={linkButtonStyle}>
                            <HouseIcon fill="white" width="25px" style={iconStyle} />
                            <span style={linkTextStyle}>Welcome Page</span>
                        </Button>
                    </Link>
                    <Link to={'ConnectFour'}>
                        <Button style={linkButtonStyle}>
                            <Circle20Filled fill="white" width="25px" style={iconStyle} />
                            <span style={linkTextStyle}>Connect Four</span>
                        </Button>
                    </Link>
                    <Link to={'Chess'}>
                        <Button style={linkButtonStyle}>
                            <img src={whiteKnight} style={{ ...iconStyle, width: '30px', height: '30px' }} />
                            <span style={linkTextStyle}>TSP Chess</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
