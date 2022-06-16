const socket =io('http://localhost:8000/');

const form = document.getElementById('send-container');
const msgip = document.getElementById('msgip');
const messageContainer = document.querySelector(".container")

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = msgip.value;
    append('You:${message}','right')
    socket.emit('send',message)
})
var audio =new audio('Bubble-sound.mp3');

const append =(message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play()
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = msgip.value;
    append('You: ${message}','right');
    socket.emit('send',message)
    msgip.value=''
})
//const name = prompt("enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined',name =>{
    append('${name} joined the chat','right')})

socket.on('receive',data =>{
    append('${data.name}:${data.message}','left')})

socket.on('left',name =>{
    append('${data.name} left the chat','left')})



