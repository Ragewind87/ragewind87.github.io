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

const badgeHeadingStyle: React.CSSProperties = { fontSize: '15px', fontWeight: '600', margin: '12px 0 4px 0' };

const badgeContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '3px',
};

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
        <div style={{ flexGrow: 1 }}>
            <Stack horizontal style={{ gap: '15px', height: '100%' }}>
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
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                flexWrap: 'wrap',
                                textAlign: 'left',
                                overflow: 'hidden',
                            }}
                        >
                            <strong style={{ textAlign: 'center', fontSize: '24px' }}>Skill Set</strong>
                            <strong style={badgeHeadingStyle}>Strong</strong>
                            <div style={badgeContainerStyle}>
                                <TextBadge>React</TextBadge>
                                <TextBadge>TypeScript</TextBadge>
                            </div>
                            <strong style={badgeHeadingStyle}>Proficient</strong>
                            <div style={badgeContainerStyle}>
                                <TextBadge>C#</TextBadge>
                                <TextBadge>.NET OData WebAPI</TextBadge>
                                <TextBadge>Git</TextBadge>
                            </div>
                            <strong style={badgeHeadingStyle}>Experienced</strong>
                            <div style={badgeContainerStyle}>
                                <TextBadge>Redux Toolkit</TextBadge>
                                <TextBadge>SQL Server</TextBadge>
                                <TextBadge>Javascript</TextBadge>
                                <TextBadge>CSS</TextBadge>
                            </div>
                            <strong style={badgeHeadingStyle}>Familiar</strong>
                            <div style={badgeContainerStyle}>
                                <TextBadge>C</TextBadge>
                                <TextBadge>Java</TextBadge>
                            </div>
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
        </div>
    );
};
