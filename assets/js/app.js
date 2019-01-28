authentication.onAuthStateChanged(user => {      
    if (user) {
    console.log(`user logged in`);
    } else {
        console.log('no user signed in');
    }
});

$('#inputForm').on('submit', submitCreateAccount);

$('#chatForm').on("submit", sendChatMessage);

