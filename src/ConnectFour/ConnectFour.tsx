import React from 'react';
import '../index.css';
import './ConnectFour.css';
import { type IDropdownOption, Stack } from '@fluentui/react';
import Xarrow, { Xwrapper } from 'react-xarrows';

import {
    GridSection,
    type IGridSectionProps,
    type IMainGrid,
    Status as CellStatus,
} from './GridSection.js';
import KayBearIcon from './Icons/Kaybear/kaybearIcon.png';
import KayBearBg from './Icons/Kaybear/kaybearBg.png';
import KayBearWindow from './Icons/Kaybear/kaybearWindow.png';
import KayBearWindowWin from './Icons/Kaybear/kaybearWindowWin.png';
import DuckIcon from './Icons/Duck/duckIcon.png';
import DuckBg from './Icons/Duck/duckBg.png';
import DuckWindow from './Icons/Duck/duckWindow.png';
import DuckWindowWin from './Icons/Duck/duckWindowWin.png';
import SkyeIcon from './Icons/Skye/skyeIcon.png';
import SkyeBg from './Icons/Skye/skyeBg.png';
import SkyeWindow from './Icons/Skye/skyeWindow.png';
import SkyeWindowWin from './Icons/Skye/skyeWindowWin.png';
import BiskyIcon from './Icons/Bisky/biskyIcon.png';
import BiskyBg from './Icons/Bisky/biskyBg.png';
import BiskyWindow from './Icons/Bisky/biskyWindow.png';
import BiskyWindowWin from './Icons/Bisky/biskyWindowWin.png';
import { FormDialog, type PlayerChoice } from './FormDialog.tsx';

type ArrowStartEnd = {
    start: string;
    end: string;
    startOffset: Coordinate;
    endOffset: Coordinate;
};

type Coordinate = {
    x: number;
    y: number;
};

export type IPlayerOption = {
    id: string;
    name: string;
    icon: string;
    normalCell: string;
    wincell: string;
    background: string;
    dropdown: IDropdownOption;
};

export type Player = {
    id: number;
    options?: IPlayerOption;
};

export type IAppProps = {
    key: string;
};

const playerOptions: IPlayerOption[] = [
    {
        id: 'kayBear',
        name: 'Kay Bear',
        icon: KayBearIcon,
        normalCell: KayBearWindow,
        wincell: KayBearWindowWin,
        background: KayBearBg,
    },
    {
        id: 'duck',
        name: 'Happy Duck',
        icon: DuckIcon,
        normalCell: DuckWindow,
        wincell: DuckWindowWin,
        background: DuckBg,
    },
    {
        id: 'skye',
        name: 'Skibby Bibbies',
        icon: SkyeIcon,
        normalCell: SkyeWindow,
        wincell: SkyeWindowWin,
        background: SkyeBg,
    },
    {
        id: 'bisky',
        name: 'Risky Bisky',
        icon: BiskyIcon,
        normalCell: BiskyWindow,
        wincell: BiskyWindowWin,
        background: BiskyBg,
    },
] as IPlayerOption[];

export const ConnectFour: React.FunctionComponent = (properties) => {
    const nextId = React.useRef<number>(0);
    const gridHeight = React.useRef<number>(6);
    const gridWidth = React.useRef<number>(7);
    const [playerTurn, setPlayerTurn] = React.useState<number>(1);
    const [gameWinner, setGameWinner] = React.useState<number>(-1);
    const [gameStarted, setGameStarted] = React.useState<boolean>(false);
    const winningCellsReference = React.useRef<IGridSectionProps[]>([]);
    const [mouseOverColumn, setMouseOverColumn] = React.useState<number>(-1);
    const [arrowStartEnd, setArrowStartEnd] = React.useState<ArrowStartEnd>({
        start: '',
        end: '',
        startOffset: { x: 0, y: 0 },
        endOffset: { x: 0, y: 0 },
    });
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(true);
    const playersReference = React.useRef<Player[]>();

    // Use this inside event handlers like onClick to get the latest state
    const turnReference = React.useRef(0);

    React.useEffect(() => {
        turnReference.current = playerTurn;
    }, [playerTurn]);

    const getUniqueId = () => nextId.current++;

    const getCurrentPlayerStatus = (): CellStatus => {
        if (turnReference.current === 1) {
            return CellStatus.Player1Owned;
        }

        return CellStatus.Player2Owned;
    };

    const updateMouseoverColumn = React.useCallback((column: number) => {
        setMouseOverColumn(column);
    }, []);

    const onCellClick = (event: React.MouseEvent, x: number, y: number) => {
        const temporaryGrid = playGrid.grid;

        let playableY = 0;
        while (temporaryGrid[playableY][x].status !== CellStatus.Playable) {
            playableY++;
        }

        if (temporaryGrid[playableY][x].status !== CellStatus.Playable) {
            return;
        }

        temporaryGrid[playableY][x].status = getCurrentPlayerStatus();

        if (playableY > 0) {
            temporaryGrid[playableY - 1][x].status = CellStatus.Playable;
        }

        if (checkWinCondition(temporaryGrid, x, playableY)) {
            doWin();
        } else {
            setPlayerTurn(turnReference.current === 1 ? 2 : 1);
        }

        setPlayGrid({ ...playGrid, grid: temporaryGrid });
    };

    const getInitialGrid = (): IMainGrid => {
        const grid = [];
        for (let row = 0; row < gridHeight.current; row++) {
            const gridRow: IGridSectionProps[] = [];
            for (let col = 0; col < gridWidth.current; col++) {
                gridRow.push({
                    id: getUniqueId(),
                    y: row,
                    x: col,
                    players: [{ id: 1 }, { id: 2 }],
                    disabled: false,
                    winningCell: false,
                    gameOver: false,
                    onClick: onCellClick,
                    status: CellStatus.Empty,
                    columnIsMouseover: false,
                    setMouseoverColumn: updateMouseoverColumn,
                } as IGridSectionProps);
            }

            if (row === gridHeight.current - 1) {
                for (let col = 0; col < gridWidth.current; col++) {
                    gridRow[col].status = CellStatus.Playable;
                    gridRow[col].disabled = false;
                }
            }

            grid.push(gridRow);
        }

        return {
            grid,
        };
    };

    const [playGrid, setPlayGrid] = React.useState<IMainGrid>(getInitialGrid());

    const resetPlayGrid = () => {
        const temporaryGrid = playGrid.grid;
        for (let row = 0; row < gridHeight.current; row++) {
            for (let col = 0; col < gridWidth.current; col++) {
                temporaryGrid[row][col].status = CellStatus.Empty;
                temporaryGrid[row][col].disabled = false;
                temporaryGrid[row][col].winningCell = false;
            }

            if (row === gridHeight.current - 1) {
                for (let col = 0; col < gridWidth.current; col++) {
                    temporaryGrid[row][col].status = CellStatus.Playable;
                    temporaryGrid[row][col].disabled = false;
                }
            }
        }

        setPlayGrid({ ...playGrid, grid: temporaryGrid });
    };

    const disablePlayGrid = () => {
        const temporaryGrid = playGrid.grid;
        for (let row = 0; row < gridHeight.current; row++) {
            for (let col = 0; col < gridWidth.current; col++) {
                temporaryGrid[row][col].disabled = true;
            }
        }

        setPlayGrid({ ...playGrid, grid: temporaryGrid });
    };

    const renderGrid = (): React.ReactNode => {
        const renderRow = (cells: IGridSectionProps[], index: number): React.ReactNode => {
            const rowStyle: React.CSSProperties = {
                display: 'flex',
                justifyContent: 'center',
            };
            return (
                <div key={`row-${index}`} style={rowStyle}>
                    {cells.map((c, i) => {
                        const properties_: IGridSectionProps = {
                            ...c,
                            columnIsMouseover: i === mouseOverColumn,
                            players: playersReference.current ?? [],
                        };

                        return <GridSection key={`cell-${index}-${i}}`} {...properties_} />;
                    })}
                </div>
            );
        };

        const grid = <Stack>{playGrid.grid.map((gridRow, i) => renderRow(gridRow, i))}</Stack>;

        return grid;
    };

    const onResetButtonClick = () => {
        resetPlayGrid();
        setGameWinner(-1);
        setPlayerTurn(1);
        setDialogOpen(true);
        setGameStarted(false);
    };

    const highlightWinningCells = () => {
        const temporaryGrid: IGridSectionProps[][] = playGrid.grid;
        for (const c of winningCellsReference.current) {
            temporaryGrid[c.y][c.x].winningCell = true;
        }

        setPlayGrid({ ...playGrid, grid: temporaryGrid });
    };

    const doWin = () => {
        setGameWinner(turnReference.current);
        disablePlayGrid();
        highlightWinningCells();
        setMouseOverColumn(-1);
    };

    // eslint-disable-next-line complexity
    const checkWinCondition = (grid: IGridSectionProps[][], x: number, y: number): boolean => {
        let winCells: IGridSectionProps[] = [];

        // Check for vertical wins
        for (let row = y; row < gridHeight.current; row++) {
            if (y > 2) {
                break;
            }

            if (grid[row][x].status === getCurrentPlayerStatus()) {
                winCells.push(grid[row][x]);
                if (winCells.length >= 4) {
                    const lastCell = winCells.at(-1);
                    if (lastCell) {
                        setArrowStartEnd({
                            ...arrowStartEnd,
                            start: `${winCells[0].y}, ${winCells[0].x}`,
                            end: `${lastCell.y}, ${lastCell.x}`,
                            startOffset: { x: 0, y: -25 },
                            endOffset: { x: 0, y: 25 },
                        });

                        winningCellsReference.current = winCells;
                        return true;
                    }
                }
            } else {
                break;
            }
        }

        // Check for horizontal win
        winCells = [];
        let hLeft = -1;
        let hRight = -1;
        for (let col = x; col < gridWidth.current; col++) {
            if (grid[y][col].status === getCurrentPlayerStatus()) {
                winCells.push(grid[y][col]);
                hRight = col;
            } else {
                break;
            }
        }

        for (let col = x; col >= 0; col--) {
            if (grid[y][col].status === getCurrentPlayerStatus()) {
                hLeft = col;
                winCells.push(grid[y][col]);
            } else {
                break;
            }
        }

        if (hRight - hLeft >= 3) {
            setArrowStartEnd({
                ...arrowStartEnd,
                start: `${y}, ${hLeft}`,
                end: `${y}, ${hRight}`,
                startOffset: { x: -25, y: 0 },
                endOffset: { x: 25, y: 0 },
            });

            winningCellsReference.current = winCells;
            return true;
        }

        // Check for diagonal win
        // to top right
        winCells = [];
        let left = -1;
        let right = -1;
        for (let row = y, col = x; row >= 0 && col < gridWidth.current; row--, col++) {
            if (grid[row][col].status === getCurrentPlayerStatus()) {
                right = col;
                winCells.push(grid[row][col]);
            } else {
                break;
            }
        }

        // To bottom left
        for (let row = y, col = x; row < gridHeight.current && col >= 0; row++, col--) {
            if (grid[row][col].status === getCurrentPlayerStatus()) {
                left = col;
                winCells.push(grid[row][col]);
            } else {
                break;
            }
        }

        if (right - left >= 3) {
            const start = winCells.find((c) => c.x === left);
            const end = winCells.find((c) => c.x === right);
            if (start && end) {
                setArrowStartEnd({
                    ...arrowStartEnd,
                    start: `${start.y}, ${start.x}`,
                    end: `${end.y}, ${end.x}`,
                    startOffset: { x: -25, y: 25 },
                    endOffset: { x: 25, y: -25 },
                });
            }

            winningCellsReference.current = winCells;
            return true;
        }

        // To top left
        winCells = [];
        left = -1;
        right = -1;
        for (let row = y, col = x; row >= 0 && col >= 0; row--, col--) {
            if (grid[row][col].status === getCurrentPlayerStatus()) {
                left = col;
                winCells.push(grid[row][col]);
            } else {
                break;
            }
        }

        // To bottom right
        for (
            let row = y, col = x;
            row < gridHeight.current && col < gridWidth.current;
            row++, col++
        ) {
            if (grid[row][col].status === getCurrentPlayerStatus()) {
                right = col;
                winCells.push(grid[row][col]);
            } else {
                break;
            }
        }

        if (right - left >= 3) {
            const start = winCells.find((c) => c.x === left);
            const end = winCells.find((c) => c.x === right);
            if (start && end) {
                setArrowStartEnd({
                    ...arrowStartEnd,
                    start: `${start.y}, ${start.x}`,
                    end: `${end.y}, ${end.x}`,
                    startOffset: { x: -25, y: -25 },
                    endOffset: { x: 25, y: 25 },
                });
            }

            winningCellsReference.current = winCells;
            return true;
        }

        winCells = [];
        return false;
    };

    const getPlayerImage = (playerId: number): string =>
        playersReference.current?.find((p) => p.id === playerId)?.options?.icon ?? '';

    const handleCloseDialog = () => {
        setGameStarted(true);
        setDialogOpen(false);
    };

    const getLeftPanelBgImage = (): string | undefined =>
        `url(${playersReference.current?.find((p) => p.id === playerTurn)?.options?.background ?? ''})`;

    const sidePanelsColor = 'black';
    const mainBgColor = '#2e2e2e';

    const leftPanelStyle: React.CSSProperties = {
        borderTop: `10px solid ${mainBgColor}`,
        borderLeft: `10px solid ${mainBgColor}`,
        borderRight: `10px solid ${mainBgColor}`,
        minWidth: '22vw',
        maxWidth: '22vw',
        backgroundImage: gameStarted ? getLeftPanelBgImage() : undefined,
        backgroundColor: gameStarted ? undefined : 'black',
        backgroundPositionX: 'left',
        backgroundPositionY: 'bottom',
        backgroundSize: 'cover',
    };

    const rightPanelStyle: React.CSSProperties = {
        borderTop: `10px solid ${mainBgColor}`,
        borderLeft: `25px solid ${mainBgColor}`,
        borderRight: `10px solid ${mainBgColor}`,
        minWidth: '20.5vw',
        maxWidth: '20.5vw',
        backgroundColor: sidePanelsColor,
    };

    const centerPanelStyle: React.CSSProperties = {
        display: 'flex',
        borderLeft: '2px solid black',
        borderRight: '2px solid black',
        borderBottom: '2px solid black',
        alignContent: 'center',
        padding: '20px',
        overflow: 'hidden',
        backgroundColor: 'rgb(74, 74, 74)',
        minWidth: '50.5vw',
        maxWidth: '50.5vw',
        minHeight: '91.5vh',
        maxHeight: '91.5vh',
        boxShadow: '10px 10px 15px black',
        zIndex: 5,
    };

    const headerStyle: React.CSSProperties = {
        color: '#7c795d',
        fontFamily: 'Trocchi',
        fontSize: '32px',
        fontWeight: '1000',
        lineHeight: '0px',
        marginTop: '26px',
        // MarginBottom: '-3px'
    };

    const subHeaderStyle: React.CSSProperties = {
        color: '#ffcc66',
        fontSize: '17px',
        fontWeight: '300',
        marginBottom: '48px',
        marginLeft: '30px',
    };

    const handleSetPlayerChoices = (choices: PlayerChoice[]) => {
        const players: Player[] = [];

        for (const c of choices) {
            const id = c.player;
            const choiceKey = c.choice;

            players.push({
                id,
                options: playerOptions.find((po) => po.id === choiceKey),
            } as Player);
        }

        playersReference.current = players;
    };

    return (
        <Stack horizontal={true} style={{ justifyContent: 'center' }}>
            {/* Left Panel */}
            <div style={leftPanelStyle}>
                {'Actual Left Panel'}
                <Stack style={{ height: '100%', width: '100%' }}>
                    <div
                        id={'top'}
                        style={{
                            alignItems: 'center',
                            alignContent: 'flex-start',
                            height: '92%',
                        }}
                    >
                        <div
                            style={{
                                textAlign: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <h1 style={headerStyle}>Connect Four</h1>
                            <h2 style={subHeaderStyle}>By Joe Kurtz</h2>
                        </div>

                        {/* Current player panel */}
                        {gameStarted && gameWinner === -1 && (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    alignSelf: 'top',
                                    width: '100%',
                                    height: '36%',
                                }}
                            >
                                <Stack
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'top',
                                        border: '2px solid white',
                                        backgroundColor: 'black',
                                        margin: '10px',
                                        height: 'fit-content',
                                    }}
                                >
                                    {/* Image */}
                                    <div
                                        style={{
                                            maxWidth: '150px',
                                            maxHeight: '150px',
                                        }}
                                    >
                                        <img
                                            alt="Player Icon"
                                            src={getPlayerImage(playerTurn)}
                                            style={{ width: '100%' }}
                                        />
                                    </div>

                                    {/* Text */}
                                    <div
                                        style={{
                                            textAlign: 'center',
                                            width: '100%',
                                            paddingTop: '15px',
                                            border: '1px solid white',
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontFamily: 'Trocchi',
                                                fontSize: '24px',
                                                fontWeight: '700',
                                                color: 'white',
                                                lineHeight: '20px',
                                            }}
                                        >
                                            {playerTurn === 0 ? '' : `Player ${playerTurn}`}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: '17px',
                                                fontWeight: '300',
                                                color: '#ffcc66',
                                                marginBottom: '10px',
                                            }}
                                        >
                                            Turn
                                        </div>
                                    </div>
                                </Stack>
                            </div>
                        )}

                        {/* Game winner image / text */}
                        {gameWinner !== -1 && (
                            <Stack>
                                <div style={{ margin: '60px 25px 25px 25px' }}>
                                    <img
                                        alt="Game Winner Icon"
                                        src={getPlayerImage(gameWinner)}
                                        style={{ width: '100%' }}
                                    />
                                </div>
                                <div
                                    style={{
                                        marginTop: '-30px',
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        textAlign: 'center',
                                        width: '70%',
                                        wordWrap: 'normal',
                                        fontSize: '36px',
                                        fontWeight: '1000',
                                        color: 'white',
                                    }}
                                >
                                    {`PLAYER ${playerTurn}\nWINS`}
                                </div>
                            </Stack>
                        )}
                    </div>
                    <div
                        id={'bottom'}
                        style={{
                            display: 'flex',
                            alignItems: 'flex-end',
                            height: '8%',
                            paddingBottom: '20px',
                            borderTop: `10px solid ${mainBgColor}`,
                            backgroundColor: sidePanelsColor,
                        }}
                    >
                        <button
                            onClick={onResetButtonClick}
                            style={{
                                width: '80%',
                                height: '30px',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                overflow: 'clip',
                            }}
                        >
                            Reset Game
                        </button>
                    </div>
                </Stack>
            </div>

            {/* Player Selection Dialog */}
            <FormDialog
                isOpen={dialogOpen}
                playerOptions={playerOptions}
                closeDialog={handleCloseDialog}
                setPlayerChoices={handleSetPlayerChoices}
            />

            {/* Main Panel */}
            <Xwrapper>
                <div className="main" style={centerPanelStyle}>
                    {/* {"Actual Main Panel"} */}

                    {renderGrid()}

                    {gameWinner !== -1 && (
                        <Xarrow
                            start={arrowStartEnd.start}
                            end={arrowStartEnd.end}
                            startAnchor={{
                                position: 'middle',
                                offset: {
                                    x: arrowStartEnd.startOffset.x,
                                    y: arrowStartEnd.startOffset.y,
                                },
                            }}
                            endAnchor={{
                                position: 'middle',
                                offset: {
                                    x: arrowStartEnd.endOffset.x,
                                    y: arrowStartEnd.endOffset.y,
                                },
                            }}
                            color={'red'}
                            strokeWidth={15}
                            showHead={false}
                            path={'straight'}
                        />
                    )}
                </div>
            </Xwrapper>
        </Stack>
    );
};
