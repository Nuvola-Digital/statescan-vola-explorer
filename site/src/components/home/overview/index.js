import { toPrecision } from "@osn/common";
import { useSelector } from "react-redux";
import { withLoading } from "../../../HOC/withLoading";
import useOverview from "../../../hooks/overview/useOverview";
import { chainSettingSelector } from "../../../store/reducers/settingSlice";
import { currencify } from "../../../utils";
import ValueDisplay from "../../displayValue";
import AssetSquareIcon from "../../icons/assetSquareIcon";
import BlockSquareIcon from "../../icons/blockSquareIcon";
import ExtrinsicsSquareIcon from "../../icons/extrinsicsSquareIcon";
import FinalizedBlockSquareIcon from "../../icons/finalizedBlockSquareIcon";
import NftSquareIcon from "../../icons/nftSquareIcon";
import ParaIdSquareIcon from "../../icons/paraIdSquareIcon";
import TransferSquareIcon from "../../icons/transferSquareIcon";
import WalletIcon from "../../icons/WalletIcon";
import Loading from "../../loadings/loading";
import { StyledPanelTableWrapper } from "../../styled/panel";
import Tooltip from "../../tooltip";
import { Title } from "../sections/styled";
import OverviewItem from "./item";
import { OverviewItemsWrapper, OverviewPanel } from "./styled";

const mapLoadingState = (_props) => {
  return {
    loadingStates: [],
    loadingComponent: <Loading />,
  };
};

function Overview() {
  const { overview } = useOverview();
  const chainSetting = useSelector(chainSettingSelector);
  const { modules = {} } = chainSetting;

  function issuancePrecision(issuance) {
    return toPrecision(issuance ?? 0, chainSetting.decimals);
  }
  return (
    <StyledPanelTableWrapper className="pp">
      <Title>Block Overview</Title>
      <OverviewPanel>
        <OverviewItemsWrapper>
          <OverviewItem
            icon={<BlockSquareIcon />}
            label="Latest Blocks"
            value={currencify(overview.latestHeight)}
          />
          <OverviewItem
            icon={<FinalizedBlockSquareIcon />}
            label="Finalized Block"
            value={currencify(overview.finalizedHeight)}
          />
          <OverviewItem
            icon={<ExtrinsicsSquareIcon />}
            label="Signed Extrinsics"
            value={currencify(overview.signedExtrinsics)}
          />
          <OverviewItem
            icon={<TransferSquareIcon />}
            label="Transfers"
            value={currencify(overview.transfers)}
          />
          <OverviewItem
            icon={<AssetSquareIcon />}
            label={`Total Issuance (${chainSetting.symbol})`}
            value={
              <Tooltip
                tip={currencify(
                  Number(issuancePrecision(overview.totalIssuance)),
                )}
              >
                <ValueDisplay
                  value={issuancePrecision(overview.totalIssuance)}
                />
              </Tooltip>
            }
          />

          {chainSetting.para && (
            <OverviewItem
              icon={<ParaIdSquareIcon />}
              label={`${chainSetting.para.relay} Para ID`}
              value={currencify(chainSetting.para.id)}
            />
          )}

          <OverviewItem
            icon={<WalletIcon />}
            label="Wallets"
            value={currencify(overview.accounts)}
          />

          {modules?.assets && (
            <OverviewItem
              icon={<AssetSquareIcon />}
              label="Assets"
              value={currencify(overview.assets)}
            />
          )}

          {modules?.uniques && (
            <>
              <OverviewItem
                icon={<NftSquareIcon />}
                label="NFT Class"
                tip="Recognized / All"
                value={currencify(overview.nftClasses?.valid)}
                total={currencify(overview.nftClasses?.total)}
              />
              <OverviewItem
                icon={<NftSquareIcon />}
                label="NFT Instance"
                tip="Recognized / All"
                value={currencify(overview.nftInstances?.valid)}
                total={currencify(overview.nftInstances?.total)}
              />
            </>
          )}
        </OverviewItemsWrapper>
      </OverviewPanel>
    </StyledPanelTableWrapper>
  );
}

export default withLoading(mapLoadingState)(Overview);
