//TODO use authentication to create an account.

// const submitCreateAccount = () => {
//     const displayName = document.querySelector("#entry-displayname");
//     const email = document.querySelector("#entry-email");
//     const password = document.querySelector("#entry-password");

//     authentiation.createUserWithEmailAndPassword(email.value, password.value)
//         .then(user => {
//             //add displayName
//             user.updateProfile({displayName: displayName.value});
//         });

// };
const submitCreateAccount = (event) => {
    event.preventDefault();
    const displayName = document.querySelector("#entry-displayname");
    const email = document.querySelector("#entry-email");
    const password = document.querySelector("#entry-password");
    let user = null;
   authentication.createUserWithEmailAndPassword(email.value, password.value).then(function() {
       user = authentication.currentUser;
   }).then(() => {
    user.updateProfile({displayName: displayName.value});
   }).catch(error => {
       const errorCode = error.code;
       const errorMessage = error.message;
       console.log(errorCode, errorMessage);
   });
   $('#loginModal').modal('toggle');
   $('#modal-btn').hide();
   $('#navbarSupportedContent').prepend(`<button type="button" id="logout" class="btn btn-primary">Logout</button>`)
};



//If user already has an account

const signInWithEmailAndPassword = (event) => {
    event.preventDefault();
    const email = document.querySelector('#email');
    const password = document.querySelector("#password");

    authentication.signInWithEmailAndPassword(email.value, password.value);
};

const logoutUser = () => {
    authentication.signOut().then(() => {
        console.log("user signed out");
    }).catch(error => console.log(`user not able to logout: ${error}`));
    $('#logout').hide();
    $('#modal-btn').show();
};

// authentication.onAuthStateChanged(authStateChangeListener);

// function authStateChangeListener(user) {
//     //signin
//     if (user) {
//         //do login operations...
//         CharacterData.onlogin();
//         Game.onlogin();
//     } else { //signout
//         window.location.reload();
//     }
// };

