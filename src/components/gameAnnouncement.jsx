export default function GameAnnouncement({isWin, winner, replayAction}) {
    return (
        <div className="game-announcement-wrapper">
            <div className="game-announcement bg-light text-dark">
                {isWin ? 
                    <h1 style={{textAlign:"center"}}>{winner.name} je pobijedio/la!</h1> : 
                    <h1 style={{textAlign:"center"}}>Izjednačeno!</h1>}
                <div style={{display:"flex", justifyContent:"center"}}>
                    <button className="button-play" onClick={e => {replayAction();}}>Igraj ponovno!</button>
                </div>
            </div>
        </div>
    );
}