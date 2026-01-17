import { Stack } from '@fluentui/react';
import * as React from 'react';
import GoatTank from './ConnectFour/Icons/cordyTank.png';
import { navPanelColor } from './Root';
import SelfPortrait from './Media/joehc4.jpg';
import { Open20Regular } from '@fluentui/react-icons';
import { Button, makeStyles, mergeClasses } from '@fluentui/react-components';
import { ResumeDialog } from './ResumeDialog';
import jkResume from './Media/jk_resume_v23.pdf';
import GithubLogo from './Media/github-logo.png';
import LinkedinLogo from './Media/linkedin-logo.png';
import SkillsetList from './SimpleComponents/SkillsetList';

const contactEmail = 'ragewind48@gmail.com';
const linkedInAddress = 'https://www.linkedin.com/in/jwkurtz44/';
const politeMailAddress = 'https://www.linkedin.com/company/politemailsoftware/posts/?feedView=all';
const githubAddress = 'https://github.com/Ragewind87';

const cardColor = 'rgb(74, 74, 74)';

export const WelcomePage: React.FunctionComponent = () => {
    const [showResumeDialog, setShowResumeDialog] = React.useState(false);
    const styles = useStyles();

    const onResumeClicked = () => {
        setShowResumeDialog(true);
    };

    return (
        <div className={styles.root}>
            <Stack horizontal className={styles.stack}>
                {/* Left Panel */}
                <div className={styles.leftPanel}>
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
                                    className={mergeClasses(styles.socialButton, styles.githubButton)}
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

                {/* Main Panel */}
                <div className={styles.card}>
                    <div className={styles.mainPanel}>
                        <div className={styles.headerText}>
                            <span>{'Welcome to my Portfolio Game Hub!'}</span>
                            <span>{'ONWARD!'}</span>
                        </div>
                        <img className={mergeClasses('faint-glow', styles.cordyImage)} src={GoatTank} alt="Goat Tank" />
                        <Stack tokens={{ childrenGap: '20px' }} className={styles.mainStack}>
                            <span>
                                I built this site to deliberately sharpen my front-end skills, with a focus on{' '}
                                <span className={styles.accent}>React</span> and{' '}
                                <span className={styles.accent}>TypeScript</span> and{' '}
                                <span className={styles.accent}>CSS</span>.
                            </span>
                            <span>
                                The codebase uses <span className={styles.accent}>limited generative AI</span> by
                                design; most implementation is hand-written to maximize learning and technical depth.
                            </span>
                            <span>
                                The site currently features two React-driven games, with additional pages and
                                functionality planned over time.
                            </span>
                        </Stack>
                    </div>
                    <div className={styles.footer}>
                        <div>
                            The artwork for this site was created by a talented friend. <br />
                            For inquiries, contact me at&nbsp;
                            <span>
                                <a href={`mailto:${contactEmail}`} className={styles.mailLink}>
                                    {contactEmail}
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </Stack>
            <div>
                {showResumeDialog && (
                    <ResumeDialog
                        isOpen={showResumeDialog}
                        setShowResumeDialog={setShowResumeDialog}
                        pdfFile={jkResume}
                    />
                )}
            </div>
        </div>
    );
};

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    stack: {
        gap: '15px',
        height: '100%',
    },
    leftPanel: {
        minWidth: '22vw',
        maxWidth: '22vw',
        padding: '15px',
        backgroundColor: navPanelColor,
        border: '2px solid black',
        borderRadius: '5px',
        display: 'flex',
    },
    leftPanelStack: {
        textAlign: 'center',
        color: 'white',
        padding: '10px',
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
    githubButton: {
        backgroundColor: 'rgb(66, 66, 66)',
        ':hover': {
            filter: 'brightness(1.4)',
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
    card: {
        border: '2px solid black',
        borderRadius: '7px',
        alignContent: 'center',
        backgroundColor: cardColor,
        width: '100%',
        height: '100%',
        boxShadow: '10px 10px 15px black',
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
    },
    mainPanel: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
        margin: 'auto',
        flexGrow: 1,
        justifyContent: 'space-evenly',
        padding: '30px',
        height: '100%',
    },
    headerText: {
        display: 'flex',
        textAlign: 'center',
        flexDirection: 'column',
        fontSize: '36px',
        fontWeight: 'bold',
        fontFamily: 'Calibri, sans-serif',
        textShadow: '2px 2px 3px black',
        padding: '20px',
    },
    cordyImage: {
        maxWidth: '100%',
        maxHeight: '35%',
        width: 'auto',
        height: 'auto',
        objectFit: 'contain',
        padding: '20px',
    },
    mainStack: {
        fontSize: '18px',
        marginTop: '15px',
        maxWidth: '80%',
        textAlign: 'left',
        lineHeight: '22px',
    },
    accent: {
        color: 'rgb(110, 150, 79)',
        fontWeight: 'bold',
    },
    footer: {
        width: '100%',
        padding: '15px',
        textAlign: 'center',
        borderTop: '1.5px solid black',
        backgroundColor: 'rgb(50, 50, 50)',
        color: 'white',
        lineHeight: '18px',
    },
    mailLink: {
        color: 'lightblue',
        textDecoration: 'underline',
    },
});
