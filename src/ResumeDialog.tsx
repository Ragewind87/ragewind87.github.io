import { Button, Dialog, DialogSurface, DialogTitle, type DialogOpenChangeData } from '@fluentui/react-components';
import React from 'react';
import {
    SpecialZoomLevel,
    Worker,
    Viewer,
    type Plugin,
    createStore,
    type PluginFunctions,
} from '@react-pdf-viewer/core';

import { Dismiss20Regular } from '@fluentui/react-icons';
import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { DialogContent } from '@fluentui/react';

interface CustomZoomPlugin extends Plugin {
    zoomTo(scale: number | SpecialZoomLevel): void;
}

export default interface StoreProps {
    zoom?(scale: number | SpecialZoomLevel): void;
}

const customZoomPlugin = (): CustomZoomPlugin => {
    const store = React.useMemo(() => createStore<StoreProps>({}), []);

    return {
        install: (pluginFunctions: PluginFunctions) => {
            store.update('zoom', pluginFunctions.zoom);
        },
        zoomTo: (scale: number | SpecialZoomLevel) => {
            const zoom = store.get('zoom');
            if (zoom) {
                // Zoom to that scale
                zoom(scale);
            }
        },
    };
};

interface IResumeDialogProps {
    isOpen: boolean;
    setShowResumeDialog: React.Dispatch<React.SetStateAction<boolean>>;
    pdfFile: string;
}

export const ResumeDialog: React.FC<IResumeDialogProps> = ({ isOpen, setShowResumeDialog, pdfFile }) => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    if (containerRef.current) {
        const scaleFactor = 1; // Set this to the appropriate scale factor
        containerRef.current.style.setProperty('--scale-factor', scaleFactor.toString());
    }

    const customZoomPluginInstance = customZoomPlugin();
    const { zoomTo } = customZoomPluginInstance;

    const onOpenChange = (_e: React.SyntheticEvent<HTMLElement>, data: DialogOpenChangeData) => {
        setShowResumeDialog(data.open);
    };

    const onCloseButtonClick = () => {
        setShowResumeDialog(false);
    };

    const height = 95;
    // var width = height / 1.294;
    const width = height / 1.26;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <div
                style={{
                    display: 'flex',
                    flexGrow: 1,
                    flex: 1,
                    overflow: 'hidden',
                }}
            >
                <Viewer
                    fileUrl={pdfFile}
                    defaultScale={SpecialZoomLevel.PageFit}
                    plugins={[customZoomPluginInstance]}
                    renderLoader={() => <div style={{ display: 'none' }}></div>}
                />
            </div>
            <DialogSurface
                ref={containerRef}
                style={{
                    height: `${height}vh`,
                    minWidth: `${width}vh`,
                    padding: '10px 10px 20px 10px',
                    backgroundColor: 'white',
                    border: '1px solid black',
                    borderRadius: '10px',
                }}
            >
                <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Resume</span> */}
                    <Button
                        appearance="subtle"
                        onClick={onCloseButtonClick}
                        style={{ marginLeft: 'auto', minWidth: 'auto' }}
                    >
                        <Dismiss20Regular fill="black" />
                    </Button>
                </DialogTitle>

                {/* <div
                    style={{
                        flex: 1,
                        overflow: 'hidden',
                    }}
                ></div> */}
                {/* <DialogContent> */}
                {/* <div style={{ height: '80vh', padding: '0px' }}> */}
                {/* <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}> */}

                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                    <Viewer
                        fileUrl={pdfFile}
                        defaultScale={SpecialZoomLevel.PageFit}
                        plugins={[customZoomPluginInstance]}
                    />
                </Worker>
                {/* </div> */}
                <DialogContent>
                    <Button style={{ backgroundColor: 'black', height: '50px' }} onClick={() => void zoomTo(2)}>
                        Zoom to 200%
                    </Button>
                </DialogContent>

                {/* </Worker> */}
                {/* </div> */}
                {/* </DialogContent> */}
            </DialogSurface>
        </Dialog>
    );
};
