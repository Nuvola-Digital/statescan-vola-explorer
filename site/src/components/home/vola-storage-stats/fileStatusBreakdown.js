import styled from "styled-components";
import { FullSizedItemWrapper, Label } from "./styled";
import { flex } from "../../../styles/tailwindcss";
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  height: fit-content;
`;
const StatusItem = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StatusWrapper = styled.div`
  ${flex};
  align-items: center;
  gap: 8px;
`;
const StatusIcon = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(p) => p.color};
`;
const StatusLabel = styled.p`
  color: ${(p) => p.theme.fontTertiary};
  font-size: 12px;
  margin: 0px;
`;
const StatusValue = styled.p`
  color: ${(p) => p.theme.fontPrimary};
  font-size: 14px;
  margin: 0px;
`;
function FileStatusBreakdown({ committed, uncommitted, expired }) {
  return (
    <FullSizedItemWrapper>
      <Label size="14px">File Status Breakdown</Label>
      <ContentWrapper>
        <StatusItem>
          <StatusWrapper>
            <StatusIcon color="#00C950" />
            <StatusLabel>Committed</StatusLabel>
          </StatusWrapper>
          <StatusValue>{committed}</StatusValue>
        </StatusItem>
        <StatusItem>
          <StatusWrapper>
            <StatusIcon color="#F0B100" />
            <StatusLabel>Uncommitted</StatusLabel>
          </StatusWrapper>
          <StatusValue>{uncommitted}</StatusValue>
        </StatusItem>
        <StatusItem>
          <StatusWrapper>
            <StatusIcon color="#FB2C36" />
            <StatusLabel>Expired</StatusLabel>
          </StatusWrapper>
          <StatusValue>{expired}</StatusValue>
        </StatusItem>
      </ContentWrapper>
    </FullSizedItemWrapper>
  );
}

export default FileStatusBreakdown;
