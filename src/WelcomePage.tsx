import { Stack } from '@fluentui/react';
import * as React from 'react';

import CordyTank from './ConnectFour/Icons/cordyTank.png';
import { sidePanelsColor } from './Root';

const contactEmail = 'ragewind48@gmail.com';

const footerStyle: React.CSSProperties = {};

const centerPanelStyle: React.CSSProperties = {};

const headingStyle: React.CSSProperties = {
    fontSize: '4rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    fontFamily: 'Arial, sans-serif',
    marginTop: 30,
};

const subheadingStyle: React.CSSProperties = {
    fontSize: '2rem',
    fontWeight: 'lighter',
    marginBottom: '20px',
    fontFamily: 'Arial, sans-serif',
};

const paragraphStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 'normal',
    fontFamily: 'Arial, sans-serif',
};

export const WelcomePage: React.FunctionComponent = (properties) => {
    const leftPanelStyle: React.CSSProperties = {
        minWidth: '22vw',
        maxWidth: '22vw',
        backgroundColor: sidePanelsColor,
    };

    return (
        <Stack horizontal={true} style={{ justifyContent: 'center', flexGrow: 1 }}>
            {/* Left Panel */}
            <div style={leftPanelStyle}></div>

            {/* Main Panel */}
            <div
                className="main"
                style={{
                    border: '2px solid black',
                    alignContent: 'center',
                    padding: '20px',
                    marginTop: '15px',
                    backgroundColor: 'rgb(74, 74, 74)',
                    minWidth: '50.5vw',
                    maxWidth: '50.5vw',
                    minHeight: '91.5vh',
                    maxHeight: '91.5vh',
                    boxShadow: '10px 10px 15px black',
                    zIndex: 5,
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        flex: 1,
                    }}
                ></div>
                <Stack style={{ display: 'flex', alignItems: 'center' }}>
                    <img className="faint-glow" style={{ maxHeight: '400px' }} src={CordyTank} alt="Cordy Tank" />
                    <div
                        style={{
                            display: 'flex', // Make this div a flex container
                            alignItems: 'center', // Center items vertically
                            flexDirection: 'column', // Align items in a column
                            fontSize: '32px',
                            fontWeight: 'bold',
                            fontFamily: 'Calibri, sans-serif',
                            marginTop: '30px',
                            textShadow: '2px 2px 3px black',
                        }}
                    >
                        <span>{'Welcome to Cordy Game Hub!'}</span>
                        <span>{'ONWARD!'}</span>
                    </div>
                </Stack>
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        height: 'fit-content',
                        width: '100%',
                        padding: '8px',
                        textAlign: 'center',
                        borderTop: '1.5px solid black',
                        backgroundColor: 'rgb(50, 50, 50)',
                        color: 'white',
                    }}
                >
                    <div>
                        This app was built by{' '}
                        <a
                            href="https://www.linkedin.com/in/jwkurtz44/"
                            style={{ color: 'lightblue', textDecoration: 'underline' }}
                        >
                            Joe Kurtz
                        </a>
                        . I&apos;m a full stack developer with an interest in the front-end.
                        <br />I enjoy working with React and this this is a personal project I'm building to help
                        solidify these skills.
                    </div>
                    <div style={{ marginTop: '15px' }}>
                        The art for this app created by a talented friend. Please direct any inquiries to: &nbsp;&nbsp;
                        <span>
                            <a
                                href={`mailto:${contactEmail}`}
                                style={{ color: 'lightblue', textDecoration: 'underline' }}
                            >
                                {contactEmail}
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </Stack>
    );
};
