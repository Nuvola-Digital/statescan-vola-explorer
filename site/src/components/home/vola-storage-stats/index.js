import { useState, useRef, useEffect, useCallback } from "react";
import useVolaStats from "../../../hooks/overview/useVolaStats";
import { currencify } from "../../../utils";
import { humanReadableStorage } from "../../../utils/humanReadableStorage";
import AccountIcon from "../../icons/accountIcon";
import CheckCircleIcon from "../../icons/checkCircleIcon";
import DbStorageIcon from "../../icons/dbStorageIcon";
import FileIcon from "../../icons/fileIcon";
import GraphIncrementIcon from "../../icons/graphIncrementIcon";
import OperatorsIcon from "../../icons/operatorsIcon";
import StorageIcon from "../../icons/storageIcon";
import StoragePieIcon from "../../icons/storagePieIcon";
import { StyledPanelTableWrapper } from "../../styled/panel";
import { Title } from "../sections/styled";
import FileStatusBreakdown from "./fileStatusBreakdown";
import ProgressBar from "./progressBar";
import {
  FullSizedItemWrapper,
  Label,
  TabButton,
  TabContent,
  TabContentWrapper,
  TabItemWrapper,
  TabsContainer,
  TabsList,
  TabWrapper,
} from "./styled";
import TabItem from "./tabItem";

function VolaStorageStats() {
  const [activeTab, setActiveTab] = useState("overview");
  const [contentHeight, setContentHeight] = useState("auto");
  const { volaStats } = useVolaStats();
  const contentWrapperRef = useRef(null);
  const tabContentRefs = useRef({});

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "nodes", label: "Nodes & Operation" },
    { id: "files", label: "Files & Revenue" },
  ];

  // Update height when active tab changes
  const updateHeight = useCallback(() => {
    const activeContent = tabContentRefs.current[activeTab];
    if (activeContent) {
      const height = activeContent.scrollHeight;
      setContentHeight(height);
    }
  }, [activeTab]);

  useEffect(() => {
    updateHeight();
    // Also update on window resize
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [activeTab, volaStats, updateHeight]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const getPercentage = (part, total) => {
    if (total === 0) return 0;
    return ((part / total) * 100).toFixed(2);
  };
  const storageUsedPercentage = getPercentage(
    volaStats?.files?.usedStorage,
    volaStats?.nodes?.activeStorage,
  );
  const totalNodes = volaStats?.nodes?.active + volaStats?.nodes?.draining || 0;
  const ActiveNodesPercentage = getPercentage(
    volaStats?.nodes?.active,
    totalNodes,
  );
  const DrainingNodesPercentage = getPercentage(
    volaStats?.nodes?.draining,
    totalNodes,
  );
  const getFileStatusPercentage = () => {
    const total =
      volaStats?.files?.active +
      volaStats?.files?.uncommitted +
      volaStats?.files?.expired;
    return {
      committedPercentage: getPercentage(volaStats?.files?.active, total),
      uncommittedPercentage: getPercentage(
        volaStats?.files?.uncommitted,
        total,
      ),
      expiredPercentage: getPercentage(volaStats?.files?.expired, total),
    };
  };
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
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
              </TabButton>
            ))}
          </TabsList>

          <TabContentWrapper
            ref={contentWrapperRef}
            style={{ height: contentHeight }}
          >
            <TabContent
              active={activeTab === "overview"}
              ref={(el) => (tabContentRefs.current["overview"] = el)}
            >
              <TabItemWrapper>
                <TabItem
                  label="Active Storage Nodes"
                  value={volaStats?.nodes?.active ?? "---"}
                  icon={<StorageIcon />}
                  description="Total active storage nodes on the network."
                />
                <TabItem
                  label="Active Storage"
                  value={
                    humanReadableStorage(volaStats?.nodes?.activeStorage) ??
                    "---"
                  }
                  icon={<DbStorageIcon />}
                  description="Total active storage including Active and Draining states."
                />
                <TabItem
                  label="Used Storage"
                  value={
                    humanReadableStorage(volaStats?.files?.usedStorage) ?? "---"
                  }
                  icon={<StoragePieIcon />}
                  description="Total file size representing storage utilization"
                  bottom={
                    <ProgressBar
                      bottomLeft={"Utilization"}
                      bottomRight={`${storageUsedPercentage}%`}
                      percentage={storageUsedPercentage}
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

            <TabContent
              active={activeTab === "nodes"}
              ref={(el) => (tabContentRefs.current["nodes"] = el)}
            >
              <TabItemWrapper>
                <TabItem
                  label="Active Storage Nodes"
                  value={volaStats?.nodes?.active ?? "---"}
                  icon={<StorageIcon />}
                  description="Total active storage nodes on the network."
                />
                <TabItem
                  label="Node Operators"
                  value={volaStats?.nodes?.nodeOperators ?? "---"}
                  icon={<OperatorsIcon />}
                  description="Unique node operators count"
                />
                <FullSizedItemWrapper>
                  <Label size="14px">Node Distribution</Label>
                  <ProgressBar
                    topLeft={"Active Nodes"}
                    topRight={volaStats?.nodes?.active}
                    percentage={ActiveNodesPercentage}
                    color={"#FAFAFA"}
                  />
                  <ProgressBar
                    topLeft={"Draining Nodes"}
                    topRight={volaStats?.nodes?.draining}
                    percentage={DrainingNodesPercentage}
                    color={"#FAFAFA"}
                  />
                </FullSizedItemWrapper>
              </TabItemWrapper>
            </TabContent>

            <TabContent
              active={activeTab === "files"}
              ref={(el) => (tabContentRefs.current["files"] = el)}
            >
              <TabItemWrapper>
                <TabItem
                  label="Total Files (All Time)"
                  value={volaStats?.files?.total ?? "---"}
                  icon={<FileIcon />}
                  description="Total number of files including uncommitted, committed, and expired."
                />
                <TabItem
                  label="Active Files"
                  value={volaStats?.files?.active ?? "---"}
                  icon={<CheckCircleIcon />}
                  description="Committed file count only"
                />
                <TabItem
                  label="Used Storage"
                  value={
                    humanReadableStorage(volaStats?.files?.usedStorage) ?? "---"
                  }
                  icon={<StoragePieIcon />}
                  description="Total file size representing storage utilization"
                  bottom={
                    <ProgressBar
                      bottomLeft={"Utilization"}
                      bottomRight={`${storageUsedPercentage}%`}
                      percentage={storageUsedPercentage}
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
                  committed={`${currencify(volaStats?.files?.active)}  (${
                    getFileStatusPercentage().committedPercentage
                  }%)`}
                  uncommitted={`${currencify(volaStats?.files?.uncommitted)} (${
                    getFileStatusPercentage().uncommittedPercentage
                  }%)`}
                  expired={`${currencify(volaStats?.files?.expired)} (${
                    getFileStatusPercentage().expiredPercentage
                  }%)`}
                />
              </TabItemWrapper>
            </TabContent>
          </TabContentWrapper>
        </TabsContainer>
      </TabWrapper>
    </StyledPanelTableWrapper>
  );
}
export default VolaStorageStats;
