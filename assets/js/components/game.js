//TODO: create a reference in database for the game session.

const ref = database.ref('/games');

const createGame = () => {
    const user = authentication.currentUser;
    const currentGame = {
        creator: {
        uid: user.uid,
        displayName: user.displayName
        },
        state: STATE.OPEN
    };
    ref.push().set(currentGame);
};


//TODO: make sure only one person can join a game

const joinGame = (key) => {
    const user = authentication.currentUser;
    const gameRef = ref.child(key);
    gameRef.transaction((game) => {
        if (!game.joiner) {
            game.state = STATE.JOINED;
            game.joiner = {uid: user.uid, displayName: user.displayName};
        }
        return game;
    });


    
};


const openGames = ref.orderbyChild('state').equalTo(STATE.OPEN);
openGames.on("child_added", (snapshot) => {
    const data = snapshot.val();
        //ignore your own game
        if (data.creator.uid !== authentication.currentUser.uid) {
            addJoinGameButton(snapshot.key, data);
        }

    });

//TODO: Handle removed games

openGames.on("child_removed", (snapshot) => {
    const item = document.querySelector("#" + snapshot.key);
    if (item) {
        item.remove();
    }
});

const watchGame = (key) => {
    const gameRef = ref.child(key);
    gameRef.on("value", (snapshot) => {
        const games = snapshot.val();
        switch (game.state) {
            case STATE.JOINED: joinedGame(gameRef, game); break;
            case STATE.CHOICE: displayChoice(game); break;
            case STATE.COMPLETE: showWinner(game); break;
        }
    });
}; 
