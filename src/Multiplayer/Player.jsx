import styled from "styled-components";
const Road = styled.div`
  width: 100%;
  height: 4px;
  background-color: white;
  padding-right: 40px;
  ::after {
    content: "";
    position: absolute;
    width: 46px;
    right: 15px;
    height: 4px;
    background-color: #6e40c9;
  }
`;


const Player= ({ distance }) => {
  console.log(distance);
  return (
    <>
      <img
        src='/car.svg'
        width='58'
        height='24'
        alt='player car'
        style={{ marginLeft: `${distance * 100 }%` }}
        title='Powerty'
      />
      <Road className='mb-4' />
    </>
  );
};

export default Player;
