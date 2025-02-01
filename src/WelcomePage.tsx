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
        // border: `10px 10px 0px 10px solid ${mainBgColor}`,
        minWidth: '22vw',
        maxWidth: '22vw',
        // BackgroundImage: gameStarted ? getLeftPanelBgImage() : undefined,
        backgroundColor: sidePanelsColor,
    };

    return (
        <Stack horizontal={true} style={{ justifyContent: 'center' }}>
            {/* Left Panel */}
            <div style={leftPanelStyle}>{'EmptyPanel Left Panel'}</div>

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
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        marginTop: '0px',
                    }}
                >
                    EmptyPanel Center Panel
                </div>
                <Stack style={{ display: 'flex', alignItems: 'center' }}>
                    <img style={{ maxHeight: '400px' }} src={CordyTank} alt="Cordy Tank" />
                    <div
                        style={{
                            display: 'flex', // Make this div a flex container
                            alignItems: 'center', // Center items vertically
                            flexDirection: 'column', // Align items in a column
                            fontSize: '32px',
                            fontWeight: 'bold',
                            fontFamily: 'Calibri, sans-serif',
                            marginTop: '30px',
                        }}
                    >
                        <span>{'Welcome to Cordy Game Hub!'}</span>
                        <span>{'ONWARD!'}</span>
                    </div>
                </Stack>
            </div>
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '100vw',
                    textAlign: 'center',
                    padding: '10px',
                    backgroundColor: 'rgb(50, 50, 50)',
                    color: 'white',
                }}
            >
                Art for this app created by a talented friend. Please direct any inquiries to{' '}
                <span>
                    <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                </span>
            </div>
        </Stack>
    );
};
