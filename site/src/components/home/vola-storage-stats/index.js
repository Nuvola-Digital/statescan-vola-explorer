import { useState } from "react";
import styled, { css } from "styled-components";
import { mdcss, mobilecss } from "../../../styles/responsive";
import { flex_col, justify_between } from "../../../styles/tailwindcss";
import AccountIcon from "../../icons/accountIcon";
import DbStorageIcon from "../../icons/dbStorageIcon";
import OperatorsIcon from "../../icons/operatorsIcon";
import StorageIcon from "../../icons/storageIcon";
import StoragePieIcon from "../../icons/storagePieIcon";
import { Flex } from "../../styled/flex";
import { StyledPanelTableWrapper } from "../../styled/panel";
import { Title } from "../sections/styled";
import ProgressBar from "./progressBar";
import {
  FullSizedItemWrapper,
  Label,
  TabButton,
  TabContent,
  TabsContainer,
  TabsList,
} from "./styled";
import TabItem from "./tabItem";
import FileIcon from "../../icons/fileIcon";
import CheckCircleIcon from "../../icons/checkCircleIcon";
import GraphIncrementIcon from "../../icons/graphIncrementIcon";
import FileStatusBreakdown from "./fileStatusBreakdown";

function VolaStorageStats() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "nodes", label: "Nodes & Operation" },
    { id: "files", label: "Files & Revenue" },
  ];

  const TabWrapper = styled.div`
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
  const TabItemWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    ${mobilecss(css`
      grid-template-columns: 1fr;
    `)}
  `;
  return (
    <StyledPanelTableWrapper>
      <Title>Vola Storage Stats</Title>
      <TabWrapper>
        <TabsContainer>
          <TabsList>
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </TabButton>
            ))}
          </TabsList>

          <TabContent active={activeTab === "overview"}>
            <TabItemWrapper>
              <TabItem
                label="Active Storage Nodes"
                value="342"
                icon={<StorageIcon />}
                description="Total active storage nodes on the network."
              />
              <TabItem
                label="Active Storage"
                value="2.8 PB "
                icon={<DbStorageIcon />}
                description="Total active storage including Active and Draining states."
              />
              <TabItem
                label="Used Storage"
                value="2.1 PB"
                icon={<StoragePieIcon />}
                description="Total file size representing storage utilization"
                bottom={
                  <ProgressBar
                    bottomLeft={"Utilization"}
                    bottomRight={"75%"}
                    percentage={75}
                    color={"#FAFAFA"}
                  />
                }
              />
              <TabItem
                label="Storage Fee Revenues"
                value="1,245,678 VOLA"
                icon={<AccountIcon />}
                description="Total storage fee revenue for epoch #432"
              />
            </TabItemWrapper>
          </TabContent>

          <TabContent active={activeTab === "nodes"}>
            <TabItemWrapper>
              <TabItem
                label="Active Storage Nodes"
                value="342"
                icon={<StorageIcon />}
                description="Total active storage nodes on the network."
              />
              <TabItem
                label="Node Operators"
                value="2.8 PB "
                icon={<OperatorsIcon />}
                description="Unique node operators count"
              />
              <FullSizedItemWrapper>
                <Label size="14px">Node Distribution</Label>
                <ProgressBar
                  topLeft={"Utilization"}
                  topRight={"75%"}
                  percentage={75}
                  color={"#FAFAFA"}
                />
                <ProgressBar
                  topLeft={"Utilization"}
                  topRight={"75%"}
                  percentage={75}
                  color={"#FAFAFA"}
                />
              </FullSizedItemWrapper>
            </TabItemWrapper>
          </TabContent>

          <TabContent active={activeTab === "files"}>
            <TabItemWrapper>
              <TabItem
                label="Total Files (All Time)"
                value="12,456,789"
                icon={<FileIcon />}
                description="Total number of files including uncommitted, committed, and expired."
              />
              <TabItem
                label="Active Files"
                value="9,234,567"
                icon={<CheckCircleIcon />}
                description="Committed file count only"
              />
              <TabItem
                label="Used Storage"
                value="2.1 PB"
                icon={<StoragePieIcon />}
                description="Total file size representing storage utilization"
                bottom={
                  <ProgressBar
                    bottomLeft={"Utilization"}
                    bottomRight={"75%"}
                    percentage={75}
                    color={"#FAFAFA"}
                  />
                }
              />
              <TabItem
                label="Storage Fee Revenues"
                value="1,245,678 VOLA"
                icon={<GraphIncrementIcon />}
                description="Total storage fee revenue for epoch #432"
              />
              <FileStatusBreakdown
                committed={"9.2M"}
                uncommitted={"2.1M"}
                expired={"1.1M"}
              />
            </TabItemWrapper>
          </TabContent>
        </TabsContainer>
      </TabWrapper>
    </StyledPanelTableWrapper>
  );
}
export default VolaStorageStats;
