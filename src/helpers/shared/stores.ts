import {writable} from "svelte/store";

export const authenticated = writable(false);


const messageStore = writable('');

const socket  = new WebSocket('ws://3287-82-169-163-180.ngrok.io/');

//connection open
socket.addEventListener('open', function(){
	console.log("it's open")
});

//listen for messages
socket.addEventListener('message', function(event) {
	messageStore.set(event.data)
})

export const sendMessage = (message: string | ArrayBufferLike | Blob | ArrayBufferView) => {
	if (socket.readyState <= 1) {
		socket.send(message)
	}
}

export default {
	subscribe: messageStore.subscribe,
	sendMessage
}