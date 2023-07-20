import styled from "styled-components";
import Player from "./Player";
import {useState, useEffect, useRef} from 'react'
import {generate} from 'random-words'
import "./TypingGame.css";

const NUMB_OF_WORDS = 100
const SECONDS = 30

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
  const [countDown, setCountDown] = useState(SECONDS)
  const [currInput, setCurrInput] = useState("")
  const [currWordIndex, setCurrWordIndex] = useState(0)
  const [currCharIndex, setCurrCharIndex] = useState(-1)
  const [currChar, setCurrChar] = useState("")
  const [correct, setCorrect] = useState(0)
  const [incorrect, setIncorrect] = useState(0)
  const [status, setStatus] = useState("waiting")
  const textInput = useRef(null)

  useEffect(() => {
    setWords(generateWords())
  }, [])

  useEffect(() => {
    if (status === 'started') {
      textInput.current.focus()
    }
  }, [status])

  function generateWords() {
    return new Array(NUMB_OF_WORDS).fill(null).map(() => generate())
  }

  function start() {

    if (status === 'finished') {
      setWords(generateWords())
      setCurrWordIndex(0)
      setCorrect(0)
      setIncorrect(0)
      setCurrCharIndex(-1)
      setCurrChar("")
    }

    if (status !== 'started') {
      setStatus('started')
      let interval = setInterval(() => {
        setCountDown((prevCountdown) => {
          if (prevCountdown === 0) {
            clearInterval(interval)
            setStatus('finished')
            setCurrInput("")
            return SECONDS
          } else {
            return prevCountdown - 1
          }
        }  )
      } ,  1000 )
    }
    
  }

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

 return (<BorderedDiv>
         <HeaderDiv>
            Practice Racetrack | Time Left: {countDown} | Words per minute:{correct*2} 
         </HeaderDiv>
         <ButtonsContainer onClick={()=>start()}>
             Start
         </ButtonsContainer>
         <Container>
           You are in a single player Race.<br/>
           Go! 
         </Container>
         <Player distance={.50}/>
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