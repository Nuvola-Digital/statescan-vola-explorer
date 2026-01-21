import { toPrecision } from "@osn/common";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useOverview from "../../../hooks/overview/useOverview";
import useVolaStats from "../../../hooks/overview/useVolaStats";
import { chainSettingSelector } from "../../../store/reducers/settingSlice";
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
  DesktopLabel,
  FullSizedItemWrapper,
  Label,
  MobileLabel,
  TabButton,
  TabContentWrapper,
  TabItemWrapper,
  TabsContainer,
  TabsList,
  TabWrapper,
} from "./styled";
import TabItem from "./tabItem";
import { useTheme } from "styled-components";

function VolaStorageStats() {
  const [activeTab, setActiveTab] = useState("overview");
  const [contentHeight, setContentHeight] = useState("auto");
  const { volaStats } = useVolaStats();
  const { overview } = useOverview();
  const theme = useTheme();
  const contentWrapperRef = useRef(null);
  const tabContentRefs = useRef({});
  const chainSetting = useSelector(chainSettingSelector);

  function issuancePrecision(issuance) {
    return toPrecision(issuance ?? 0, chainSetting.decimals);
  }
  const tabs = [
    { id: "overview", label: "Overview", mbLabel: "Overview" },
    { id: "nodes", label: "Nodes & Operations", mbLabel: "Nodes" },
    { id: "files", label: "Files & Revenue", mbLabel: "Files" },
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
  const currentEpochEarnedVola = Number(
    issuancePrecision(overview?.currentEpochRevenue || 1),
  ).toFixed(4);
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
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="active-tab-bg"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 0,
                      backgroundColor: theme.secondaryContainerHover,
                      borderRadius: "8px",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <DesktopLabel>{tab.label}</DesktopLabel>
                <MobileLabel>{tab.mbLabel}</MobileLabel>
              </TabButton>
            ))}
          </TabsList>
          <LayoutGroup>
            <TabContentWrapper
              ref={contentWrapperRef}
              style={{ height: contentHeight }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    ref={(el) => {
                      tabContentRefs.current["overview"] = el;
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    style={{
                      width: "100%",
                      paddingBottom: "1px",
                      height: "fit-content",
                    }}
                  >
                    <TabItemWrapper>
                      <TabItem
                        layoutId={"card-1"}
                        label="Active Storage Nodes"
                        value={volaStats?.nodes?.active ?? "---"}
                        icon={<StorageIcon />}
                        description="Total active storage nodes on the network."
                      />
                      <TabItem
                        layoutId={"card-2"}
                        label="Active Storage"
                        value={
                          humanReadableStorage(
                            volaStats?.nodes?.activeStorage,
                          ) ?? "---"
                        }
                        icon={<DbStorageIcon />}
                        description="Total active storage capacity on the network."
                      />
                      <TabItem
                        layoutId={"card-3"}
                        label="Used Storage"
                        value={
                          humanReadableStorage(volaStats?.files?.usedStorage) ??
                          "---"
                        }
                        icon={<StoragePieIcon />}
                        description="Total capacity utilized on the network."
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
                        layoutId={"card-4"}
                        label="Storage Fee Revenue"
                        value={`${currentEpochEarnedVola} ${chainSetting.symbol} ($ ${currentEpochEarnedVola})`}
                        icon={<AccountIcon />}
                        description={`Total revenue generated from storage utilization.`}
                      />
                    </TabItemWrapper>
                  </motion.div>
                )}
                {activeTab === "nodes" && (
                  <motion.div
                    key="nodes"
                    ref={(el) => {
                      tabContentRefs.current["nodes"] = el;
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    style={{
                      width: "100%",
                    }}
                  >
                    <TabItemWrapper>
                      <TabItem
                        layoutId={"card-1"}
                        label="Active Storage Nodes"
                        value={volaStats?.nodes?.active ?? "---"}
                        icon={<StorageIcon />}
                        description="Total active storage nodes on the network."
                      />
                      <TabItem
                        layoutId={"card-2"}
                        label={"Node Operators"}
                        value={volaStats?.nodes?.nodeOperators ?? "---"}
                        icon={<OperatorsIcon />}
                        description="Unique node operators count"
                      />
                      <FullSizedItemWrapper
                        layoutId={"card-3"}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                        layout
                      >
                        <motion.p
                          key="node-dist-label"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.15 }}
                          className="text-sm text-foreground"
                        >
                          <Label size="14px">Node Distribution</Label>
                        </motion.p>
                        <motion.div
                          key="progress-active"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                          style={{ width: "100%" }}
                        >
                          <ProgressBar
                            topLeft={"Active Nodes"}
                            topRight={volaStats?.nodes?.active}
                            percentage={ActiveNodesPercentage}
                            color={"#FAFAFA"}
                          />
                        </motion.div>

                        <motion.div
                          key="progress-draining"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                          style={{ width: "100%" }}
                        >
                          <ProgressBar
                            topLeft={"Draining Nodes"}
                            topRight={volaStats?.nodes?.draining}
                            percentage={DrainingNodesPercentage}
                            color={"#FAFAFA"}
                          />
                        </motion.div>
                      </FullSizedItemWrapper>
                    </TabItemWrapper>
                  </motion.div>
                )}
                {activeTab === "files" && (
                  <motion.div
                    key="files"
                    ref={(el) => {
                      tabContentRefs.current["files"] = el;
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    style={{
                      width: "100%",
                    }}
                  >
                    <TabItemWrapper>
                      <TabItem
                        layoutId={"card-1"}
                        label="Total Files (All Time)"
                        value={volaStats?.files?.total ?? "---"}
                        icon={<FileIcon />}
                        description="Total number of files including uncommitted, committed, and expired."
                      />
                      <TabItem
                        label="Active Files"
                        layoutId={"card-2"}
                        value={volaStats?.files?.active ?? "---"}
                        icon={<CheckCircleIcon />}
                        description="Total number of committed files."
                      />
                      <TabItem
                        label="Used Storage"
                        layoutId={"card-3"}
                        value={
                          humanReadableStorage(volaStats?.files?.usedStorage) ??
                          "---"
                        }
                        icon={<StoragePieIcon />}
                        description="Total capacity utilized on the network."
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
                        layoutId={"card-4"}
                        label="Storage Fee Revenue"
                        value={`${currentEpochEarnedVola} ${chainSetting.symbol} ($ ${currentEpochEarnedVola})`}
                        icon={<GraphIncrementIcon />}
                        description={`Total revenue generated from storage utilization. `}
                      />
                      <FullSizedItemWrapper
                        layout
                        layoutId="card-5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.3,
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      >
                        <FileStatusBreakdown
                          committed={`${currencify(
                            volaStats?.files?.active,
                          )}  (${
                            getFileStatusPercentage().committedPercentage
                          }%)`}
                          uncommitted={`${currencify(
                            volaStats?.files?.uncommitted,
                          )} (${
                            getFileStatusPercentage().uncommittedPercentage
                          }%)`}
                          expired={`${currencify(volaStats?.files?.expired)} (${
                            getFileStatusPercentage().expiredPercentage
                          }%)`}
                        />
                      </FullSizedItemWrapper>
                    </TabItemWrapper>
                  </motion.div>
                )}
              </AnimatePresence>
            </TabContentWrapper>
          </LayoutGroup>
        </TabsContainer>
      </TabWrapper>
    </StyledPanelTableWrapper>
  );
}
export default VolaStorageStats;
