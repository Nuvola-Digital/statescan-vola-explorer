import { Anchor, AnchorWrapper, Section, StyledPanel, Title } from "../styled";
import React from "react";
import LatestEvents from "../latestEvents";
import useLatestEvents from "../../../../hooks/overview/useLatestEvents";

export default function Events() {
  const { events, loading } = useLatestEvents();

  return (
    <Section>
      <Title>Events</Title>
      <StyledPanel>
        <LatestEvents events={events} loading={loading} />
        <AnchorWrapper>
          <Anchor disabled={!events?.length || loading} to={"/events"}>
            View All
          </Anchor>
        </AnchorWrapper>
      </StyledPanel>
    </Section>
  );
}
