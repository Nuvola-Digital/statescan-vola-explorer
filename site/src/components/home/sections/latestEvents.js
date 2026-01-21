import styled from "styled-components";
import { Inter_12_500, Inter_14_600, Inter_18_500 } from "../../../styles/text";
import { timeDuration } from "../../../utils/viewFuncs/time";
import TransfersIcon from "../../icons/transfersIcon";
import { Flex } from "../../styled/flex";
import Link from "../../styled/link";
import { TagHighContrast } from "../../tag";
import LatestList from "./latestList";

const ThemeText = styled.p`
  margin: 0;
  color: ${(p) => p.theme.theme500};
  ${Inter_14_600};
`;

const BlockHeight = styled(ThemeText)`
  margin-bottom: 4px;
  ${Inter_18_500}
`;

const Value = styled.div`
  margin-bottom: 4px;
  ${Inter_14_600};
  text-align: right;
  color: ${(props) => props.theme.fontPrimary};
`;

const Time = styled.span`
  color: ${(props) => props.theme.fontTertiary};
  ${Inter_12_500};
`;

// const TransferAddressWrapper = styled.div`
//   ${flex};
//   ${items_center};
//   ${justify_end};
//   ${gap_x(8)};
//   ${max_w_full};

//   a,
//   a span {
//     ${Overpass_Mono_12_500};
//   }
// `;

// const Tooltip = styled(TooltipOrigin)`
//   ${(p) => p.truncate && truncate};
// `;

function LatestEvents({ events, loading }) {
  const listItems = events?.slice(0, 5)?.map((event) => {
    return {
      icon: <TransfersIcon />,
      left: (
        <div>
          <Link
            to={`/events/${event?.indexer?.blockHeight}-${event?.indexer?.eventIndex}`}
          >
            <BlockHeight>
              {event?.indexer?.blockHeight?.toLocaleString()}-
              {event?.indexer?.eventIndex}
            </BlockHeight>
          </Link>
          <Flex gap={8}>
            {/* {event.isFinalized ? <CheckIcon /> : <TimerIcon />} */}
            <Time> {timeDuration(event?.indexer?.blockTime)} </Time>
          </Flex>
        </div>
      ),
      right: (
        <Flex style={{ flexDirection: "column", alignItems: "end" }}>
          <Value>{event?.method}</Value>
          <TagHighContrast>{event?.section}</TagHighContrast>
        </Flex>
      ),
    };
  });

  return (
    <LatestList items={listItems} loading={loading} noDataText="No transfers" />
  );
}

export default LatestEvents;
