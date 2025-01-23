import React from "react";
import { SectionsWrapper } from "../styled";
import Blocks from "./blocks";
// import Transfers from "./transfers";
import Events from "./events";

export default function BlockAndTransfers() {
  return (
    <SectionsWrapper>
      <Blocks />
      {/* <Transfers /> */}
      <Events />
    </SectionsWrapper>
  );
}
