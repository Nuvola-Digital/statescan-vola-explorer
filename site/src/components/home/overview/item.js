import styled from "styled-components";
import { gap_y, p } from "../../../styles/tailwindcss";
import { Inter_12_500, Inter_20_500 } from "../../../styles/text";
import CircledInfoIcon from "../../icons/circledInfoIcon";
import ThemedLink from "../../styled/link";
import TooltipOrigin from "../../tooltip";

const Tooltip = styled(TooltipOrigin)`
  display: inline-flex;
  margin-left: 4px;
`;

const IconWrapper = styled.div`
  padding: 8px;
  border-radius: 8px;
  width: fit-content;
  height: fit-content;
  background-color: ${(p) => p.theme.secondaryContainer};
  &:hover {
    background-color: ${(p) => p.theme.secondaryContainerHover};
  }
  & svg {
    display: block;
    height: 24px;
    width: 24px;
  }
`;

const ContentLabel = styled.div`
  color: ${(p) => p.theme.fontTertiary};
  margin: 0;
  font-size: 16px;
  ${Inter_12_500};
  display: inline-flex;
`;
const ContentValue = styled.div`
  color: ${(p) => p.theme.fontPrimary};
  ${Inter_20_500};
  font-size: 20px;
`;
const ContentValueTotal = styled.span`
  color: ${(p) => p.theme.fontTertiary};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Link = styled(ThemedLink)`
  &:hover {
    ${ContentValueTotal} {
      color: ${(p) => p.theme.theme500};
    }
  }
`;

const Wrapper = styled.div`
  ${p(16)};
  ${gap_y(40)};
  background: ${(p) => p.theme.fillPanel};
  border: 1px solid ${(p) => p.theme.defaultOutline};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-w-width: 136px;
`;

export default function OverviewItem({ icon, label, value, total, to, tip }) {
  const resolveContentValue = (
    <>
      {value}
      {total && <ContentValueTotal> / {total}</ContentValueTotal>}
    </>
  );

  return (
    <Wrapper>
      <IconWrapper>{icon}</IconWrapper>

      <ContentWrapper>
        <ContentValue>
          {to ? (
            <Link to={to}>{resolveContentValue}</Link>
          ) : (
            resolveContentValue
          )}
        </ContentValue>
        <ContentLabel>
          {label}
          {tip && (
            <Tooltip tip={tip}>
              <CircledInfoIcon />
            </Tooltip>
          )}
        </ContentLabel>
      </ContentWrapper>
    </Wrapper>
  );
}
