import { Stack } from '@fluentui/react';
import * as React from 'react';
import GoatTank from './ConnectFour/Icons/cordyTank.png';
import { makeStyles, mergeClasses } from '@fluentui/react-components';
import { useWindowWidth } from './Hooks/useWindowWidth';
import { cardColor } from './constants';

export const lastUpdatedString = `Last updated:\u00A0\u00A0\u00A02/04/2026 12:39am`;
export const contactEmail = 'ragewind48@gmail.com';
export const linkedInAddress = 'https://www.linkedin.com/in/jwkurtz44/';
export const politeMailAddress = 'https://www.linkedin.com/company/politemailsoftware/posts/?feedView=all';
export const githubAddress = 'https://github.com/Ragewind87';

export const WelcomePage: React.FunctionComponent = () => {
    const styles = useStyles();
    const isFullScreen = useWindowWidth();

    return isFullScreen ? (
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
                        <span className={styles.accent}>TypeScript</span> and <span className={styles.accent}>CSS</span>
                        .
                    </span>
                    <span>
                        The codebase uses <span className={styles.accent}>limited generative AI</span> by design; most
                        implementation is hand-written to maximize learning and technical depth.
                    </span>
                    <span>
                        The site currently features two React-driven games, with additional pages and functionality
                        planned over time.
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
    ) : (
        <></>
    );
};

const useStyles = makeStyles({
    card: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        border: '2px solid black',
        borderRadius: '7px',
        alignContent: 'center',
        backgroundColor: cardColor,
        width: '100%',
        height: '100%',
        boxShadow: '10px 10px 15px black',
        zIndex: 5,
        justifyContent: 'space-between',
        overflow: 'hidden',
        gap: '15px',
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
