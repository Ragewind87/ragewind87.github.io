import { Stack } from '@fluentui/react';
import React from 'react';

export type IPlayerCardProps = {
    id: string;
    cardImage: string;
    cardName: string;
    disabled: boolean;
    onClick: (key: string) => void;
};

export const PlayerCard: React.FunctionComponent<IPlayerCardProps> = (properties) => {
    const handleOnClick = React.useCallback(
        (key: string) => () => {
            if (properties.id) {
                properties.onClick(key);
            }
        },
        [properties],
    );

    const cardNameStyle: React.CSSProperties = {
        width: '100%',
        margin: '12px 20px 12px 25px',
        display: 'flex',
        alignItems: 'center',
        fontFamily: 'Candara',
        fontSize: '20px',
        fontWeight: '750',
        color: properties.disabled ? 'grey' : 'black',
        justifyContent: 'center',
    };

    return (
        <div
            style={{
                margin: '7px 7px 7px 7px',
                boxShadow: '5px 5px 8px black',
                width: '250px',
                height: '75px',
                border: '1px solid black',
            }}
        >
            <button
                onClick={() => {
                    properties.onClick(properties.id);
                }}
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'flex-start',
                    padding: '2px 2px 2px 2px',
                }}
                disabled={properties.disabled}
            >
                <Stack horizontal style={{ height: '100%', width: '100%' }}>
                    <img
                        style={{
                            border: '1px solid black',
                            opacity: properties.disabled ? '.5' : '1',
                            filter: properties.disabled ? 'grayscale(100%)' : undefined,
                        }}
                        src={properties.cardImage}
                        alt="Fighter Name"
                    />
                    <div style={cardNameStyle}>{properties.cardName}</div>
                </Stack>
            </button>
        </div>
    );
};
