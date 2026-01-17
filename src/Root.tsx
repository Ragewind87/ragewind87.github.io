import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { type IDropdownOption } from '@fluentui/react';
import { Button, makeStyles } from '@fluentui/react-components';
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

export const Root: React.FunctionComponent = () => {
    const styles = useStyles();
    return (
        <div className={styles.root}>
            <div className={styles.mainLayout}>
                <Outlet />

                {/* Right Panel */}
                <div className={styles.rightPanel}>
                    <div className={styles.rightPanelSectionTop}>
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
                    <div className={styles.rightPanelSectionBottom}>
                        <h4 className={styles.listHeading}>
                            Site{'  '}
                            <span className={styles.todoSpan}>//todo</span>
                            {'  '}
                            List:
                        </h4>
                        <ul className={styles.list}>
                            <li className={styles.listItemFirst}>Make the site mobile responsive (badly needed)</li>
                            <li className={styles.listItem}>Convert styling from all inline to CSS modules</li>
                            <li className={styles.listItem}>Make the left and right panel shown at all times</li>
                            <li className={styles.listItem}>Add "Formal Education" section to the left panel</li>
                        </ul>
                        <h4 className={styles.stretchHeading}>Stretch Goals:</h4>
                        <ul className={styles.stretchList}>
                            <li className={styles.stretchListItem}>Add page describing Godot game I'm working on</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const navPanelColor = 'rgb(36, 36, 36)';
export const mainBgColor = 'rgb(43, 43, 43)';

const useStyles = makeStyles({
    root: {
        backgroundColor: mainBgColor,
        height: '100%',
        color: 'white',
        padding: '15px',
    },
    mainLayout: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '96vh',
        gap: '20px',
    },
    rightPanel: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        minWidth: '18vw',
        maxWidth: '18vw',
        height: '100%',
        gap: '10px',
    },
    rightPanelSectionTop: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        backgroundColor: navPanelColor,
        alignContent: 'center',
        gap: '10px',
        padding: '20px',
        border: '2px solid black',
        borderRadius: '5px',
        maxHeight: '40%',
    },
    rightPanelSectionBottom: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        backgroundColor: navPanelColor,
        alignContent: 'center',
        gap: '10px',
        paddingLeft: '0px',
        paddingTop: '30px',
        paddingRight: '20px',
        paddingBottom: '20px',
        border: '2px solid black',
        borderRadius: '5px',
        maxHeight: '60%',
    },
    listHeading: {
        textAlign: 'center',
        fontWeight: 'bold',
        textShadow: '1px 1px 2px black',
    },
    todoSpan: {
        fontSize: '26px',
        fontWeight: 'bold',
        fontFamily: '"Courier New", Courier, monospace',
        color: '#6aff6a',
    },
    list: {
        fontSize: '16px',
        textAlign: 'left',
    },
    listItem: {
        lineHeight: '1.2',
        marginTop: '12px',
        fontSize: '15px',
    },
    listItemFirst: {
        lineHeight: '1.2',
        marginTop: '0px',
        fontSize: '15px',
    },
    stretchHeading: {
        textAlign: 'center',
        fontWeight: 'bold',
        textShadow: '1px 1px 2px black',
        marginTop: '10px',
    },
    stretchList: {
        fontSize: '16px',
        textAlign: 'left',
    },
    stretchListItem: {
        lineHeight: '1.2',
        marginTop: '0px',
        fontSize: '15px',
    },
    homeIcon: {
        width: '25px',
        height: '25px',
        color: 'white',
        marginRight: '8px',
    },
    connectFourIcon: {
        width: '25px',
        height: '25px',
        color: 'white',
        marginRight: '8px',
    },
    chessIcon: {
        width: '30px',
        height: '30px',
        color: 'white',
        marginRight: '8px',
    },
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
        fontWeight: 600,
        color: 'black',
    },
    icon: {
        width: '25px',
        height: '25px',
        color: 'white',
        marginRight: '8px',
    },
});
