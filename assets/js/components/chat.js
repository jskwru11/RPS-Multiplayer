const sendChatMessage = (event) => {
    event.preventDefault();
    const ref = database.ref("/chat");
    const messageField = document.querySelector('#chatInput');

    ref.push().set({
        name: authentication.currentUser.displayName,
        message: messageField.value
    })
};

const addChatMessage = (name, message) => {
    const displayName = name;
    const userMessage = message;

    $('#chatroom').append(`<p>${displayName}: ${userMessage}</p>`);
};

const ref = database.ref("/chat");

ref.on("child_added", snapshot => {
    const message = snapshot.val();
    addChatMessage(message.name, message.message)
});