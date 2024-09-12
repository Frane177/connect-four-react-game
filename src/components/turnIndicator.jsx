export default function TurnIndicator({player, isGameRunning}) {
    if(isGameRunning)
        return (
            <div className="turn-indicator-wrapper">
                <label><em>Trenutno igra</em></label>
                <h3 style={{marginTop:"0"}}>{player.name}</h3>
                <svg width="60" height="60" viewBox="0 0 60 60">
                    <circle className="chip" fill={player.color} filter="url(#specularLight)" cx={30} cy={30} r={30} />
                </svg>
            </div>
        );
    else
        return (
            <>
                <div className="turn-indicator-wrapper">
                    <label><em>Trenutno igra</em></label>
                    <h3 style={{marginTop:"0"}}>PAUZA</h3>
                </div>
            </>
        );
}