const socket = io();
// Now we are going to target data like form input,container etc.
const form = document.getElementById('send'); // have target form
const messageInput = document.getElementById('send_msg'); // have target send input 
const messageContainer = document.getElementById('message-box'); // target whole message box 

// User join 
const username=prompt("Enter your Username");
socket.emit("new_user_joined",username);     //sending to sever
                                           

