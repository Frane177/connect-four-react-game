import { useEffect, useState } from 'react'
import { CheckDraw, CheckWin } from '../gameLogic';
import GameAnnouncement from '../components/gameAnnouncement';
import PreGamePanel from '../components/preGamePanel';

import Board from '../components/board';

const GamePage = () => {
  const [numRows, setNumRows] = useState(6);
  const [numColumns, setNumColumns] = useState(7);

  const [gameState, setGameState] = useState({
    isInit: false,
    gameStateType: "PREGAME", // PREGAME, GAME_RUNNING, GAME_END
    lastPlacedChip: null,
    player1: {
      name: "Player 1",
      color: "#e30000"
    },
    player2: {
      name: "Player 2",
      color: "#e3c500",
    },
    cells: []
  });
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [isAnimating, setAnimating] = useState(false);
  const [gameEndState, setGameEndState] = useState({
    isCompleted: false,
    winner: null
  });

  const setPlayerOneData = (newData) => {
    setGameState({...gameState, player1: {...gameState.player1, ...newData}});
  };

  const setPlayerTwoData = (newData) => {
    setGameState({...gameState, player2: {...gameState.player2, ...newData}});
  };

  const resetGame = () => {
    setGameState({...gameState, gameStateType: "PREGAME", isInit: false, lastPlacedChip: null, cells: []});
    setCurrentPlayer(1);
    setAnimating(false);

    setGameEndState({isCompleted: false, winner: null});
  };

  const startGame = () => {
    setGameState({...gameState, gameStateType: "GAME_RUNNING"});
  };


  useEffect(() => {
    if(gameEndState.isCompleted) return;
    if(!gameState.isInit) return;
    if(isAnimating) return;

    if(!gameState.lastPlacedChip) return;
    
    if(CheckWin(numRows, numColumns, currentPlayer, gameState.cells, gameState.lastPlacedChip)) {
      setGameState({...gameState, gameStateType: "GAME_END"});
      setGameEndState({isCompleted: true, winner: currentPlayer == 1 ? {...gameState.player1} : {...gameState.player2}});
      return;
    }
    else {
      if(CheckDraw(gameState.cells)) {
        setGameState({...gameState, gameStateType: "GAME_END"});
        setGameEndState({isCompleted: true, winner: null});
        return;
      }
    }

    const nextPlayer = currentPlayer == 1 ? 2 : 1;
    setCurrentPlayer(nextPlayer);
  }, [gameState]);
    
  return (
    <>
      <header>
        <svg className="title" viewBox="0 0 240 60" shapeRendering="geometricPrecision" textRendering="geometricPrecision">
            <rect x="30" y="0" width="180" height="60" fill="#3f86e4" />
            <text
                x="120"
                y="35"
                className="title-number"
            >
                4
            </text>
            <text
                textAnchor="center"
                x="66"
                y="38"
                className="title-text"
            >
                POVEŽI
            </text>
        </svg>
      </header>
      <Board numRows={numRows} numColumns={numColumns} gameState={gameState} setGameState={setGameState} gameEndState={gameEndState} setGameEndState={setGameEndState}
        isAnimating={isAnimating} setAnimating={setAnimating} currentPlayer={currentPlayer} />

      {gameState.gameStateType == "PREGAME" ? <PreGamePanel _playerOneData={gameState.player1} _playerTwoData={gameState.player2} setPlayerOneData={setPlayerOneData} setPlayerTwoData={setPlayerTwoData} startGame={startGame} /> : <></>}
      {gameState.gameStateType == "GAME_END" ? <GameAnnouncement isWin={gameEndState.winner != null} winner={gameEndState.winner} replayAction={resetGame} /> : <></>}
    </>
  )
}

export default GamePage;
