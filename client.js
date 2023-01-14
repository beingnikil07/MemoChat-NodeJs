const socket = io();
// Now we are going to target data like form input,container etc.
const form = document.getElementById("send"); // have target form
const messageInput = document.getElementById("send_msg"); // have target send input
const messageContainer = document.getElementById("message-box"); // target whole message box
const audio1=new Audio('/sounds/msg_notification.mp3');
const audio2=new Audio('/sounds/join-leave-notification.mp3');

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message"); //for adding class in this div
  messageElement.classList.add(position); // yha position kii jagah by default center aa jaayega
  messageContainer.appendChild(messageElement);
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = messageInput.value;
  append(`You:${message}`, "right");
  socket.emit("send", message); //Here send is a event in socket
  messageInput.value="";
});

// User join
const username = prompt("Enter your Username");
socket.emit("new_user_joined", username); //sending to sever

//agar user joined wala event fire hoga server side se to ye hoga
socket.on("User-Joined", (username) => {
  append(`${username} joined :)`, "center");
  audio2.play();
});
//recieving message from server
socket.on("recieve",(data) => {
  append(`${data.username}:${data.message}`,"left");
  audio1.play();
});

//agar user joined wala event fire hoga server side se to ye hoga
socket.on("User-left", (username) => {
  append(`${username} Left :(`, "center");
  audio2.play();
});











