import { Stack } from "@fluentui/react";
import React from "react";

export interface IPlayerCardProps {
    id: string;
    cardImage: string;
    cardName: string;
    disabled: boolean;
    onClick: (key: string) => void;
}

export const PlayerCard: React.FunctionComponent<IPlayerCardProps> = (props) => {

    const handleOnClick = React.useCallback((key: string) => () => {
        if (props.id) {
            props.onClick(key);
        }
    }, [props])

    const cardNameStyle: React.CSSProperties = {
        width: '100%', margin: '12px 20px 12px 25px', display: 'flex', alignItems: 'center',
        fontFamily: 'Candara', fontSize: `20px`, fontWeight: `750`,
        color: props.disabled ? 'grey' : 'black', justifyContent: 'center'
    }

    return (
        <div style ={{
            margin: '7px 7px 7px 7px',
            boxShadow: '5px 5px 8px black',
            width: '250px',
            height: '75px',
            border: '1px solid black',
        }}>
            <button
                onClick={() => props.onClick(props.id)}
                style ={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'flex-start',
                    padding: '2px 2px 2px 2px'
                }}
                disabled={props.disabled}
            >
                <Stack horizontal style={{height: '100%', width: '100%'}}>
                    <img
                        style={{border: '1px solid black', opacity: props.disabled ? '.5' : '1',
                                filter: props.disabled ? 'grayscale(100%)' : undefined}}
                        src={props.cardImage}
                        alt="Fighter Name"
                    />
                    <div style={cardNameStyle}>
                        {props.cardName}
                    </div>
                </Stack>
            </button>
        </div>
    )
}