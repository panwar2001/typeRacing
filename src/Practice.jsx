import styled from "styled-components";
import MainInput from "./MainInput";
import Player from "./Player";
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
export default ()=>{
 return (<BorderedDiv>
         <HeaderDiv>
            Practice Racetrack
         </HeaderDiv>
         <Container>
           You are in a single player Race.<br/>
           Go!
         </Container>
         <Player distance={.50}/>
         <InnerContainer>
             <TextContainer>
             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
             </TextContainer>
             <MainInput/>
         </InnerContainer>
       </BorderedDiv>)    
}