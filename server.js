const recorder = require('node-record-lpcm16')
const fs = require('fs');
const express = require('express');
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const ip = require("ip");

io.on("connection", (socket) => {
	console.log(socket.id + " new socket connection ");
	socket.on("startAudio", () => {
		var audstream = recorder.record({
				sampleRate: 44100			})
			.stream();
		audstream.on('data', (d) => {
			socket.emit("audioPeice", d);
		});
	});

});

app.get('/fetchaudio', (req, res) => {
	fs.createReadStream("index.html").pipe(res);
});


server.listen(3200,ip.address());
console.log("http://"+ip.address()+":3200/fetchaudio");