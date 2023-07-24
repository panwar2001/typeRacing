import styled from 'styled-components';

const ProgressBarContainer = styled.div`
  background: #ccc;
  height: 20px;
  border-radius: 5px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div`
  display: flex;
  align-items: right;
  justify-content: right;
  width: ${props => `${props.percentage}%`};
  background: green;
  height: 100%;
  color: white;
  font-weight: bold;
  transition: width 0.3s ease-in-out;
`;

const calculatePercentage = (correct, wordsLength) => {
    if (wordsLength!== 0) {
      return ((correct/ wordsLength) * 100).toFixed(2);
    }
    return 0;
  };

export default ({correct,totalWords}) => {
const percentage = calculatePercentage(correct, totalWords);
  return (
    <ProgressBarContainer>
      <ProgressBarFill percentage={percentage}>{`${percentage}%`}
        <img
        src='/car.svg'
        width='58'
        height='24'
      />
    </ProgressBarFill>
    </ProgressBarContainer>
  );
};
