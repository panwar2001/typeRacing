import { useState } from "react";
import Characters from "./Characters";
import Styled from "styled-components";
import Practice from "./Practice/Practice";
import Multiplayer from "./Multiplayer/Multiplayer";
import ParticlesBg from "particles-bg";
import "./App.css";


const Name=Styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 5%;
font-size: 1.5em;
font-weight: bold;
`;
const Field=Styled.div`
border-radius: 30px;
color:white;
position: relative;
background-color: rgb(0, 32, 63);
transition: 0.3s all;
height:70vh;
width: 60%;
justify-content: center;
align-items: center;
text-align: center; 
&:hover{
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);    
}
`;
const Input=Styled.input`
  font-size: 1.3em;
  margin-top: 10%;
  border-radius: 1.8em;
  outline: none;
  padding: 0.5em 1em;
`;
const Button=Styled.button`
background-color: black;
color: white;
font-size: 20px;
padding: 20px 25px;
border-radius: 5px;
margin: 10px 10px;
cursor: pointer;
float:bottom;
margin-top:17%;
`;
export default ()=>{
    const [name,setName]=useState(Characters());
    const [level,setLevel]=useState(null);
    const [play,setPlay]=useState(null);
    if(play=='Practice'){
      return <Practice name={name} level={level}/>
    }else if(play=='Multi'){
      return <Multiplayer name={name} level={level}/>
    }
   if(level!=null){
    return ( 
      <>
      <Name>
        <Field>
          <h2>{name}</h2>
   
          <Button className="my-button" onClick={()=>setPlay('Practice')}>Join  Practice </Button>        
          <Button className="my-button"  onClick={()=>setPlay('Multi')}>Join Multi Player</Button>        
     </Field>
   </Name>
        <ParticlesBg type={"polygon"} bg={true} />
        </>
    );
    }
   return (
     <>
     <Name>
    <Field>
      <div style={{ marginTop: "20px" }}>
        Enter your name
     </div>
         <Input type='text' value={name} onChange={(e)=>setName(e.target.value)}/>
         <br/>
           Level of difficulty?
          <Button className="my-button" onClick={()=>setLevel('Easy')}>Easy </Button>        
          <Button className="my-button" onClick={()=>setLevel('Medium')}>Medium</Button>        
          <Button className="my-button" onClick={()=>setLevel('Hard')}>Hard</Button>        
     </Field>
   </Name>
       <ParticlesBg type={"polygon"} bg={true} />
       </>
     );
}
