export function CheckWin(rowCount, columnCount, currentPlayer, chips, lastPlacedChip) {
    const maxStreak = 4;
    let streakCounter = 0;

    // Provjeri horizontalno
    console.log("HORIZONTALNO");
    for(let colId = 1; colId <= columnCount; colId++) {
        const cellId = lastPlacedChip.rowId * columnCount - (columnCount - colId);

        console.log(cellId);
        if(chips[cellId - 1].owner == currentPlayer) {
            if(++streakCounter == maxStreak) return true;
        }
        else {
            streakCounter = 0;
        }
    }

    streakCounter = 0;

    // Provjeri vertikalno
    console.log("VERTIKALNO");
    for(let rowId = 0; rowId < rowCount; rowId++) {
        const cellId = lastPlacedChip.colId + (rowId * columnCount);

        console.log(cellId);
        if(chips[cellId - 1].owner == currentPlayer) {
            if(++streakCounter == maxStreak) return true;
        }
        else {
            streakCounter = 0;
        }
    }

    // Provjeri dijagonalu s desna na lijevo
    console.log("DIJAGONALA RIGHT 2 LEFT");
    for(let rowId = 1; rowId <= rowCount; rowId++) {
        streakCounter = 0;
        const firstCellId = rowId == 1 ? 1 : (rowId - 1) * columnCount + 1;
        console.log("first cell: " + firstCellId);
        for(let diagonalCellId = firstCellId; diagonalCellId > 0; diagonalCellId -= (columnCount - 1)) {
            console.log(diagonalCellId);
            if(chips[diagonalCellId - 1].owner == currentPlayer) {
                if(++streakCounter >= maxStreak) return true;
            }
            else {
                streakCounter = 0;
            }
        }

        streakCounter = 0;
        const counterFirstCellId = rowId == 0 ? columnCount : (rowId * columnCount);
        console.log("counter first cell: " + counterFirstCellId);
        for(let diagonalCellId = counterFirstCellId; diagonalCellId < rowCount * columnCount; diagonalCellId += (columnCount - 1)) {
            console.log(diagonalCellId);
            if(chips[diagonalCellId - 1].owner == currentPlayer) {
                if(++streakCounter >= maxStreak) return true;
            }
            else {
                streakCounter = 0;
            }
        }   
    }

    // Provjeri dijagonalu s lijeva na desno
    console.log("DIJAGONALA LEFT 2 RIGHT");
    for(let rowId = 1; rowId <= rowCount; rowId++) {
        streakCounter = 0;
        const firstCellId = rowId == 1 ? 1 : (rowId - 1) * columnCount + 1;
        console.log("first cell: " + firstCellId);
        for(let diagonalCellId = firstCellId; diagonalCellId < columnCount * rowCount; diagonalCellId += (columnCount + 1)) {
            console.log(diagonalCellId);
            if(chips[diagonalCellId - 1].owner == currentPlayer) {
                if(++streakCounter >= maxStreak) return true;
            }
            else {
                streakCounter = 0;
            }
        }

        // Provjera s lijeva prema desno
        streakCounter = 0;
        const counterFirstCellId = rowId == 0 ? columnCount : (rowId * columnCount);
        console.log("counter first cell: " + counterFirstCellId);
        for(let diagonalCellId = counterFirstCellId; diagonalCellId > 1; diagonalCellId -= (columnCount + 1)) {
            console.log(diagonalCellId);
            if(chips[diagonalCellId - 1].owner == currentPlayer) {
                if(++streakCounter >= maxStreak) return true;
            }
            else {
                streakCounter = 0;
            }
        }   
    }

    return false;
}

export function CheckDraw(chips) {
    for(let i = 0; i < chips.length; i++) {
        if(chips[i].owner <= 0) {
            return false;
        }
    }

    return true;
}