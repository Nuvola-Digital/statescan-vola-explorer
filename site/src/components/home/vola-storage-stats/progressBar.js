import styled from "styled-components";

const ProgressBarContainer = styled.div`
  width: 100%;
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;
const ProgressFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

const ProgressTrack = styled.div`
  width: 100%;
  height: 8px;
  background-color: rgba(250, 250, 250, 0.2);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  margin: 12px 0;
`;

const Text = styled.div`
  font-size: 12px;
  color: ${(p) => p.theme.fontTertiary};
`;

const ProgressFill = styled.div`
  height: 100%;
  background: ${(p) => p.color || p.theme.theme500 || "#FAFAFA"};
  border-radius: 4px;
  transition: width 0.6s ease-in-out;
  width: ${(p) => p.percentage}%;
`;

function ProgressBar({
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  percentage,
  color,
}) {
  return (
    <ProgressBarContainer>
      {(topLeft || topRight) && (
        <ProgressHeader>
          <Text>{topLeft}</Text>
          <Text>{topRight}</Text>
        </ProgressHeader>
      )}
      <ProgressTrack>
        <ProgressFill percentage={percentage} color={color} />
      </ProgressTrack>
      {(bottomLeft || bottomRight) && (
        <ProgressFooter>
          <Text>{bottomLeft}</Text>
          <Text>{bottomRight}</Text>
        </ProgressFooter>
      )}
    </ProgressBarContainer>
  );
}

export default ProgressBar;
