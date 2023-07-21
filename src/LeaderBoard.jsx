import Styled from "styled-components";

 const BorderedDiv = Styled.div`
  margin-top: 20px;
  background-color: #0d1117;
  border: 1px solid #6e40c9 ;
  border-radius: 5px;
  padding: 20px;
  color:white;
`;
const Center=Styled.div`
  display:flex;
  justify-content:center;
`;
const InnerContainer=Styled.div`
 margin-top: 20px; 
 border: 1px solid purple ;
 background-color:#101010;
 border-radius: 5px;
 padding: 10px;
 margin: 0px 3px;
 transition: 1s;
 &:hover{
    transform: scale(1.1);
    background: #ff800a;
    z-index: 1;
    box-shadow: 2px 2px 2px #000;    
 }
`;
export default ({data})=>{
return <BorderedDiv>
        <Center>
        <table>
        <thead>
            <tr>
             <th colSpan={3}>  
                <InnerContainer>
                    LeaderBoard 
                </InnerContainer>
               </th>
             </tr>
           </thead>
           <thead>
            <tr>
            <th> 
                <InnerContainer>
                 Rank  
                </InnerContainer>
               </th> 
             <th> 
                <InnerContainer>
                 Name  
                </InnerContainer>
               </th>
               <th> 
                <InnerContainer>
                 words per minute 
                </InnerContainer>
               </th>
             </tr>
           </thead>
           <tbody>
           {data.map((data,index)=>{
            return <tr>
              <td> 
               <InnerContainer>
                 {index+1}  
                </InnerContainer>
               </td>
               <td> 
               <InnerContainer>
                 {data[0]}  
                </InnerContainer>
               </td>
               <td>
                <InnerContainer>
                 {data[1]} 
                </InnerContainer>
                </td>
            </tr>           
          })}    
          </tbody>       
         </table>
        </Center>
    </BorderedDiv>
}