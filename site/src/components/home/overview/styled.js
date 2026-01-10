import styled from "styled-components";
import { mdcss, mobilecss, smcss } from "../../../styles/responsive";
import { Flex } from "../../styled/flex";
import { block, gap_x, gap_y, grid_cols } from "../../../styles/tailwindcss";
import { Inter_20_500 } from "../../../styles/text";

export const OverviewPanel = styled(Flex)`
  justify-content: space-between;

  ${mobilecss(block)}
`;
export const OverviewHeader = styled.h2`
 color: ${(p) => p.theme.textPrimary};
 ${Inter_20_500};
`;

export const OverviewItemsWrapper = styled.div`
  flex: 1;
  display: grid;
  flex-wrap: wrap;
  ${gap_x(20)};
  ${gap_y(20)};
  ${grid_cols(6)};
  ${mdcss(grid_cols(3))};
  ${mobilecss(grid_cols(2))};
  ${smcss(grid_cols(2))}
`;
