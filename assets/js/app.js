authentication.onAuthStateChanged(user => {      
    if (user) {
    console.log(`user logged in`);
    } else {
        console.log('no user signed in');
    }
});

$(document).on('click', '#formBtn', submitCreateAccount);

$('#chatForm').on("submit", sendChatMessage);

$(document).on('click', '#logout', logoutUser);

