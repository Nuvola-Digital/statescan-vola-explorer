import styled from "styled-components";
import { motion } from "framer-motion";
import { flex } from "../../../styles/tailwindcss";
import { Label } from "./styled";

const ItemWrapper = styled(motion.div)`
  background-color: ${(p) => p.theme.surfaceContainerHigh};
  border: 1px solid ${(p) => p.theme.defaultOutline};
  padding: 20px;
  gap: 8px;
  border-radius: 10px;
  ${flex};
  flex-direction: column;
  align-items: flex-start;
`;

const IconWrapper = styled(motion.div)`
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
const Description = styled(motion.div)`
  color: ${(p) => p.theme.fontTertiary};
  font-size: 12px;
`;
export default function TabItem({
  label,
  value,
  icon,
  description,
  bottom,
  layoutId,
}) {
  return (
    <ItemWrapper
      layout
      layoutId={layoutId}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <ContentWrapper>
        <IconWrapper
          layout
          layoutId={layoutId ? `icon-container-${layoutId}` : undefined}
        >
          <motion.div
            key={layoutId ? `icon-${layoutId}` : undefined}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {icon}
          </motion.div>
        </IconWrapper>
        <div>
          <motion.div
            key={layoutId ? `label-${layoutId}` : undefined}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <Label size="14px" muted={true}>
              {label}
            </Label>
          </motion.div>
          <motion.div
            key={layoutId ? `value-${layoutId}` : undefined}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Value>{value}</Value>
          </motion.div>
        </div>
      </ContentWrapper>
      <Description
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.25 }}
        key={layoutId ? `value-${layoutId}` : undefined}
      >
        {description}
      </Description>
      {bottom && (
        <motion.div
          key={`progress-${layoutId}`}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          style={{
            width: "100%",
          }}
        >
          {bottom}
        </motion.div>
      )}
    </ItemWrapper>
  );
}
