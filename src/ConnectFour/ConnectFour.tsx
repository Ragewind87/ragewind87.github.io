import React from 'react';
import '../index.css';
import './ConnectFour.css';
import { type IDropdownOption, Stack } from '@fluentui/react';
import Xarrow, { Xwrapper } from 'react-xarrows';
import { GridSlot, type IGridSectionProps, type IMainGrid, Status as CellStatus } from './GridSlot.tsx';
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
import { PlayerSelectionDialog, type PlayerChoice } from './PlayerSelectionDialog.tsx';
import { ArrowReset24Filled } from '@fluentui/react-icons';
import { Button, makeStyles } from '@fluentui/react-components';
import { navPanelColor } from 'src/constants.ts';

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
        id: 'skye',
        name: 'Skye Bear',
        icon: SkyeIcon,
        normalCell: SkyeWindow,
        wincell: SkyeWindowWin,
        background: SkyeBg,
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
        id: 'bisky',
        name: 'Risky Bisky',
        icon: BiskyIcon,
        normalCell: BiskyWindow,
        wincell: BiskyWindowWin,
        background: BiskyBg,
    },
] as IPlayerOption[];

export const ConnectFour: React.FunctionComponent = (properties) => {
    const classes = useStyles();
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
    const MAX_COLUMN_Y = 5;

    // Use this inside event handlers like onClick to get the latest state
    const turnReference = React.useRef(0);

    React.useEffect(() => {
        turnReference.current = playerTurn;
    }, [playerTurn]);

    const getUniqueId = () => nextId.current++;

    const getCurrentPlayerStatus = (): CellStatus => {
        return turnReference.current === 1 ? CellStatus.Player1Owned : CellStatus.Player2Owned;
    };

    const updateMouseoverColumn = React.useCallback((column: number) => {
        setMouseOverColumn(column);
    }, []);

    const onCellClick = (_e: React.MouseEvent, x: number) => {
        const temporaryGrid = playGrid.grid;

        let playableY = 0;
        while (playableY <= MAX_COLUMN_Y && temporaryGrid[playableY][x].status !== CellStatus.Playable) {
            playableY++;
        }

        if (playableY > MAX_COLUMN_Y || temporaryGrid[playableY][x].status !== CellStatus.Playable) {
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
            return (
                <div key={`row-${index}`} className={classes.row}>
                    {cells.map((c, i) => {
                        const gridProps: IGridSectionProps = {
                            ...c,
                            columnIsMouseover: i === mouseOverColumn,
                            players: playersReference.current ?? [],
                        };

                        return <GridSlot key={`cell-${index}-${i}}`} {...gridProps} />;
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
        for (let row = y, col = x; row < gridHeight.current && col < gridWidth.current; row++, col++) {
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

    // Dynamic style for left panel background
    const leftPanelStyle: React.CSSProperties = {
        backgroundImage: gameStarted ? getLeftPanelBgImage() : undefined,
        backgroundColor: gameStarted ? navPanelColor : 'black',
    };

    return (
        <div className={classes.rootContainer}>
            {/* Left Panel */}
            <div className={classes.leftPanel} style={leftPanelStyle}>
                <div className={classes.headerContainer}>
                    <h1 className={classes.header}>Connect Four</h1>
                    <h2 className={classes.subHeader}>By Joe Kurtz</h2>
                </div>

                {/* Current player panel */}
                {gameStarted && gameWinner === -1 && (
                    <div className={classes.activePlayerCard}>
                        <img src={getPlayerImage(playerTurn)} className={classes.playerImg} />

                        {/* Text */}
                        <div className={classes.playerTurn}>
                            <div className={classes.currentPlayer}>
                                {playerTurn === 0 ? '' : `Player ${playerTurn}`}
                            </div>
                            <div className={classes.yourTurn}>Your Turn</div>
                        </div>
                    </div>
                )}
                {/* Game winner image / text */}
                {gameWinner !== -1 && (
                    <div className={classes.winnerColumn}>
                        <div className={classes.winnerImage}>
                            <img
                                className="glow"
                                alt="Game Winner Icon"
                                src={getPlayerImage(gameWinner)}
                                style={{ width: '65%' }}
                            />
                        </div>
                        <div className={classes.playerWins}>{`PLAYER ${playerTurn}\nWINS!`}</div>
                    </div>
                )}
                <div className={classes.flexGrow} />
                <Button onClick={onResetButtonClick} className={classes.resetGameButton} icon={<ArrowReset24Filled />}>
                    Reset Game
                </Button>
            </div>

            {/* Main Panel */}
            <Xwrapper>
                <div className={classes.gameGridContainer}>
                    {renderGrid()}

                    {gameWinner !== -1 && (
                        <Xarrow
                            zIndex={3}
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
                            strokeWidth={12}
                            showHead={false}
                            path={'straight'}
                        />
                    )}

                    {/* Player Selection Dialog Overlay */}
                    {dialogOpen && (
                        <div className={classes.playerSelectionOverlay}>
                            <PlayerSelectionDialog
                                isOpen={dialogOpen}
                                playerOptions={playerOptions}
                                closeDialog={handleCloseDialog}
                                setPlayerChoices={handleSetPlayerChoices}
                            />
                        </div>
                    )}
                </div>
            </Xwrapper>
        </div>
    );
};

const useStyles = makeStyles({
    rootContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        justifyContent: 'center',
        gap: '15px',
    },
    leftPanel: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        minWidth: '18vw',
        maxWidth: '18vw',
        border: `3px solid black`,
        backgroundPositionX: 'left',
        backgroundPositionY: 'bottom',
        backgroundSize: 'cover',
        alignItems: 'center',
        alignContent: 'center',
        height: '100%',
        borderRadius: '5px',
    },
    header: {
        color: '#7c795d',
        fontFamily: 'Trocchi',
        fontSize: '32px',
        fontWeight: 1000,
        lineHeight: '0px',
        marginTop: '26px',
        textAlign: 'center',
    },
    subHeader: {
        color: '#ffcc66',
        fontSize: '17px',
        fontWeight: 300,
        marginBottom: '48px',
        marginLeft: '30px',
        textAlign: 'center',
    },
    activePlayerCard: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        border: '1px solid white',
        backgroundColor: 'black',
        maxWidth: '90%',
        borderRadius: '4px',
    },
    playerTurn: {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        width: '100%',
        margin: 'auto 0 auto',
        textAlign: 'center',
    },
    currentPlayer: {
        fontFamily: 'Trocchi',
        fontSize: '22px',
        fontWeight: 700,
        color: 'white',
        lineHeight: '15px',
        overflow: 'ellipsis',
    },
    yourTurn: {
        fontSize: '20px',
        fontWeight: 300,
        color: '#ffcc66',
        overflow: 'ellipsis',
    },
    playerWins: {
        margin: '20px auto 0px auto',
        textAlign: 'center',
        width: '70%',
        wordWrap: 'normal',
        fontSize: '36px',
        fontWeight: 1000,
        color: 'white',
    },
    resetGameButton: {
        maxHeight: '35px',
        minHeight: '35px',
        borderRadius: '4px',
        width: '70%',
        backgroundColor: 'white',
        color: 'black',
        marginBottom: '20px',
        gap: '5px',
    },
    flexGrow: {
        flexGrow: 1,
        height: '100%',
    },
    winnerColumn: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        alignItems: 'center',
    },
    winnerImage: {
        textAlign: 'center',
    },
    winnerImg: {
        width: '65%',
    },
    gameGridContainer: {
        display: 'flex',
        flexGrow: 3,
        justifyContent: 'center',
        border: '2px solid black',
        borderRadius: '5px',
        padding: '1.5%',
        backgroundColor: 'rgb(74, 74, 74)',
        boxShadow: '10px 10px 15px black',
        zIndex: 5,
        position: 'relative',
    },
    playerSelectionOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'hsla(0, 0.00%, 0.00%, 0.45)',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
    },
    playerImg: {
        maxWidth: '40%',
        height: 'auto',
        objectFit: 'contain',
    },
    headerContainer: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
    },
});
