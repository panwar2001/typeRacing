import styled from "styled-components";
import Player from "./Player";
import {useState, useEffect, useRef} from 'react'
import { useLocation } from "react-router-dom";
import { io } from 'socket.io-client';
import "./TypingGame.css";
import axios from "axios";
import LeaderBoard from "../LeaderBoard";
const easy=io("https://typerace-10ww.onrender.com/easy");
const medium=io("https://typerace-10ww.onrender.com/medium");
const hard=io("https://typerace-10ww.onrender.com/hard");

 const HeaderDiv=styled.div`
  color:white;
  font-size:2em;
 `;
 const BorderedDiv = styled.div`
  margin-top: 20px;
  background-color: #0d1117;
  border: 1px solid #6e40c9 ;
  border-radius: 5px;
  padding: 20px;
`;
 const TextContainer = styled.p`
  font-size: 1.32rem;
  color:white;
`;

const Container = styled.div`
color:white;
font-size:1.5em;
padding-top:1%;
padding-bottom:2%;
`;
const InnerContainer=styled.div`
 margin-top: 20px; 
 border: 1px solid purple ;
 background-color:#101010;
 border-radius: 5px;
 padding: 20px;
`;
const ButtonsContainer = styled.button`
display:flex;
background-color: black;
color: white;
font-size: 20px;
padding: 10px 60px;
border-radius: 5px;
cursor: pointer;
align-items:center;
`;

const StyledInput = styled.input`
  width: 100%;
  margin-top: 10px;
  font-size: 1.15rem;
  background-color: "white"
`;




export default ()=>{
  const [words, setWords] = useState([])
  const [countDown, setCountDown] = useState('');
  const [currInput, setCurrInput] = useState("")
  const [currWordIndex, setCurrWordIndex] = useState(0)
  const [currCharIndex, setCurrCharIndex] = useState(-1)
  const [currChar, setCurrChar] = useState("")
  const [correct, setCorrect] = useState(0)
  const [incorrect, setIncorrect] = useState(0)
  const [status, setStatus] = useState("started")
  const textInput = useRef(null)
  const [players,setPlayers]=useState(null);
  const location = useLocation();
  const name=location.state?.name;
  const level=location.state?.level;

  useEffect(() => {
    if (status === 'started') {
      textInput.current.focus()
    }
  }, [status]);

  useEffect(()=>{
    if(level=='Easy'){
      easy.emit("playerInfo",name,correct*2);
    }else if(level=='Medium'){
      medium.emit("playerInfo",name,correct*2);
    }else{
      hard.emit("playerInfo",name,correct*2);
    }
  },[correct]);

  useEffect(()=>{
    const clear=()=>{
      setCurrWordIndex(0)
      setCorrect(0)
      setIncorrect(0)
      setCurrCharIndex(-1)
      setCurrChar("")
    }
   
    if(level=='Easy'){
      axios.get("https://typerace-10ww.onrender.com/easyParagraph").then((response)=>{
        setWords(response.data.paragraph);
      });
        easy.on("players_update",(countdown,data)=>{
           setCountDown(countdown);
           if(countdown==0){
            axios.get("https://typerace-10ww.onrender.com/easyParagraph").then((response)=>{
              setWords(response.data.paragraph);
            });
              clear();
            }
            const arr=Object.keys(data).map((id)=>{
              return [data[id].name,data[id].wpm];
            })
            arr.sort((a,b)=>{
              return a[1]<b[1];
            })
             setPlayers(arr);
        }); 
      }else if(level=='Medium'){
        axios.get("https://typerace-10ww.onrender.com/mediumParagraph").then((response)=>{
          setWords(response.data.paragraph);
        });      
        medium.on("players_update",(countdown,data)=>{
          setCountDown(countdown);
          if(countdown==0){
            clear();
            axios.get("https://typerace-10ww.onrender.com/mediumParagraph").then((response)=>{
              setWords(response.data.paragraph);
            });    
          }
          const arr=Object.keys(data).map((id)=>{
            return [data[id].name,data[id].wpm];
          })
          arr.sort((a,b)=>{
            return a[1]>b[1];
          })
          setPlayers(arr);
       });
      }else{
        axios.get("https://typerace-10ww.onrender.com/hardParagraph").then((response)=>{
          setWords(response.data.paragraph);
        }); 
        hard.on("players_update",(countdown,data)=>{
          setCountDown(countdown);
          if(countdown==0){
            clear();
            axios.get("https://typerace-10ww.onrender.com/hardParagraph").then((response)=>{
              setWords(response.data.paragraph);
            });    
          }
          const arr=Object.keys(data).map((id)=>{
            return [data[id].name,data[id].wpm];
          })
          arr.sort((a,b)=>{
            return a[1]>b[1];
          })
          setPlayers(arr);
       });
      }
  },[])  


  function handleKeyDown({keyCode, key}) {
    // space bar 
    if (keyCode === 32) {
      checkMatch()
      setCurrInput("")
      setCurrWordIndex(currWordIndex + 1)
      setCurrCharIndex(-1)
    // backspace
    } else if (keyCode === 8) {
      setCurrCharIndex(currCharIndex - 1)
      setCurrChar("")
    } else {
      setCurrCharIndex(currCharIndex + 1)
      setCurrChar(key)
    }
  }

  function checkMatch() {
    const wordToCompare = words[currWordIndex]
    const doesItMatch = wordToCompare === currInput.trim()
    if (doesItMatch) {
      setCorrect(correct + 1)
    } else {
      setIncorrect(incorrect + 1)
    }
  }

  function getCharClass(wordIdx, charIdx, char) {
    if (wordIdx === currWordIndex && charIdx === currCharIndex && currChar && status !== 'finished') {
      if (char === currChar) {
        return 'has-background-success'
      } else {
        return 'has-background-danger'
      }
    } else if (wordIdx === currWordIndex && currCharIndex >= words[currWordIndex].length) {
      return 'has-background-danger'
    } else {
      return ''
    }
  }


 return (<><BorderedDiv>
         <HeaderDiv>
            Hi {name}, you are at {level} level
            <br/>
            Practice Racetrack | Time Left For Next Game: {countDown} | Words per minute:{correct*2} 
         </HeaderDiv>
         <Container>
           You are in a single player Race.<br/>
           Go! 
         </Container>
         <Player distance={correct/100.0}/>
         <InnerContainer>
             <TextContainer>
             {(status === 'started') && words.map((word, i) => (
                  <span key={i}>
                    <span>
                      {word.split("").map((char, idx) => (
                        <span className={getCharClass(i, idx, char)} key={idx}>{char}</span>
                      )) }
                    </span>
                    <span> </span>
                  </span>
                ))}
             </TextContainer>
             <StyledInput
               type='text'
               ref={textInput} 
               disabled={status !== "started"}
               className="input"
               onKeyDown={handleKeyDown}
               value={currInput} 
               onChange={(e) => setCurrInput(e.target.value)}
               autoFocus/> 
         </InnerContainer>
       </BorderedDiv>
        {players&&<LeaderBoard data={players}/>}
       </>
       )    
}