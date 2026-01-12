import styled from "styled-components";
import { flex } from "../../../styles/tailwindcss";
import { Label } from "./styled";
const ItemWrapper = styled.div`
  background-color: ${(p) => p.theme.surfaceContainerHigh};
  border: 1px solid ${(p) => p.theme.defaultOutline};
  padding: 20px;
  gap: 8px;
  border-radius: 10px;
  ${flex};
  flex-direction: column;
  align-items: flex-start;
`;

const IconWrapper = styled.div`
  padding: 8px;
  border-radius: 8px;
  width: fit-content;
  height: fit-content;
  background-color: ${(p) => p.theme.fillSecondary};
  &:hover {
    background-color: ${(p) => p.theme.fillSecondaryHover};
  }
  & svg {
    display: block;
    height: 24px;
    width: 24px;
  }
`;
const ContentWrapper = styled.div`
  ${flex};
  gap: 12px;
`;

const Value = styled.div`
  color: ${(p) => p.theme.fontPrimary};
  font-size: 18px;
  font-weight: 700;
  line-height: 28px;
`;
const Description = styled.div`
  color: ${(p) => p.theme.fontTertiary};
  font-size: 12px;
`;
export default function TabItem({ label, value, icon, description, bottom }) {
  return (
    <ItemWrapper>
      <ContentWrapper>
        <IconWrapper>{icon}</IconWrapper>
        <div>
          <Label size="14px" muted={true}>
            {label}
          </Label>
          <Value>{value}</Value>
        </div>
      </ContentWrapper>
      <Description>{description}</Description>
      {bottom && bottom}
    </ItemWrapper>
  );
}
