import { Stack } from '@fluentui/react';
import * as React from 'react';
import CordyTank from './ConnectFour/Icons/cordyTank.png';
import { navPanelColor } from './Root';
import SelfPortrait from './Media/joehc4.jpg';
import { Open20Regular } from '@fluentui/react-icons';
import { Badge, Button } from '@fluentui/react-components';
import { ResumeDialog } from './ResumeDialog';
import jkResume from './Media/jk_resume_v19.pdf';
import TextBadge from './SimpleComponents/TextBadge';

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

const cardColor = 'rgb(74, 74, 74)';

const cardStyle: React.CSSProperties = {
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

const skillStyle: React.CSSProperties = { fontStyle: 'italic', fontSize: '12px', color: 'rgb(210, 180, 140)' };

export const WelcomePage: React.FunctionComponent = () => {
    const [showResumeDialog, setShowResumeDialog] = React.useState(false);
    const leftPanelStyle: React.CSSProperties = {
        minWidth: '22vw',
        maxWidth: '22vw',
        padding: '15px',
        backgroundColor: navPanelColor,
        border: '2px solid black',
        borderRadius: '5px',
    };

    const onResumeClicked = () => {
        setShowResumeDialog(true);
    };

    return (
        <>
            <Stack horizontal={true} style={{ flexGrow: 1, gap: '15px' }}>
                {/* Left Panel */}
                <div style={leftPanelStyle}>
                    <div style={{ textAlign: 'center', color: 'white', padding: '10px' }}>
                        <div
                            style={{
                                padding: '15px',
                                width: '100%',
                                margin: 'auto',
                            }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <a href={linkedInAddress} target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={SelfPortrait}
                                        alt="Self Portrait"
                                        style={{
                                            maxHeight: '200px',
                                            borderRadius: '8px',
                                            border: '1px solid white',
                                            marginBottom: '10px',
                                        }}
                                    />
                                </a>
                                <div style={{ fontSize: '24px', fontWeight: 'bold', textShadow: '2px 2px 3px black' }}>
                                    Joseph Kurtz
                                </div>
                                <div style={{ fontSize: '18px', marginTop: '2px' }}>Full-Stack Developer</div>
                                <div style={{ fontSize: '16px', lineHeight: '0.5' }}>4 years experience</div>
                                <div style={{ fontSize: '16px', marginTop: '15px', lineHeight: '1.2' }}>
                                    Software Engineer at{' '}
                                    <a
                                        href={politeMailAddress}
                                        style={{ color: 'lightblue', textDecoration: 'underline' }}
                                    >
                                        PoliteMail
                                    </a>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        marginTop: '15px',
                                    }}
                                >
                                    <Button
                                        onClick={onResumeClicked}
                                        appearance="transparent"
                                        style={{
                                            marginLeft: '5px',
                                            padding: '2px 5px 2px 5px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                        }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.color = 'lightblue';
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.color = 'white';
                                        }}
                                    >
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <span>View my Resume</span>
                                            <Open20Regular />
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <hr style={{ borderTop: '0.2px solid white', margin: '20px 0px 25px 0px' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                            <strong>Skills</strong>
                            <strong>Strong</strong>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    justifyContent: 'center',
                                }}
                            >
                                <TextBadge>React</TextBadge>
                                <TextBadge>TypeScript</TextBadge>
                                <TextBadge>C#</TextBadge>
                            </div>
                            <strong>Proficient</strong>
                            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                <TextBadge>.NET OData WebAPI</TextBadge>
                                <TextBadge>Git</TextBadge>
                                <TextBadge>SQL Server</TextBadge>
                            </div>

                            <strong>Familiar</strong>
                            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                <TextBadge>Javascript</TextBadge>
                                <TextBadge>CSS</TextBadge>
                            </div>

                            {/* <ul style={{ listStyleType: 'disc', textAlign: 'left', fontSize: '18px' }}>
                                <li>
                                    React&nbsp;&nbsp;<span style={skillStyle}>(strong)</span>
                                </li>
                                <li>
                                    TypeScript&nbsp;&nbsp;<span style={skillStyle}>(strong)</span>
                                </li>
                                <li>
                                    C#&nbsp;&nbsp;<span style={skillStyle}>(strong)</span>
                                </li>
                                <li>.NET OData WebAPI</li>
                                <li>SQL Server</li>
                                <li>Javascript / CSS</li>
                                <li>Git</li>
                            </ul> */}
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
                            I made this site to help sharpen my skills. I enjoy working with React and TypeScript.{' '}
                            <br />
                            Explore the games and have fun!
                        </div>
                        <div style={{ marginTop: '25px' }}>
                            The artwork for this site was created by a talented friend. <br />
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
            <div>
                {showResumeDialog && (
                    <ResumeDialog
                        isOpen={showResumeDialog}
                        setShowResumeDialog={setShowResumeDialog}
                        pdfFile={jkResume}
                    />
                )}
            </div>
        </>
    );
};
