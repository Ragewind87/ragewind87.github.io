import React from 'react';

import { type IPlayerOption } from './ConnectFour.js';
import { PlayerCard } from './PlayerCard.tsx';

export type IFormDialogProps = {
    isOpen: boolean;
    playerOptions: IPlayerOption[];
    closeDialog: () => void;
    setPlayerChoices: (choices: PlayerChoice[]) => void;
};

export type PlayerChoice = {
    player: number;
    choice: string;
};

export const PlayerSelectionDialog: React.FunctionComponent<IFormDialogProps> = (properties) => {
    const [player, setPlayer] = React.useState<number>(1);
    const playerChoicesReference = React.useRef<PlayerChoice[]>([]);

    React.useEffect(() => {
        if (!properties.isOpen) {
            setTimeout(() => {
                playerChoicesReference.current = [];
                setPlayer(1);
            }, 500);
        }
    }, [properties.isOpen]);

    const handleOnClick = (key: string) => {
        playerChoicesReference.current = [...playerChoicesReference.current, { player, choice: key.toString() }];
        if (player === 1) {
            setPlayer(2);
        } else if (player === 2) {
            properties.setPlayerChoices(playerChoicesReference.current);
            properties.closeDialog();
        }
    };

    const renderPlayerChoiceCards = () =>
        properties.playerOptions.map((op) => {
            const disabled = playerChoicesReference.current.some((pc) => pc.choice === op.id);
            return (
                <PlayerCard
                    key={op.id}
                    id={op.id}
                    cardName={op.name}
                    cardImage={op.icon}
                    onClick={handleOnClick}
                    disabled={disabled}
                />
            );
        });

    const titleStyle: React.CSSProperties = {
        fontFamily: 'Candara',
        fontSize: '30px',
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        lineHeight: '22px',
    };

    const subTitleStyle: React.CSSProperties = {
        fontFamily: 'Segoe UI Black',
        fontSize: '26px',
        fontWeight: 'bold',
        marginBottom: '20px',
        textAlign: 'center',
        color: player === 1 ? '#ad1f00' : '#0b00ad',
    };

    return (
        <div style={{ width: 'fit-content', boxShadow: '10px 10px 15px black' }}>
            {properties.isOpen && (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: '200px',
                        height: '100%',
                        backgroundColor: '#a7a7a7',
                        borderRadius: '6px',
                        padding: '20px',
                    }}
                >
                    <span style={titleStyle}>{'Choose Your Fighter!'}</span>
                    <span style={subTitleStyle}>{`Player ${player}`}</span>

                    <div>{renderPlayerChoiceCards()}</div>
                </div>
            )}
        </div>
    );
};
