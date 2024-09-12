import { useState } from "react";

export default function PreGamePanel({_playerOneData, setPlayerOneData, _playerTwoData, setPlayerTwoData, startGame})  {

    const [playerOneData, changePlayerOne] = useState({..._playerOneData});
    const [playerTwoData, changePlayerTwo] = useState({..._playerTwoData});

    const onPlayerOneNameChange = (e) => {
        const newData = {...playerOneData, name: e.target.value};
        changePlayerOne({...newData});
        setPlayerOneData({...newData});
    };

    const onPlayerOneColorChange = (e) => {
        const newData = {...playerOneData, color: e.target.value};
        changePlayerOne({...newData});
        setPlayerOneData({...newData});
    };

    const onPlayerTwoNameChange = (e) => {
        const newData = {...playerTwoData, name: e.target.value};
        changePlayerTwo({...newData});
        setPlayerTwoData({...newData});
    };

    const onPlayerTwoColorChange = (e) => {
        const newData = {...playerTwoData, color: e.target.value};
        changePlayerTwo({...newData});
        setPlayerTwoData({...newData});
    };

    const validate = () => {
        return true;
    };

    const onSubmitData = (e) => {
        if(!validate()) return;

        startGame();
    };

    return (
        <>
            <div className="pre-game-panel-wrapper">
                <div className="pre-game-panel bg-light text-dark">
                    <h2 style={{textAlign:"center", margin:0, marginBottom:"25px"}}>Nova igra</h2>
                    <div className="player-setup">
                        <label>Prvi Igrač</label>
                        <input type="text" onChange={onPlayerOneNameChange} value={playerOneData.name} placeholder="Naziv"  />
                        <input type="color" onChange={onPlayerOneColorChange} value={playerOneData.color}  />
                    </div>
                    <div className="player-setup">
                        <label>Drugi Igrač</label>
                        <input type="text" onChange={onPlayerTwoNameChange} value={playerTwoData.name} placeholder="Naziv" />
                        <input type="color" onChange={onPlayerTwoColorChange} value={playerTwoData.color}  />
                    </div>
                    <div style={{display:"flex", justifyContent:"center"}}>
                        <button className="button-play" onClick={onSubmitData}>Igraj!</button>
                    </div>
                </div>
            </div>
        </>
    );
}