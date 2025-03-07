import { Button, Dialog, DialogSurface, DialogTitle, type DialogOpenChangeData } from '@fluentui/react-components';
import React from 'react';
import { SpecialZoomLevel, Worker, Viewer } from '@react-pdf-viewer/core';

import { Dismiss20Regular } from '@fluentui/react-icons';
import '@react-pdf-viewer/core/lib/styles/index.css';

interface IResumeDialogProps {
    isOpen: boolean;
    setShowResumeDialog: React.Dispatch<React.SetStateAction<boolean>>;
    pdfFile: string;
}

export const ResumeDialog: React.FC<IResumeDialogProps> = ({ isOpen, setShowResumeDialog, pdfFile }) => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (containerRef.current) {
            containerRef.current.style.setProperty('--scale-factor', '1');
        }
    }, []);

    const onOpenChange = (_e: React.SyntheticEvent<HTMLElement>, data: DialogOpenChangeData) => {
        setShowResumeDialog(data.open);
    };

    const onCloseButtonClick = () => {
        setShowResumeDialog(false);
    };

    const height = 95;
    const width = height / 1.26;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogSurface
                ref={containerRef}
                style={{
                    height: `${height}vh`,
                    minWidth: `${width}vh`,
                    padding: '10px 10px 20px 10px',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                }}
            >
                <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button
                        appearance="subtle"
                        onClick={onCloseButtonClick}
                        style={{ marginLeft: 'auto', minWidth: 'auto' }}
                    >
                        <Dismiss20Regular fill="black" />
                    </Button>
                </DialogTitle>
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                    <Viewer fileUrl={pdfFile} defaultScale={SpecialZoomLevel.PageFit} />
                </Worker>
            </DialogSurface>
        </Dialog>
    );
};
