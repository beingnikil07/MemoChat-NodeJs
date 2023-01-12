const socket = io();
// Now we are going to target data like form input,container etc.
const form = document.getElementById("send"); // have target form
const messageInput = document.getElementById("send_msg"); // have target send input
const messageContainer = document.getElementById("message-box"); // target whole message box

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
  //jaise he koi user join karega to server(index.js) User-Joined naam ka event fire karega
  //aur client.js uss message ko pakad lega aur wo ek msg append krr dega
  //ye second param position dii hai mtlb msg kha print karana hai to simply hum isko
  //center wale div mai karwa rhe hai jo hai mere index.html file mai
});
//recieving message from server
socket.on("recieve",(data) => {
  append(`${data.username}:${data.message}`,"left");
  //left is a class jiske through hum server wale msg ko left side mai rakhenge
});

//agar user joined wala event fire hoga server side se to ye hoga
socket.on("User-left", (username) => {
  append(`${username} Left :(`, "center");
  //jaise he koi user join karega to server(index.js) User-Joined naam ka event fire karega
  //aur client.js uss message ko pakad lega aur wo ek msg append krr dega
  //ye second param position dii hai mtlb msg kha print karana hai to simply hum isko
  //center wale div mai karwa rhe hai jo hai mere index.html file mai
});







/*******************************************NOTES**********************************/
/**Abhi ek issue hai kii jaise he hum send button prr click krr rhe hai to ye pure page ko
 * reload krr rha hai to humko iske default behavior ko rokna padega
 */
