import "./username.css";
import { useState } from "react";
export default ()=>{
    const [name,setName]=useState('');
   return <div className="name">
    <div className="field"> 
        Enter your name
        <br/>
        <input type='text' onChange={(e)=>setName(e.target.value)}/>
        <br/>
        <button >Submit</button>        
     </div>
   </div>

}