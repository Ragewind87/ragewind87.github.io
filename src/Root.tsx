import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Button, makeStyles } from '@fluentui/react-components';
import { HouseIcon } from './ConnectFour/Icons/HouseIcon.tsx';
import whiteKnight from './ChessGame/Assets/whiteKnight.png';
import { CircleBorder } from './ConnectFour/Icons/CircleBorder.tsx';
import ToDoList from './SimpleComponents/ToDoList.tsx';
import { Stack } from '@fluentui/react';
import SelfPortrait from './Media/joehc4.jpg';
import { Open20Regular } from '@fluentui/react-icons';
import GithubLogo from './Media/github-logo.png';
import LinkedinLogo from './Media/linkedin-logo.png';
import SkillsetList from './SimpleComponents/SkillsetList';
import { ResumeDialog } from './SimpleComponents/ResumeDialog.tsx';
import jkResume from './Media/jk_resume_v24.pdf';
import { mainBgColor, navPanelColor } from './constants.ts';
import { githubAddress, linkedInAddress, politeMailAddress } from './WelcomePage.tsx';
import { useWindowWidth } from './Hooks/useWindowWidth.tsx';

export const Root: React.FunctionComponent = () => {
    const styles = useStyles();
    const { isMobile, isSmallScreen } = useWindowWidth();
    const [showResumeDialog, setShowResumeDialog] = React.useState<boolean>(false);
    const onResumeClicked = () => {
        setShowResumeDialog(true);
    };
    const leftPanelStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        width: isSmallScreen ? '50%' : 'auto',
        minWidth: '22vw',
        padding: '15px',
        backgroundColor: navPanelColor,
        border: '2px solid black',
        borderRadius: '5px',
    };
    const rightPanelStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        width: isSmallScreen ? '50%' : 'auto',
        minWidth: '22vw',
        height: '100%',
        gap: '10px',
    };
    const mainLayoutStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        height: '96vh',
        gap: '20px',
    };
    const rightPanelSectionTopStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        backgroundColor: navPanelColor,
        alignContent: 'center',
        gap: '10px',
        padding: '20px',
        border: '2px solid black',
        borderRadius: '5px',
        maxHeight: isMobile ? undefined : '40%',
    };

    return (
        <div className={styles.root}>
            <div style={mainLayoutStyle}>
                {/* Left Panel */}
                <div style={leftPanelStyle}>
                    <Stack className={styles.leftPanelStack}>
                        <div className={styles.portraitLink}>
                            <a href={linkedInAddress} target="_blank" rel="noopener noreferrer">
                                <img src={SelfPortrait} alt="Self Portrait" className={styles.portraitImg} />
                            </a>
                            <div className={styles.name}>Joseph Kurtz</div>
                            <div className={styles.title}>Full-Stack Developer</div>
                            <div className={styles.experience}>5 years experience</div>
                            <div className={styles.company}>
                                Software Engineer at{' '}
                                <a href={politeMailAddress} target="_blank" rel="noopener noreferrer">
                                    PoliteMail
                                </a>
                            </div>
                            <div className={styles.socialRow}>
                                <Button
                                    as="a"
                                    href={linkedInAddress}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.socialButton}
                                >
                                    <img src={LinkedinLogo} style={{ maxHeight: '30px' }} />
                                </Button>
                                <Button
                                    as="a"
                                    href={githubAddress}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.socialButton}
                                    style={{
                                        backgroundColor: 'rgb(66, 66, 66)',
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.filter = 'brightness(1.4)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.filter = 'none';
                                    }}
                                >
                                    <img src={GithubLogo} style={{ maxHeight: '28px' }} />
                                </Button>
                                <div className={styles.divider}></div>
                                <Button
                                    onClick={onResumeClicked}
                                    appearance="transparent"
                                    className={styles.resumeButton}
                                >
                                    <span className={styles.resumeButtonContent}>
                                        <span>View my Resume</span>
                                        <Open20Regular />
                                    </span>
                                </Button>
                            </div>
                        </div>
                        <hr className={styles.hr} />
                        <SkillsetList />
                    </Stack>
                </div>

                <Outlet />

                {/* Right Panel */}
                <div style={rightPanelStyle}>
                    <div style={rightPanelSectionTopStyle}>
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
                    {!isMobile && <ToDoList />}
                </div>
            </div>

            {showResumeDialog && (
                <ResumeDialog isOpen={showResumeDialog} setShowResumeDialog={setShowResumeDialog} pdfFile={jkResume} />
            )}
        </div>
    );
};

const useStyles = makeStyles({
    root: {
        backgroundColor: mainBgColor,
        height: '100%',
        color: 'white',
        padding: '15px',
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
    leftPanelStack: {
        textAlign: 'center',
        color: 'white',
        padding: '10px',
        height: '100%',
    },
    portraitLink: {
        padding: '15px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    portraitImg: {
        maxHeight: '200px',
        borderRadius: '8px',
        border: '1px solid white',
        marginBottom: '10px',
    },
    name: {
        fontSize: '24px',
        fontWeight: 'bold',
        textShadow: '2px 2px 3px black',
    },
    title: {
        fontSize: '18px',
        marginTop: '2px',
    },
    experience: {
        fontSize: '16px',
        lineHeight: '0.5',
    },
    company: {
        fontSize: '16px',
        marginTop: '15px',
        lineHeight: '1.2',
        color: 'white',
        '& a': {
            color: 'white',
            textDecoration: 'none',
            ':hover': {
                color: 'lightblue',
                textDecoration: 'none',
            },
        },
    },
    socialRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '25px',
        gap: '7px',
        height: '100%',
        maxHeight: '40px',
    },
    socialButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        cursor: 'pointer',
        minWidth: '30px',
        minHeight: '30px',
        maxWidth: '30px',
        maxHeight: '30px',
        borderRadius: '5px',
        backgroundColor: 'transparent',
        ':hover': {
            filter: 'brightness(1.25)',
        },
    },
    divider: {
        width: '1px',
        height: '25px',
        backgroundColor: 'rgb(145, 145, 145)',
        margin: '0 0 0 12px',
    },
    resumeButton: {
        padding: '2px 5px 2px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        color: 'white',
        ':hover': {
            color: 'lightblue',
        },
    },
    resumeButtonContent: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
    },
    hr: {
        borderTop: '0.2px solid white',
        margin: '20px 0px 25px 0px',
    },
});
