import styled, { css } from "styled-components";
import { mdcss, mobilecss } from "../../../styles/responsive";
import { flex, flex_col, justify_between } from "../../../styles/tailwindcss";
import { Flex } from "../../styled/flex";

export const TabWrapper = styled.div`
  background: ${(p) => p.theme.fillPanel};
  padding: 20px;
  border: 1px solid ${(p) => p.theme.defaultOutline};
  border-radius: 12px;
  ${Flex};
  ${flex_col};
  ${justify_between};

  .loading {
    padding: 0;
    height: calc(100% - 60px);
  }

  ${mdcss(css`
    max-width: 100%;
  `)}
`;

export const TabItemWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  ${mobilecss(css`
    grid-template-columns: 1fr;
  `)}
`;

export const TabsContainer = styled.div`
  width: 100%;
`;

export const TabsList = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  background-color: ${(p) => p.theme.surfaceContainerHigh};
  border: 1px solid ${(p) => p.theme.defaultOutline};
  padding: 8px;
  border-radius: 16px;
  margin-bottom: 20px;
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
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: transparent;
  color: ${(p) => p.theme.fontTertiary};
  position: relative;

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

export const TabContentWrapper = styled.div`
  position: relative;
  overflow: hidden;
  transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const TabContent = styled.div`
  ${(p) =>
    p.active
      ? css`
          position: relative;
          opacity: 1;
        `
      : css`
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          opacity: 0;
          pointer-events: none;
        `}
`;

export const TabPanel = styled.div`
  background-color: ${(p) => p.theme.fillPanel};
  border-radius: 12px;
  padding: 24px;
  min-height: 400px;
`;

export const FullSizedItemWrapper = styled.div`
  grid-column: span 2;
  background-color: ${(p) => p.theme.surfaceContainerHigh};
  border: 1px solid ${(p) => p.theme.defaultOutline};
  padding: 20px;
  ${flex};
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  border-radius: 10px;
  ${mobilecss(css`
    grid-column: span 1;
  `)}
`;

export const Label = styled.div`
  color: ${(p) => (p.muted ? p.theme.fontTertiary : p.theme.fontPrimary)};
  font-size: ${(p) => (p.size ? p.size + "px" : "12px")};
  line-height: ${(p) => (p.size ? Math.round(p.size * 1.4) + "px" : "16px")};
`;

export const TabContentCard = styled.div``;
