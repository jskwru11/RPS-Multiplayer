
//TODO:get player name from input when button clicked

let messages = [];
let players = [];

//TODO: authentication
authentiation.signInAnonymously().catch(function(error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  });

  authentiation.onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      const isAnonymous = user.isAnonymous;
      const uid = user.uid;
      // ...
    } else {
      // User is signed out.
      // ...
    }
    // ...
  });



//TODO: Get the connection of each player
const CONNECTIONSREF = database.ref("/connections");
const CONNECTEDREF = database.ref(".info/connected");

//TODO: request permission from user to send message notifications

messaging.requestPermission()
.then(() => {
    console.log(`You have persmission to send notifications`);
    return messaging.getToken();
}).then(token => {
    console.log(`token is: ${token}`);
})
.catch(error => console.log(`You chose not to receive notifications: ${error}`));

messaging.onMessage(payload => {
    console.log(payload);
});

CONNECTIONSREF.on('value', (snap) => {
    if (snap.numChildren() > 2) {
        console.log('room is full, please try again later!');
    } else {
        console.log(snap.numChildren());
    }
}, (errorObj) => {
    console.log(errorObj.code)
});

CONNECTEDREF.on('value', (snap) => {
    if (snap.val()) {

        // Add user to the connections list.
        var con = CONNECTIONSREF.push(true);
        // Remove user from the connection list when they disconnect.
        con.onDisconnect().remove();
      }
}, (errorObj) => {
    console.log(errorObj.code)
});


let name = '';
let message = '';
let choice = '';
let userKey = '';

database.ref('/playerData').on("value", (snapshot) => {
    if (snapshot.child('name').exists()) {
        name = snapshot.val().name;
        console.log(name);
    }
    if (snapshot.child('message').exists()) {
        message = snapshot.val().message;
    }
    if (snapshot.child('choice').exists()) {
        choice = snapshot.val().choice;
    }

    //TODO: update the DOM with the values from Firebase
    console.log(snapshot.val());
    $('.player-one').text(name);
    $('#chatroom').text(message);


});


//TODO: capture player name from button click and push to database

$('#inputForm').on('submit', (event) => {
    event.preventDefault();

    name = $('#playerName').val().trim();

    userKey = database.ref('/playerData').push({
        name
    });

});


$('#chatForm').on('submit', (event) => {
    event.preventDefault();

    message = $('#chatInput').val().trim();

    database.ref(`playerData/${userKey.key}`).update({
        message
    });
});










// const getPlayerName = (event) => {
//     event.preventDefault();
//     console.log('name submitted!');
//     const playerName = $('#playerName').val();
    
//     if (players.length >= 2) {
//         alert('too many players at the moment!')
//     } else {
//         if (playerName != '') {
//             players.push(playerName);
//             showPlayer();
//         }

//     }
    
// };

// const showPlayer = () => {
//     if (players) {
//         for (let i = 0; i < players.length; i++) {
//             $('.player-one').empty();
//             $('.player-two').empty();
//                 const playerLabel1 = $('<h3>');
//                 const playerLabel2 = $('<h3>');
//             $('.player-one').append(playerLabel1.text(players[0]) || `Waiting for Player1 ...`);
//             $('.player-two').append(playerLabel2.text(players[1]) || `Waiting for Player2 ...`);

//         }
//         players.forEach(player => {
//             $('#chatroom').append(`<p>${player} connected!</p>`);
//         })
//     }
// };

// $('#inputForm').on('submit', getPlayerName);


// const displayPlayerOne = () => {
//     database.ref('players').on('value', (snapshot) => {
//         let testArr = [];
//         snapshot.forEach((childSnapShot) => {
//             console.log(childSnapShot.key);
//             console.log(childSnapShot.val().age)
//             testArr.push({...childSnapShot.val()});
//     })
//     console.log(testArr);
// });
// };


// //TODO: Create on click for chatroom to capture message
// const chatRoomMessage = (event) => {
//     event.preventDefault();
//     console.log('message sent');
//     messages.push($('#chatInput').val());
//     displayMessages();

// };

// const displayMessages = () => {
//     $('#chatroom').empty();
//     messages.forEach(message => {
//         const mId = $('<p>').addClass('new-message');
//         mId.text(message);
//         $('#chatroom').append(mId);
//     });
// };

// $('#chatForm').on('submit', chatRoomMessage);




    // database.ref('players').on('value', (snapshot) => {
    //     let testArr = [];
    //     console.log('data retrieved');
    //     let p1 = $('<h2>').attr('id', 'player1');
    //     snapshot.forEach(childSnapShot => {
    //         testArr.push(childSnapShot.key);
    //         testArr.push(...childSnapShot.val())
    //         console.log(testArr);
    //         p1.text(snapshot.key);
    //         $('.player-one').append(p1);
    //     })

    // });


// const displayPlayerTwo = () => {
//     database.ref('players/-LWwsBsGmTzM4ZUZjlzu/firstName').on('value', (snapshot) => {
//         console.log('data retrieved');
//         let p1 = $('<h2>').attr('id', 'player2');
//         console.log(snapshot.val());
//         p1.text(snapshot.val());
//         $('.player-two').append(p1);
//     });
// };

// const displayPlayer1Message = () => {
//     database.ref
// };


// displayPlayerOne();
// displayPlayerTwo();

// database.ref('players').on('value', (snapshot) => {
//     snapshot.forEach((childSnapShot) => {
//         console.log(childSnapShot.key);
//     })
// });

//save data to firebase
// database.ref('player1').push({
//     firstName: 'John',
//     lastName: 'Alexander',
//     message: 'hey',
//     choice: 'paper'
// }).then(() => {
//     console.log('data saved!')
// });

// database.ref('player2').push({
//     firstName: 'Larry',
//     lastName: 'Smith',
//     message: 'hey how are you?',
//     choice: 'rock'
// }).then(() => {
//     console.log('data saved!')
    
// });

//TODO: create chatroom and get response from players

// const renderPlayer1ToChat = () => {
//     database.ref('player1')
//     .once('value', (snapshot) => {
//         snapshot.forEach((childSnapshot) => {
//             const pgraph = $('<p>');
//             const message = childSnapshot.val();
//             pgraph.text(`${message.firstName}: ${message.message}`)
//             $('#chatroom').append(pgraph);
//         });
//     })
// };

// const renderPlayer2ToChat = () => {
//     database.ref('player2')
//     .once('value', (snapshot) => {
//         snapshot.forEach((childSnapshot) => {
//             const pgraph = $('<p>');
//             const message = childSnapshot.val();
//             pgraph.text(`${message.firstName}: ${message.message}`)
//             $('#chatroom').append(pgraph);
//         })
//     })
// };

// renderPlayer1ToChat();
// renderPlayer2ToChat();

