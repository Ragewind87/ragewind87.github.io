import {determineImage, Themes} from "./Square"
import { Dropdown } from '@fluentui/react';

/*
    Adding Themes:
    1. Add images to Assets folder
    2. import all of the images in the Square.js file
    3. add switch case for those files in determineImage() in Square.js
    4. add enum for it in Square.js
    5. add theme in themeOptions below
    6. add switch case for determineTitle in PlayerBox.js
    7. add switch case for winnerTitle in TspChess.js
    8. add switch cases for the color functions in Square.js for changing determining the color of the board
 */

const ThemeDropDown = (props) => {

    //handles the selection
    function handleChange(event, data) {
        props.setFunc(themeOptions[data.value].value);
        let node = document.getElementsByClassName("dungeonImage");
        console.log(node[0]);
        let x = 0; //pointer for black dungeon
        let y = 0; //pointer for white dungeon
        for ( let i = 0; i < node.length; i++ ) {
            if ( i < props.dbOwners.length ) {
                let parameters = {
                    isTheme: themeOptions[data.value].value,
                    pieceType: props.dbTypes[x],
                    ownedBy: props.dbOwners[x]
                };
                node[i].setAttribute("src", determineImage(parameters));
                x++;
            } else {
                let parameters = {
                    isTheme: themeOptions[data.value].value,
                    pieceType: props.dwTypes[y],
                    ownedBy: props.dwOwners[y]
                };
                node[i].setAttribute("src", determineImage(parameters));
                y++;
            }
        }
        // props.dungeonFunc();
    }

    //List of themes
    const themeOptions = [
        {
            text: "Traditional",
            value: Themes.TRADITIONAL
        },
        {
            text: "Dogs vs Cats",
            value: Themes.DOGS_CATS
        },
        {
            text: "Pokemon",
            value: Themes.POKEMON
        },
        {
            text: "RWBY",
            value: Themes.RWBY
        }
    ];

    //renders dropdown
    return (
        <div style={{display: 'flex', alignContent: 'flex-start', flexDirection: 'column', textAlign: 'left', fontSize: '13px', lineHeight: '15px'}}>
            Theme
            <Dropdown            
                style={{width: '120px', marginTop: '5px'}}
                placeholder='Traditional'
                selection
                options={themeOptions}
                onChange={handleChange}
                iconProps={{ iconName: 'ChevronDown', styles: { root: { color: 'black' } } }}
            />
        </div>
    )

};

export default ThemeDropDown;