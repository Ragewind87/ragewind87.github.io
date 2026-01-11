import { Stack } from '@fluentui/react';
import * as React from 'react';
import CordyTank from './ConnectFour/Icons/cordyTank.png';
import { navPanelColor } from './Root';
import SelfPortrait from './Media/joehc4.jpg';
import { Open20Regular } from '@fluentui/react-icons';
import { Button } from '@fluentui/react-components';
import { ResumeDialog } from './ResumeDialog';
import jkResume from './Media/jk_resume_v221.pdf';
import { TextBadge } from './SimpleComponents/TextBadge';
import GithubLogo from './Media/github-logo.png';
import LinkedinLogo from './Media/linkedin-logo.png';

const contactEmail = 'ragewind48@gmail.com';
const linkedInAddress = 'https://www.linkedin.com/in/jwkurtz44/';
const politeMailAddress = 'https://politemail.com/';
const githubAddress = 'https://github.com/Ragewind87';

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
    maxHeight: '55%',
    width: 'auto',
    height: 'auto',
    objectFit: 'contain',
    padding: '20px',
};

const badgeHeadingStyle: React.CSSProperties = {
    fontSize: '15px',
    color: 'rgb(151, 177, 133)',
    fontWeight: '600',
    margin: '12px 0 4px 0',
};

const badgeContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '3px',
};

const socialMediaButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    minWidth: '30px',
    minHeight: '30px',
    maxWidth: '30px',
    maxHeight: '30px',
    borderRadius: '5px',
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
        display: 'flex',
    };

    const onResumeClicked = () => {
        setShowResumeDialog(true);
    };

    return (
        <div style={{ flexGrow: 1 }}>
            <Stack horizontal style={{ gap: '15px', height: '100%' }}>
                {/* Left Panel */}
                <div style={leftPanelStyle}>
                    <Stack style={{ textAlign: 'center', color: 'white', padding: '10px' }}>
                        <div
                            style={{
                                padding: '15px',
                                width: '100%',
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
                                <div
                                    style={{
                                        fontSize: '16px',
                                        marginTop: '15px',
                                        lineHeight: '1.2',
                                        color: 'white',
                                    }}
                                >
                                    Software Engineer at{' '}
                                    <a
                                        href={politeMailAddress}
                                        style={{
                                            color: 'white',
                                            textDecoration: 'none',
                                        }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.color = 'lightblue';
                                            e.currentTarget.style.textDecoration = 'none';
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.color = 'white';
                                            e.currentTarget.style.textDecoration = 'none';
                                        }}
                                    >
                                        PoliteMail
                                    </a>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: '25px',
                                        gap: '7px',
                                        height: '100%', // Ensure the div takes full height
                                        maxHeight: '40px',
                                    }}
                                >
                                    <Button
                                        as="a"
                                        href={linkedInAddress}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={socialMediaButtonStyle}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.filter = 'brightness(1.25)';
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.filter = 'none';
                                        }}
                                    >
                                        <img
                                            src={LinkedinLogo}
                                            style={{
                                                maxHeight: '30px',
                                            }}
                                        />
                                    </Button>
                                    <Button
                                        as="a"
                                        href={githubAddress}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ ...socialMediaButtonStyle, backgroundColor: 'rgb(66, 66, 66)' }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.filter = 'brightness(1.4)';
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.filter = 'none';
                                        }}
                                    >
                                        <img
                                            src={GithubLogo}
                                            style={{
                                                maxHeight: '28px',
                                            }}
                                        />
                                    </Button>

                                    <div
                                        style={{
                                            width: '1px',
                                            height: '25px',
                                            backgroundColor: 'rgb(145, 145, 145)',
                                            margin: '0 0 0 12px',
                                        }}
                                    ></div>

                                    <Button
                                        onClick={onResumeClicked}
                                        appearance="transparent"
                                        style={{
                                            padding: '2px 5px 2px 12px',
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
                        <Stack style={{ justifyContent: 'space-between', height: '100%' }}>
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
                                    <TextBadge>CSS</TextBadge>
                                    <TextBadge>Javascript</TextBadge>
                                    <TextBadge>SQL Server</TextBadge>
                                    <TextBadge>Redux Toolkit</TextBadge>
                                </div>
                                <strong style={badgeHeadingStyle}>Familiar</strong>
                                <div style={badgeContainerStyle}>
                                    <TextBadge>Azure</TextBadge>
                                    <TextBadge>Kubernetes</TextBadge>
                                    <TextBadge>Terraform</TextBadge>
                                    <TextBadge>C</TextBadge>
                                    <TextBadge>Java</TextBadge>
                                </div>
                            </div>
                            <div style={{ fontSize: '12px' }}>Last updated 1/11/2026 1:16 AM</div>
                        </Stack>
                    </Stack>
                </div>

                {/* Main Panel */}
                <div style={cardStyle}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            textAlign: 'center',
                            alignItems: 'center',
                            margin: 'auto',
                            flexGrow: 1,
                            justifyContent: 'space-evenly',
                            padding: '30px',
                            height: '100%',
                        }}
                    >
                        <div style={headerTextStyle}>
                            <span>{'Welcome to my Portfolio Game Hub!'}</span>
                            <span>{'ONWARD!'}</span>
                        </div>
                        <img className="faint-glow" style={imageStyle} src={CordyTank} alt="Cordy Tank" />
                        <div style={{ fontSize: '20px', marginTop: '15px', display: 'flex', flexDirection: 'column' }}>
                            <span style={{ lineHeight: '18px' }}>I made this site to help sharpen my skills.</span>
                            <span>I enjoy working with React and TypeScript.</span>
                            <span style={{ marginTop: '15px' }}>Explore the games and have fun!</span>
                        </div>
                    </div>
                    <div style={footerStyle}>
                        <div>
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
