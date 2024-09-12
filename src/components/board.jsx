import { useEffect, useState } from 'react'
import TurnIndicator from '../components/turnIndicator';
import { GetPlayerColorById } from '../gameUtils';
import AnimateChip from '../components/chip';

export default function Board({numRows=6, numColumns=7, gameState, setGameState, gameEndState, setGameEndState, isAnimating, setAnimating, currentPlayer }) {
    const [rowIdentifierDivs, setRowIdentifierDivs] = useState([]);
    const [cells, setCells] = useState([]);
    const [maskCells, setMaskCells] = useState([]);

    const cellRadius = 20;
    const cellSpacing = 50;

    const setAnimateOff = (chipId) => {
        let chips = [...gameState.cells];
        let chip = {...chips[chipId - 1]};
        chip.doAnimate = false;
        chips[chipId - 1] = {...chip};
        
        setGameState({...gameState, cells: [...chips]});
        setAnimating(false);
    };

    const columnClickHandler = (e) => {
        if(gameEndState.isCompleted) return;
        if(isAnimating) return;

        const columnId = parseInt(e.currentTarget.getAttribute("columnid"));

        const chips = [...gameState.cells];
        if(chips.length == 0) {
            console.error("No cells in the game state!");
            return;
        }

        let nextOccupyCell = {uid:-1};
        const columnRows = chips.filter(item => item.colId == columnId);
        columnRows.forEach((cell) => {
            if(cell.owner == 0) {
                nextOccupyCell = {...cell};
            }
        });

        if(nextOccupyCell.uid > 0) {
            let isColumnFull = true;
            for(let i = 0; i < columnRows.length; i++) {
            if(columnRows[i].uid != nextOccupyCell.uid && columnRows[i].owner <= 0) isColumnFull = false;
            }

            if(isColumnFull) {
                let divs = [...rowIdentifierDivs];
                let columnDiv = {...divs[columnId - 1]};
                columnDiv.isFull = true;
                divs[columnId - 1] = {...columnDiv};

                setRowIdentifierDivs([...divs]);
            }

            nextOccupyCell.owner = currentPlayer;
            nextOccupyCell.startX = nextOccupyCell.finalX;
            nextOccupyCell.startY = 20;
            nextOccupyCell.doAnimate = true;

            const cellArrayIndex = parseInt(nextOccupyCell.uid) - 1;
            chips[cellArrayIndex] = {...nextOccupyCell};

            setGameState({...gameState, isInit:true, cells: [...chips], lastPlacedChip: {...nextOccupyCell}});
            setAnimating(true);
        }
        else {
            console.log("Column does not have free cells. Skipping...");
        }
    };

    useEffect(() => {
        if(gameEndState.isCompleted) return;
        if(gameState.isInit) return;

        const rowWidth = 100 / numColumns;

        const rowIdentifierDivsLocal = []; // promini ime u columnIdentifierDivs
        for (let col = 0; col < numColumns; col++) {
        const position = rowWidth * col;
        rowIdentifierDivsLocal.push({
            columnId: col + 1, 
            isFull: false, 
            rowWidth: rowWidth, 
            position: position
        });
        }
        setRowIdentifierDivs([...rowIdentifierDivsLocal]);

        const cellsLocal = [];
        const maskCellsLocal = [];
        const gameStateCellsLocal = [];
        // Draw cells
        let uid = 1;
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numColumns; col++) {
                let cx = col * cellSpacing + cellSpacing / 2;
                let cy = row * cellSpacing + cellSpacing / 2;

                cellsLocal.push(<circle className="cell" cx={cx} cy={cy} r={cellRadius} shapeRendering="geometricPrecision" />);
                maskCellsLocal.push(
                <g id={`cell-${uid}`}>
                    <circle cx={cx} cy={cy} r={cellRadius} fill="black" filter="url(#shadow)" />
                    {/*<text x={cx} y={cy} textAnchor="middle" stroke="#ed0707" strokeWidth="2px" dy=".3em">{uid}</text>*/}
                </g>
                );

                gameStateCellsLocal.push({
                rowId: row + 1,
                colId: col + 1,
                uid: uid++,
                owner: 0, // Player owner (0 - Not taken, 1 - Player1, 2 - Player2)
                doAnimate: false,
                finalX: cx,
                finalY: cy
                });
            }
        }

        setCells([...cellsLocal]);
        setMaskCells([...maskCellsLocal]);

        setGameState({
        ...gameState,
        isInit: true,
        cells: [...gameStateCellsLocal]
        });
    }, [gameEndState]);


    if(!gameState.isInit) {
        return (
        <h1>Učitavanje</h1>
        );
    }

    return (
        <>
            <div>
                
                <div className="board-wrapper">
                    <div className="board" draggable={false}>
                        <svg id="boardChips" className="board-part" viewBox="0 0 350 300">
                            <defs>
                            <filter id="specularLight" primitiveUnits="objectBoundingBox">
                                <feSpecularLighting
                                result="specOut"
                                specularExponent="20"
                                lightingColor="#242323">
                                <fePointLight x="0.6" y="0.2" z="0.4" />
                                </feSpecularLighting>
                                <feComposite
                                in="SourceGraphic"
                                in2="specOut"
                                operator="arithmetic"
                                k1="0"
                                k2="1"
                                k3="1"
                                k4="0" />
                            </filter>
                            </defs>
                            {gameState.cells.map(cell => {
                            if(cell.owner <= 0) return (<></>);

                            if(cell.doAnimate) {
                                return (<AnimateChip cellData={cell} chipColor={GetPlayerColorById(cell.owner, gameState)} chipRadius={cellRadius} setAnimateOff={() => setAnimateOff(cell.uid)}/>);
                            }
                            else {
                                
                                return (
                                <g id={`cell-${cell.uid}`}>
                                    <circle className="chip" fill={GetPlayerColorById(cell.owner, gameState)} cx={cell.finalX} cy={cell.finalY} r={cellRadius} />
                                    {/*<text x={cell.finalX} y={cell.finalY} textAnchor="middle" stroke="#51c5cf" strokeWidth="2px" dy=".3em">{cell.uid}</text>*/}
                                </g>
                                );
                            }
                            })}
                        </svg>
                        <svg id="boardCells" className="board-part" viewBox="0 0 350 300">
                            {cells}
                        </svg>
                        <svg id="boardObject" className="board-part" viewBox="0 0 350 300">
                            <defs>
                            <filter id="shadow">
                                <feDropShadow dx="0.2" dy="0.4" stdDeviation="0.2" />
                            </filter>
                            <mask id="cellsMask" x={0} y={0} width="100%" height="100%">
                                <rect width="100%" height="100%" fill="white" />
                                {maskCells}
                            </mask>  
                            </defs>
                            <rect cx={0} cy={0} width="100%" height="100%" fill="#1a73e8" mask="url(#cellsMask)" />
                            {/*<rect dx={0} dy={10} width={10} height={20} fill="#1a73e8" />*/}
                        </svg>

                        {rowIdentifierDivs.map(div => {
                            return (
                            <div className={`column-identifier pulse ${div.isFull ? "nohighlight" : ""}`} style={{width:div.rowWidth+"%", left:div.position+"%"}}
                                key={`column-${div.columnId}`}
                                columnid={div.columnId}
                                onClick={columnClickHandler}
                                draggable={false}
                            >
                            </div>
                            );
                        })}
                    </div>
                    
                    <TurnIndicator player={currentPlayer == 1 ? gameState.player1 : gameState.player2} isGameRunning={gameState.gameStateType == "GAME_RUNNING"} />
                </div>
            </div>
        </>
    );
}