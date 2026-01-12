import styled, { css } from "styled-components";
import { mobilecss } from "../../../styles/responsive";
import { flex } from "../../../styles/tailwindcss";

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
    background-color: ${(p) =>
      p.theme.secondaryContainer || "rgba(0, 0, 0, 0.04)"};
    color: ${(p) => p.theme.fontSecondary};
  }

  &:focus-visible {
    outline: 2px solid ${(p) => p.theme.theme500};
    outline-offset: 2px;
  }

  ${(p) =>
    p.active &&
    `
    background-color: ${p.theme.secondaryContainer || "#ffffff"};
    color: ${p.theme.fontPrimary};
    
    &:hover {
      background-color: ${p.theme.secondaryContainer || "#ffffff"};
      color: ${p.theme.fontPrimary};
    }
  `}
`;

export const TabContent = styled.div`
  display: ${(p) => (p.active ? "block" : "none")};

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
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
  font-size: ${(size) => size || "12px"};
  line-height: 16px;
`;

export const TabContentCard = styled.div``;
