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
        border: '1.5px solid black',
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
    backgroundColor: navPanelColor,
    alignContent: 'center',
    gap: '10px',
    padding: '15px',
    margin: '15px 15px 0px 0px',
    border: '2px solid black',
    borderRadius: '5px',
};

export const Root: React.FunctionComponent = () => {
    const styles = useStyles();
    return (
        <div
            style={{
                backgroundColor: mainBgColor,
                height: '100%',
                color: 'white',
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Outlet />

                {/* Right Panel */}
                <div style={rightPanelStyle}>
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
                            <img src={whiteKnight} className={styles.icon} style={{ width: '30px', height: '30px' }} />
                            <span className={styles.linkText}>TSP Chess</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
