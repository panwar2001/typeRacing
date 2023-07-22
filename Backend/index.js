const express=require('express');
const cors=require("cors");
const app=express();
app.use(express.json());
app.use(cors({origin: '*'}));
const http=require('http');
const {generate}=require('./randomWords');
const server=http.createServer(app);
const {Server}=require('socket.io');
const io=new Server(server,{cors:{origin:'*'}});

require('dotenv').config();
const PORT=process.env.PORT|8080;

const easy = io.of('/easy');
const medium = io.of('/medium');
const hard = io.of('/hard');
let remainingTime = 91; 

let easyLevelData={}, mediumLevelData={}, hardLevelData={};
let easyParagraph,mediumParagraph,hardParagraph;
let startTime=Date.now();

setInterval(() => {
    remainingTime=remainingTime-1>=0?remainingTime-1:90;
    if(remainingTime==90){
      easyLevelData={};
      mediumLevelData={};
      hardLevelData={};
      easyParagraph=generate(70,"easy")
      mediumParagraph=generate(90,"medium");
      hardParagraph=generate(120,"hard");
      startTime=Date.now();
    }
      easy.emit("players_update",remainingTime,easyLevelData,(Date.now()-startTime)/60000.0);
      medium.emit("players_update",remainingTime,mediumLevelData,(Date.now()-startTime)/60000.0);
      hard.emit("players_update",remainingTime,hardLevelData,(Date.now()-startTime)/60000.0);
  }, 1000); 
easy.on('connection', (socket) => {
   socket.on('playerInfo', (name,speed) => {
    easyLevelData[socket.id]={
      name:name,
      words:speed
    }
  });
});
medium.on('connection', (socket) => {
  socket.on('playerInfo', (name,speed) => {
    mediumLevelData[socket.id]={
      name:name,
      words:speed
    }
    console.log(name,speed);
  });
});
hard.on('connection', (socket) => {
  socket.on('playerInfo', (name,speed) => {
    hardLevelData[socket.id]={
      name:name,
      words:speed
    }
    console.log(name,speed);
  });
});

app.get("/easyParagraph",(req,res)=>{
  res.json({paragraph:easyParagraph});  
})
app.get("/mediumParagraph",(req,res)=>{
  res.json({paragraph:mediumParagraph});
 })
 app.get("/hardParagraph",(req,res)=>{
  res.json({paragraph:hardParagraph});
 })
  
server.listen(PORT,()=>console.log(`server started listening on port ${PORT}`));
