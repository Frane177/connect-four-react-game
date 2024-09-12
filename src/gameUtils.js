export function GetPlayerById(id, gameState) {
    if(id == 1) return gameState.player1;
    else return gameState.player2;
}

export function GetPlayerColorById(id, gameState) {
    if(id == 1) return gameState.player1.color;
    else return gameState.player2.color;
}