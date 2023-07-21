const express=require('express');
const app=express();
const http=require('http');
const server=http.createServer(app);
const {Server}=require('socket.io');
const io=new Server(server,{cors:{origin:'*'}});
require('dotenv').config();
const PORT=process.env.PORT|8080;

const easy = io.of('/easy');
const medium = io.of('/medium');
const hard = io.of('/hard');
let remainingTime = 61; 

let easyLevelData={}, mediumLevelData={}, hardLevelData={};

setInterval(() => {
    remainingTime=remainingTime-1>=0?remainingTime-1:60;
    if(remainingTime==60){
      easyLevelData={};
      mediumLevelData={};
      hardLevelData={};
    }
      easy.emit("players_update",remainingTime,easyLevelData);
      medium.emit("players_update",remainingTime,mediumLevelData);
      hard.emit("players_update",remainingTime,hardLevelData);
  }, 1000); 

easy.on('connection', (socket) => {
   socket.on('playerInfo', (name,speed) => {
    easyLevelData[socket.id]={
      name:name,
      wpm:speed
    }
    console.log(name,speed);
  });
});
medium.on('connection', (socket) => {
  socket.on('playerInfo', (name,speed) => {
    mediumLevelData[socket.id]={
      name:name,
      wpm:speed
    }
  });
});
hard.on('connection', (socket) => {
  socket.on('joinGame', (name,speed) => {
    hardLevelData[socket.id]={
      name:name,
      wpm:speed
    }
  });
});


server.listen(PORT,()=>console.log(`server started listening on port ${PORT}`));
