import styled from "styled-components";
import {useState, useEffect, useRef} from 'react'
import { io } from 'socket.io-client';
import "./TypingGame.css";
import axios from "axios";
import LeaderBoard from "../LeaderBoard";
import ProgressBar from "../ProgressBar";
const URL="https://typerace-10ww.onrender.com";
const easy=io(`${URL}/easy`);
const medium=io(`${URL}/medium`);
const hard=io(`${URL}/hard`);

 const HeaderDiv=styled.div`
  color:white;
  font-size:2em;
 `;
 const BorderedDiv = styled.div`
  margin-top: 20px;
  background-color: #00203fff;
  border: 1px solid #6e40c9;
  padding: 20px;
  border-radius: 30px;
  width: 95%;
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
 background-color: #00203fff;
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
margin: 30px;
`;

const StyledInput = styled.input`
  width: 100%;
  margin-top: 10px;

  background-color: "white";
  font-size: 2.15rem;
  height: 40px;
  text-indent: 38%;
  outline: none;
`;




export default ({name,level})=>{
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
  const [wpm,setWpm]=useState(0);
  useEffect(() => {
    if (status === 'started') {
      textInput.current.focus()
    }
  }, [status]);

  useEffect(()=>{
    if(level=='Easy'){
      easy.emit("playerInfo",name,correct);
    }else if(level=='Medium'){
      medium.emit("playerInfo",name,correct);
    }else if(level=='Hard'){
      hard.emit("playerInfo",name,correct);
    }
  },[correct]);

  useEffect(()=>{
    const clear=()=>{
      setCurrWordIndex(0)
      setCorrect(0)
      setIncorrect(0)
      setCurrCharIndex(-1)
      setCurrChar("")
      setWpm(0);
      setCurrInput('');
    }
   
    if(level=='Easy'){
        easy.on("players_update",(countdown,data,timeElapsed,paragraph)=>{
           setCountDown(countdown);
           if(Object.keys(data).length){
            setWpm(Math.round(data[easy.id].words*100.0/timeElapsed)/100.0);
           }
           if(paragraph)setWords(paragraph);
           if(countdown==0){
              clear();
            }
              const arr=Object.keys(data).map((id)=>{
                return [data[id].name,Math.round(data[id].words*100.0/timeElapsed)/100.0];
              })
            arr.sort((a,b)=>{
              return a[1]<b[1];
            })
             setPlayers(arr);
        }); 
        axios.get(`${URL}/easyParagraph`).then((response)=>{
          setWords(response.data.paragraph);
        }); 
      }else if(level=='Medium'){
        medium.on("players_update",(countdown,data,timeElapsed,paragraph)=>{
          setCountDown(countdown);
          if(Object.keys(data).length){
           setWpm(Math.round(data[medium.id].words*100.0/timeElapsed)/100.0);
          }
          if(paragraph)setWords(paragraph);
          if(countdown==0){    
            clear();
          }
          const arr=Object.keys(data).map((id)=>{
            return [data[id].name,Math.round(data[id].words*100.0/timeElapsed)/100.0];
          })
          arr.sort((a,b)=>{
            return a[1]<b[1];
          })
          setPlayers(arr);
       });
       axios.get(`${URL}/mediumParagraph`).then((response)=>{
        setWords(response.data.paragraph);
      }); 
      }else if(level=='Hard'){
         hard.on("players_update",(countdown,data,timeElapsed,paragraph)=>{
          setCountDown(countdown);
          if(Object.keys(data).length){
           setWpm(Math.round(data[hard.id].words*100.0/timeElapsed)/100.0);
           }
           if(paragraph)setWords(paragraph);
          if(countdown==0){    
            clear();
          }
          const arr=Object.keys(data).map((id)=>{
            return [data[id].name,Math.round(data[id].words*100.0/timeElapsed)/100.0];
          })
          arr.sort((a,b)=>{
             return a[1]<b[1];
          })
          setPlayers(arr);
       });
       axios.get(`${URL}/hardParagraph`).then((response)=>{
        setWords(response.data.paragraph);
      }); 
      }
  },[])  


  function handleKeyDown({keyCode, key}) {
    if(keyCode==16)return;
    if (keyCode === 32) {
      checkMatch()
      setCurrInput("")
      setCurrWordIndex(currWordIndex + 1)
      setCurrCharIndex(-1)
    } else if (keyCode === 8) {
      setCurrCharIndex(currCharIndex - 1)
      setCurrChar("")
    } else {
      setCurrCharIndex(currCharIndex + 1)
      setCurrChar(key)
    }
  }

  function checkMatch() {
    const wordToCompare = words[currWordIndex];
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
  const anotherStyle = (idx, wordIdx) => {
    if (idx === currCharIndex + 1 && wordIdx === currWordIndex) {
      return {
        textDecoration: "underline blue",
        color: "blue",
        textDecorationSkipInk: "none",
      };
    } else if (wordIdx === currWordIndex) {
      return { textDecoration: "underline" };
    }
  };

 return (<>
  <div style={{ display: "flex", justifyContent: "center" }}>
  <BorderedDiv>
         <HeaderDiv>
            Hi {name}, you are at {level} level
            <br/>
            Practice Racetrack | Time Left For Next Game: {countDown} | Words per minute:{wpm} 
         </HeaderDiv>
         <Container>
           You are in a single player Race.<br/>
           Go! 
         </Container>
         <ProgressBar correct={correct} totalWords={words.length}/>
         <InnerContainer>
             <TextContainer>
             {(status === 'started') && words.map((word, i) => (
                  <span key={i}>
                    <span>
                      {word.split("").map((char, idx) => (
                        <span style={anotherStyle(idx,i)} className={getCharClass(i, idx, char)} key={idx}>{char}</span>
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
   </div>
        {players&&<LeaderBoard data={players}/>}
       </>
       )    
}
