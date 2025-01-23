import styled from "styled-components";
import { Flex, FlexCenter, FlexEnd } from "../../styled/flex";
import {
  Inter_12_500,
  Inter_14_600,
  Overpass_Mono_12_500,
} from "../../../styles/text";
import { timeDuration } from "../../../utils/viewFuncs/time";
import Link from "../../styled/link";
import { useSelector } from "react-redux";
import { chainSettingSelector } from "../../../store/reducers/settingSlice";
import TooltipOrigin from "../../tooltip";
import TransferSquareIcon from "../../icons/transferSquareIcon";
import TransferRightSquareIcon from "../../icons/transferRightSquareIcon";
import AddressOrIdentity from "../../address";
import React from "react";
import { PC } from "../../styled/responsive";
import { StatusNegativeTag, Tag, TagHighContrast, TagThemed } from "../../tag";
import {
  flex,
  gap_x,
  items_center,
  justify_end,
  max_w_full,
  truncate,
} from "../../../styles/tailwindcss";
import LatestList from "./latestList";

const ThemeText = styled.p`
  margin: 0;
  color: ${(p) => p.theme.theme500};
  ${Inter_14_600};
`;

const BlockHeight = styled(ThemeText)`
  margin-bottom: 4px;
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

const TransferAddressWrapper = styled.div`
  ${flex};
  ${items_center};
  ${justify_end};
  ${gap_x(8)};
  ${max_w_full};

  a,
  a span {
    ${Overpass_Mono_12_500};
  }
`;

const Tooltip = styled(TooltipOrigin)`
  ${(p) => p.truncate && truncate};
`;

function LatestEvents({ events, loading }) {
  const listItems = events?.slice(0, 5)?.map((event) => {
    return {
      icon: <TransferSquareIcon />,
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
