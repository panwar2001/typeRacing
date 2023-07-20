// import "./username.css";
import { useState } from "react";
import Characters from "./Characters";
import { Link} from "react-router-dom";
import Styled from "styled-components";
const Name=Styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 5%;
font-size: 1.5em;
font-weight: bold;
`;
const Field=Styled.div`
width: 100%;
height: 56px;
border-radius: 4px;
position: relative;
background-color: lightgreen;
transition: 0.3s all;
height:50vh;
width: 40%;
justify-content: center;
align-items: center;
text-align: center; 
&:hover{
  background-color:#28cc70;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);    
}
`;
const Input=Styled.input`
  font-size: 1.3em;
  margin-top: 10%;
`;
const Button=Styled.button`
background-color: black;
color: white;
font-size: 20px;
padding: 10px 60px;
border-radius: 5px;
margin: 10px 0px;
cursor: pointer;
float:bottom;
margin-top:20%;
`;
export default ()=>{
    const [name,setName]=useState(Characters());
   return <Name>
    <Field>
        Enter your name
        <br/>
         <Input type='text' value={name} onChange={(e)=>setName(e.target.value)}/>
        <br/>
        <Link to="/Practice" state={{ data: 'abc' }} className="link">
          <Button onClick={()=>{}}>Submit</Button>        
        </Link>
     </Field>
   </Name>
}