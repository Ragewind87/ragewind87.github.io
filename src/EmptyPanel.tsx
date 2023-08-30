import { Stack } from "@fluentui/react";

export const EmptyPanel: React.FunctionComponent = (props) => {

    const sidePanelsColor = 'black';
    const mainBgColor = '#2e2e2e';

    const leftPanelStyle: React.CSSProperties = {
        borderTop: `10px solid ${mainBgColor}`,
        borderLeft: `10px solid ${mainBgColor}`,
        borderRight: `10px solid ${mainBgColor}`,
        minWidth: '22vw', 
        maxWidth: '22vw',
        //backgroundImage: gameStarted ? getLeftPanelBgImage() : undefined,
        backgroundColor: 'black',
        backgroundPositionX: 'left',
        backgroundPositionY: 'bottom',
        backgroundSize: 'cover'
      }
    
      const centerPanelStyle: React.CSSProperties = {
        borderLeft: `2px solid black`,
        borderRight: `2px solid black`,
        borderBottom: `2px solid black`,
        alignContent: 'center',
        padding: '20px',
        overflow: 'hidden',
        backgroundColor: 'rgb(74, 74, 74)',
        minWidth: '50.5vw',
        maxWidth: '50.5vw',
        minHeight: '91.5vh',
        maxHeight: '91.5vh',
        boxShadow: '10px 10px 15px black',
        zIndex: 5
      }

    return (
        <Stack horizontal={true} style={{justifyContent: 'center'}}>
            {/* Left Panel */}
            <div style={leftPanelStyle}> 
            {"EmptyPanel Left Panel"}
            </div>

            {/* Main Panel */}
            <div className="main" style={centerPanelStyle}>
            {"EmptyPanel Center Panel"}
            </div>
        </Stack>
    )
}