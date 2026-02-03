import styled from "styled-components";
import { FlexBetween } from "../../styled/flex";

export const ChartWrapper = styled.div`
  height: 300px;
  padding: 16px;
  flex: 1;
`;

export const NoData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: ${(p) => p.theme.fontSecondary};
`;

export const Header = styled(FlexBetween)`
  padding: 14px 16px;
  border-bottom: 1px solid ${(p) => p.theme.strokeBase};
`;

export const TabsList = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0px;
  background-color: ${(p) => p.theme.surfaceContainerHigh};
  padding: 4px;
  border-radius: 12px;
`;

export const TabButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: transparent;
  color: ${(p) => p.theme.fontTertiary};
  text-transform: uppercase;

  &:hover {
    background-color: ${(p) => p.theme.secondaryContainer};
    color: ${(p) => p.theme.fontSecondary};
  }

  &:focus-visible {
    outline: 2px solid ${(p) => p.theme.theme500};
    outline-offset: 2px;
  }

  ${(p) =>
    p.active &&
    `
    background-color: ${p.theme.secondaryContainerHover || "#ffffff"};
    color: ${p.theme.fontPrimary};
    
    &:hover {
      background-color: ${p.theme.secondaryContainerHover || "#ffffff"};
      color: ${p.theme.fontPrimary};
    }
  `}
`;
