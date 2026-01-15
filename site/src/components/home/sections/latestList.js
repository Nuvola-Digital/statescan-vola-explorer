import styled from "styled-components";
import { withLoading } from "../../../HOC/withLoading";
import {
  flex,
  flex_1,
  gap_x,
  items_center,
  justify_between,
  justify_center,
  m,
  max_w_half,
  p,
  w_full,
} from "../../../styles/tailwindcss";
import NoData from "../../noData";

const List = styled.ul`
  ${m(0)};
  ${p(0)};
`;

const ListItemLeft = styled.div`
  ${flex};
  ${flex_1};
  ${max_w_half};
  ${gap_x(16)};
`;
const ListItemRight = styled.div`
  ${flex_1};
  ${max_w_half};
`;
const ListItemIcon = styled.div`
  padding: 8px;
  border-radius: 8px;
  height: 40px;
  width: 40px;
  ${flex};
  ${items_center};
  ${justify_center};
  background-color: ${(p) => p.theme.containerSecondary};
  &:hover {
    background-color: ${(p) => p.theme.containerSecondaryHover};
  }
  & svg {
    display: block;
    height: 24px;
    width: 24px;
  }
`;

const ListItem = styled.li`
  ${p(20)};
  ${w_full};
  ${flex};
  ${items_center};
  ${justify_between};
  box-sizing: border-box;
`;

function mapLoadingState(props) {
  const { loading } = props ?? {};
  return {
    loadingStates: loading,
  };
}

function LatestList({ items = [], loading = false, noDataText = "No Data" }) {
  if (!items.length && !loading) {
    return <NoData text={noDataText} />;
  }

  return (
    <div>
      <List>
        {items.map((item, idx) => (
          <ListItem key={idx}>
            <ListItemLeft>
              <ListItemIcon>{item.icon}</ListItemIcon>
              {item.left}
            </ListItemLeft>
            <ListItemRight>{item.right}</ListItemRight>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default withLoading(mapLoadingState)(LatestList);
