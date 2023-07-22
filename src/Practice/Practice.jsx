import styled from "styled-components";
import {useState, useEffect, useRef} from 'react'
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./TypingGame.css";
import ProgressBar from "../ProgressBar";


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

const TimeContainer=styled.div`
display:flex;
background-color: black;
color: white;
width:30%;
border:2px solid silver;
font-size: 20px;
padding: 10px 60px;
border-radius: 5px;
cursor: pointer;
align-items:center;
`;



export default ()=>{
  const [SECONDS,setSECONDS]=useState(60);
  const [words, setWords] = useState([])
  const [countDown, setCountDown] = useState(SECONDS)
  const [currInput, setCurrInput] = useState("")
  const [currWordIndex, setCurrWordIndex] = useState(0)
  const [currCharIndex, setCurrCharIndex] = useState(-1)
  const [currChar, setCurrChar] = useState("")
  const [correct, setCorrect] = useState(0)
  const [incorrect, setIncorrect] = useState(0)
  const [status, setStatus] = useState("finished")
  const textInput = useRef(null)
  const location = useLocation();
  const name=location.state?.name;
  const level=location.state?.level;
  const startTime=useRef();
  const [wpm,setWpm]=useState();

  useEffect(() => {
    if (status === 'started') {
      textInput.current.focus()
    }
  }, [status])

  function start() {
    if(isNaN(countDown))return;
    if(countDown<1)return;

    if (status === 'finished') {
      if(level=='Easy'){
        axios.get('https://typerace-10ww.onrender.com/easyParagraph').then((response)=>{
          setWords(response.data.paragraph);
        });
      }else if(level=='Medium'){
        axios.get('https://typerace-10ww.onrender.com/mediumParagraph').then((response)=>{
          setWords(response.data.paragraph);
        });
        }else{
          axios.get('https://typerace-10ww.onrender.com/hardParagraph').then((response)=>{
            setWords(response.data.paragraph);
          });     
        }
      setCurrWordIndex(0)
      setCorrect(0)
      setIncorrect(0)
      setCurrCharIndex(-1)
      setCurrChar("")
      startTime.current=null;
    }
     let getElapsedTime=()=>{
     return (Date.now()-startTime.current)*1.0/60000.0;
     }
    if (status !== 'started') {
      setStatus('started')
      startTime.current=Date.now();
      let interval = setInterval(() => {
        setWpm((prevTime)=>{
          return getElapsedTime();
        });

         setCountDown((prevCountdown) => {
          if (prevCountdown === 0) {
            clearInterval(interval)
            setStatus('finished')
            return SECONDS
          } else {
            return prevCountdown - 1
          }
        }  )
      } ,  1000 )
    }
    
  }

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
 return (<BorderedDiv>
         <HeaderDiv>
            Hi {name}, you are at {level} level
            <br/>
            Practice Racetrack | Time Left: {countDown} | Words per minute:{Math.round((correct*100.0)/wpm)/100} 
         </HeaderDiv>
         <ButtonsContainer onClick={()=>start()}>
             Start
         </ButtonsContainer>
         <TimeContainer >
         Enter time here...
          <input type="text" onChange={(e)=>{setCountDown(e.target.value)}} minLength={2} maxLength={4}/>
         </TimeContainer>
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
       )    
}