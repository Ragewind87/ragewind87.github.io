import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { type IDropdownOption } from '@fluentui/react';
import { Button, makeStyles } from '@fluentui/react-components';
import { Circle20Filled } from '@fluentui/react-icons';
import { HouseIcon } from './ConnectFour/Icons/HouseIcon.tsx';
import whiteKnight from './ChessGame/Assets/whiteKnight.png';
// import './Root.css';

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

const useStyles = makeStyles({
    button: {
        height: '45px',
        border: '2px solid black',
        borderRadius: '5px',
        width: '100%',
        backgroundColor: 'rgb(100, 100, 100)',
        transition: 'background-color 0.3s ease',
        boxShadow: '3px 3px 7px rgba(0, 0, 0, 0.51)',
        '&:hover': {
            border: 'none',
            backgroundColor: 'rgb(141, 141, 141)',
        },
    },
    linkText: {
        fontSize: '20px',
        fontWeight: '600',
        color: 'black',
    },
    icon: {
        width: '25px',
        height: '25px',
        color: 'white',
        marginRight: '8px',
    },
});

export const navPanelColor = 'rgb(36, 36, 36)';
export const mainBgColor = 'rgb(43, 43, 43)';

const rightPanelStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    minWidth: '18vw',
    maxWidth: '18vw',
    height: '100%',
    gap: '10px',
    // margin: '15px 15px 0px 0px',
};

const rightPanelSectionStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: navPanelColor,
    alignContent: 'center',

    gap: '10px',
    padding: '15px',
    border: '2px solid black',
    borderRadius: '5px',
};

const listHeadingStyle: React.CSSProperties = {
    textAlign: 'center',
    fontWeight: 'bold',
    textShadow: '1px 1px 2px black',
};

const listItemStyle: React.CSSProperties = {
    lineHeight: '1.2',
    marginTop: '12px',
};

const listStyle: React.CSSProperties = {
    fontSize: '16px',
    textAlign: 'left',
};

export const Root: React.FunctionComponent = () => {
    const styles = useStyles();
    return (
        <div
            style={{
                backgroundColor: mainBgColor,
                height: '100%',
                color: 'white',
                padding: '15px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    height: '96vh',
                    gap: '20px',
                }}
            >
                <Outlet />

                {/* Right Panel */}
                <div style={rightPanelStyle}>
                    <div style={{ ...rightPanelSectionStyle, maxHeight: '40%' }}>
                        <Link to={'/'}>
                            <Button className={styles.button} appearance="secondary">
                                <div className={styles.icon}>
                                    <HouseIcon fill="white" width="25px" />
                                </div>
                                <span className={styles.linkText}>Welcome Page</span>
                            </Button>
                        </Link>
                        <Link to={'ConnectFour'}>
                            <Button className={styles.button}>
                                <Circle20Filled fill="white" width="25px" className={styles.icon} />
                                <span className={styles.linkText}>Connect Four</span>
                            </Button>
                        </Link>
                        <Link to={'Chess'}>
                            <Button className={styles.button}>
                                <img
                                    src={whiteKnight}
                                    className={styles.icon}
                                    style={{ width: '30px', height: '30px' }}
                                />
                                <span className={styles.linkText}>TSP Chess</span>
                            </Button>
                        </Link>
                    </div>
                    <div style={{ ...rightPanelSectionStyle, paddingLeft: '0px', maxHeight: '60%' }}>
                        <h2 style={listHeadingStyle}>Site Todo List:</h2>
                        <ul style={listStyle}>
                            <li style={{ ...listItemStyle, marginTop: '0px', textDecoration: 'line-through' }}>
                                Add LinkedIn section to Welcome Page right panel
                            </li>
                            <li style={listItemStyle}>
                                Add clickable resume section that allows viewing and downloading
                            </li>
                            <li style={listItemStyle}>Possibly add "confirm switch" dialog between games?</li>
                        </ul>
                        <h2 style={{ ...listHeadingStyle, marginTop: '10px' }}>Stretch Goals:</h2>
                        <ul style={listStyle}>
                            <li style={{ ...listItemStyle, marginTop: '0px' }}>Add async network gameplay</li>
                            <li style={listItemStyle}>Possibly add Auth0 login</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
