const socket = io();
const form = document.getElementById("send");
const messageInput = document.getElementById("send_msg"); 
const messageContainer = document.getElementById("message-box"); 
const audio1=new Audio('/sounds/msg_notification.mp3');
const audio2=new Audio('/sounds/join-leave-notification.mp3');

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message"); 
  messageElement.classList.add(position); 
  messageContainer.appendChild(messageElement);
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = messageInput.value;
  append(`You:${message}`, "right");
  socket.emit("send", message); 
  messageInput.value="";
});

// User join prompt
const username = prompt("Enter your Username");
socket.emit("new_user_joined", username); //sending to sever

socket.on("User-Joined", (username) => {
  append(`${username} joined :)`, "center");
  audio2.play();
});

//recieving message from server
socket.on("recieve",(data) => {
  append(`${data.username}:${data.message}`,"left");
  audio1.play();
});

socket.on("User-left", (username) => {
  append(`${username} Left :(`, "center");
  audio2.play();
});











