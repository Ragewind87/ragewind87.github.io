import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { type IDropdownOption } from '@fluentui/react';
import { Button, makeStyles } from '@fluentui/react-components';
import { CheckFilled } from '@fluentui/react-icons';
import { HouseIcon } from './ConnectFour/Icons/HouseIcon.tsx';
import whiteKnight from './ChessGame/Assets/whiteKnight.png';
import { CircleBorder } from './ConnectFour/Icons/CircleBorder.tsx';

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
        backgroundColor: 'rgb(86, 114, 64)',
        transition: 'background-color 0.3s ease',
        boxShadow: '3px 3px 7px rgba(0, 0, 0, 0.51)',
        '&:hover': {
            border: 'none',
            backgroundColor: 'rgb(119, 151, 92)',
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
};

const rightPanelSectionStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: navPanelColor,
    alignContent: 'center',
    gap: '10px',
    padding: '20px',
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
    fontSize: '15px',
};

const listItemStyle2: React.CSSProperties = {
    lineHeight: '1.2',
    marginTop: '12px',
    fontSize: '14px',
    textDecoration: 'line-through',
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
                                <span className={styles.linkText}>Home Page</span>
                            </Button>
                        </Link>
                        <Link to={'/ConnectFour'}>
                            <Button className={styles.button}>
                                <CircleBorder className={styles.icon} />
                                <span className={styles.linkText}>Connect Four</span>
                            </Button>
                        </Link>
                        <Link to={'/Chess'}>
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
                    <div
                        style={{ ...rightPanelSectionStyle, paddingLeft: '0px', paddingTop: '30px', maxHeight: '60%' }}
                    >
                        <h4 style={listHeadingStyle}>
                            Site{'  '}
                            <span
                                style={{
                                    fontSize: '26px',
                                    fontWeight: 'extra-bold',
                                    fontFamily: '"Courier New", Courier, monospace',
                                    color: '#6aff6a',
                                }}
                            >
                                //todo
                            </span>
                            {'  '}
                            List:
                        </h4>
                        <ul style={listStyle}>
                            <li style={{ ...listItemStyle, marginTop: '0px' }}>
                                Make the site mobile responsive (badly needed)
                            </li>
                            <li style={{ ...listItemStyle, marginTop: '10px' }}>
                                Convert styling from all inline to CSS modules
                            </li>
                            <li style={{ ...listItemStyle, marginTop: '10px' }}>
                                Make the left and right panel shown at all times
                            </li>
                            <li style={{ ...listItemStyle, marginTop: '10px' }}>
                                Add "Formal Education" section to the left panel
                            </li>
                        </ul>
                        <h4 style={{ ...listHeadingStyle, marginTop: '10px' }}>Stretch Goals:</h4>
                        <ul style={listStyle}>
                            <li style={{ ...listItemStyle, marginTop: '0px' }}>
                                Add page describing Godot game I'm working on
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
