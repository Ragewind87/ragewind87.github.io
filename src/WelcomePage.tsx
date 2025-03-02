import { Stack } from '@fluentui/react';
import * as React from 'react';

import CordyTank from './ConnectFour/Icons/cordyTank.png';
import { mainBgColor, navPanelColor } from './Root';
import SelfPortrait from './Images/joehc4.jpg';

const contactEmail = 'ragewind48@gmail.com';
const linkedInAddress = 'https://www.linkedin.com/in/jwkurtz44/';
const politeMailAddress = 'https://politemail.com/';

const footerStyle: React.CSSProperties = {
    width: '100%',
    padding: '15px',
    textAlign: 'center',
    borderTop: '1.5px solid black',
    backgroundColor: 'rgb(50, 50, 50)',
    color: 'white',
    lineHeight: '18px',
};

const cardStyle: React.CSSProperties = {
    border: '2px solid black',
    borderRadius: '7px',
    alignContent: 'center',
    // marginTop: '15px',
    backgroundColor: 'rgb(74, 74, 74)',
    // minWidth: '50.5vw',
    // maxWidth: '50.5vw',
    width: '100%',
    height: '100%',
    // minHeight: '91.5vh',
    // maxHeight: '91.5vh',
    boxShadow: '10px 10px 15px black',
    zIndex: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'hidden',
};

const headerTextStyle: React.CSSProperties = {
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    fontSize: '36px',
    fontWeight: 'bold',
    fontFamily: 'Calibri, sans-serif',
    textShadow: '2px 2px 3px black',
    padding: '20px',
};

const imageStyle: React.CSSProperties = {
    maxWidth: '100%',
    maxHeight: '85%',
    width: 'auto',
    height: 'auto',
    objectFit: 'contain',
    padding: '20px',
};

export const WelcomePage: React.FunctionComponent = (properties) => {
    const leftPanelStyle: React.CSSProperties = {
        minWidth: '22vw',
        maxWidth: '22vw',
        backgroundColor: mainBgColor,
    };

    return (
        <Stack horizontal={true} style={{ flexGrow: 1 }}>
            {/* Left Panel */}
            <div style={leftPanelStyle}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '25vh',
                        marginLeft: '-15px',
                    }}
                >
                    <img
                        src={SelfPortrait}
                        alt="Self Portrait"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            borderRadius: '10%',
                            border: '3px solid black',
                            // boxShadow: '5px 5px 15px black',
                        }}
                    />
                </div>
                <div style={{ textAlign: 'center', color: 'white', padding: '10px' }}>
                    <div
                        style={{
                            border: '3px solid black',
                            borderRadius: '5px',
                            padding: '5px 15px 15px 15px',
                            width: '70%',
                            margin: 'auto',
                        }}
                    >
                        <div style={{ fontSize: '24px', fontWeight: 'bold', textShadow: '2px 2px 3px black' }}>
                            Joseph Kurtz
                        </div>
                        <div style={{ fontSize: '18px' }}>Full-Stack Developer</div>
                        <div style={{ fontSize: '16px', lineHeight: '1.0' }}>4 years experience</div>
                    </div>
                    <div style={{ fontSize: '18px', marginTop: '15px' }}>
                        Employed at{' '}
                        <a href={politeMailAddress} style={{ color: 'lightblue', textDecoration: 'underline' }}>
                            PoliteMail Software
                        </a>
                    </div>
                    <div style={{ marginTop: '10px', fontSize: '18px' }}>
                        <strong>Skills:</strong>
                        <ul style={{ listStyleType: 'disc', textAlign: 'left' }}>
                            <li>React/TS</li>
                            <li>C# OData WebAPI</li>
                            <li>SQL Server</li>
                            <li>JavaScript</li>
                        </ul>
                    </div>
                    <div style={{ marginTop: '10px', fontSize: '18px' }}>
                        <strong>Interests:</strong>
                        <ul style={{ listStyleType: 'disc', textAlign: 'left' }}>
                            <li>Programming</li>
                            <li>Video games</li>
                            <li>Mountain Biking</li>
                            <li>Running</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Main Panel */}
            <div style={cardStyle}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 'auto' }}>
                    <div style={headerTextStyle}>
                        <span>{'Welcome to Cordy Game Hub!'}</span>
                        <span>{'ONWARD!'}</span>
                    </div>
                    <img className="faint-glow" style={imageStyle} src={CordyTank} alt="Cordy Tank" />
                </div>
                <div style={footerStyle}>
                    <div>
                        This site was built by{' '}
                        <a href={linkedInAddress} style={{ color: 'lightblue', textDecoration: 'underline' }}>
                            Joseph Kurtz
                        </a>
                        , a full-stack developer with a focus on front-end development. <br />I enjoy working with
                        React, and this project helps sharpen my skills.
                    </div>
                    <div style={{ marginTop: '25px' }}>
                        The artwork for this app was created by a talented friend. <br />
                        For inquiries, contact me at&nbsp;
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
