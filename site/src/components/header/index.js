import { useWindowSize } from "@osn/common";
import { MOBILE_SIZE } from "@osn/constants";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import styled, { css } from "styled-components";
import ExploreInputOrigin from "../../components/home/explore/input";
import {
  closeMobileMenu,
  mobileMenuFoldedSelector,
  toggle,
} from "../../store/reducers/mobileMenuSlice";
import { mobilecss } from "../../styles/responsive";
import { Inter_18_700 } from "../../styles/text";
import {
  getChainLogo,
  getChainModules,
  getFilteredMenus,
  hasBusiness,
} from "../../utils/chain";
import {
  menusAssetsAndUniques,
  menusBlockchain,
  menusBlockchainSimpleMode,
} from "../../utils/constants";
import getBusinessMenus from "../../utils/consts/menu";
import { getIsSimpleMode } from "../../utils/env";
import { useScrollLock } from "../../utils/hooks/useScrollLock";
import VolaNameLogo from "../icons/VolaNameLogo copy";
import SearchIcon from "../icons/searchIcon";
import NodeSwitch from "../nodeSwitch";
import { Flex, FlexBetween } from "../styled/flex";
import LinkOrigin from "../styled/link";
import { Mobile, PC } from "../styled/responsive";
import ChainSwitch from "./chainSwitch";
import MobileButton from "./mobile/button";
import MobileNodeSwitch from "./mobileNodeSwitch";
import Navi from "./navi";
import { HeaderMenuItem } from "./styled";
import SubMenu from "./subMenu";

const headerHeight = 68;

const StyleLogo = styled(getChainLogo())`
  path {
    fill: ${(props) => props.theme.fontPrimary};
  }
`;

const Link = styled(LinkOrigin)`
  display: block;
`;

const LogoLink = styled(LinkOrigin)`
  line-height: 0;
`;

const Wrapper = styled(FlexBetween)`
  height: ${headerHeight}px;
`;

const MenuWrapper = styled(Flex)`
  margin-left: 64px;
`;

const MenuItem = styled(HeaderMenuItem)`
  color: ${(p) => p.theme.fontSecondary};
`;

const MobileMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 24px;
  background-color: ${(p) => p.theme.fillPanel};

  ${mobilecss(css`
    padding: 0 16px;
  `)}

  box-sizing: border-box;
  position: fixed !important;
  top: ${headerHeight}px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: scroll;
  z-index: 2;
  gap: 16px;
`;

const ExploreInputWrapper = styled.div`
  position: relative;
  display: flex;
`;
const ExploreInputPCWrapper = styled(ExploreInputWrapper)`
  margin-right: 16px;
  width: ${(p) => (p.$expanded ? "240px" : "40px")};
  transition: width 0.3s ease-in-out;
  overflow: hidden;

  .explore-dropdown {
    right: 0;
    width: 100%;
    top: 44px;
  }

  ${mobilecss(css`
    display: none;
  `)}
`;

const SearchIconButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(p) => p.theme.fillPanel};
  border: 1px solid ${(p) => p.theme.defaultOutline};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
  flex-shrink: 0;

  &:hover {
    background: ${(p) => p.theme.fillPanelHover};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;
const ExploreInputMobileWrapper = styled(ExploreInputWrapper)`
  & .explore-dropdown {
    width: auto;
    top: 44px;
  }
`;
const ExploreInput = styled(ExploreInputOrigin)`
  display: inline-flex;
  flex: 1;
`;
const Title = styled.h2`
  ${Inter_18_700};
  margin: 0px;
  color: ${(props) => props.theme.fontPrimary};
`;

export default function Header() {
  const showMobileMenu = !useSelector(mobileMenuFoldedSelector);
  const dispatch = useDispatch();
  const location = useLocation();
  const shouldShowPCExplore = true;
  const { assets, uniques } = getChainModules();
  const isSimpleMode = getIsSimpleMode();

  const [searchExpanded, setSearchExpanded] = useState(false);
  const searchRef = useRef(null);

  const { width } = useWindowSize();

  useEffect(() => {
    if (width > MOBILE_SIZE) {
      dispatch(closeMobileMenu());
    }
  }, [dispatch, width]);

  const [, setIsLock] = useScrollLock();
  useEffect(() => setIsLock(showMobileMenu), [showMobileMenu, setIsLock]);

  // Handle click outside to close search
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchExpanded(false);
      }
    }

    if (searchExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [searchExpanded]);

  return (
    <Wrapper>
      <FlexBetween style={{ flex: 1 }}>
        <LogoLink
          to={"/"}
          onClick={() => {
            dispatch(closeMobileMenu());
          }}
          style={{ display: "flex", alignItems: "center", gap: "16px" }}
        >
          <VolaNameLogo
            style={{
              width: "fit-content",
              height: "32px",
              marginBottom: "10px",
            }}
          />
          <Title style={{ display: "inline", fontSize: "1em" }}>Explorer</Title>
        </LogoLink>

        <PC>
          <FlexBetween style={{ flex: 1 }}>
            <MenuWrapper>
              <Link to={"/"}>
                <MenuItem>Home</MenuItem>
              </Link>
              <SubMenu
                category="BlockChain"
                menus={
                  isSimpleMode
                    ? getFilteredMenus(menusBlockchainSimpleMode)
                    : menusBlockchain
                }
              />
              {assets && uniques ? (
                <SubMenu category="Assets" menus={menusAssetsAndUniques} />
              ) : null}
              {hasBusiness() && (
                <SubMenu category="Business" menus={getBusinessMenus()} />
              )}
            </MenuWrapper>

            <Flex gap={8}>
              {/* <Explore /> */}
              {shouldShowPCExplore && (
                <ExploreInputPCWrapper
                  $expanded={searchExpanded}
                  ref={searchRef}
                >
                  {!searchExpanded ? (
                    <SearchIconButton
                      onClick={() => setSearchExpanded(true)}
                      aria-label="Open search"
                    >
                      <SearchIcon />
                    </SearchIconButton>
                  ) : (
                    <ExploreInput small autoFocus />
                  )}
                </ExploreInputPCWrapper>
              )}
              <Flex gap={8}>
                <ChainSwitch />
                <NodeSwitch />
              </Flex>
            </Flex>
          </FlexBetween>
        </PC>

        <Mobile>
          <MobileButton
            onClick={() => {
              dispatch(toggle());
            }}
            mobileMenuFolded={!showMobileMenu}
          />
          {showMobileMenu && (
            <MobileMenuWrapper>
              <ExploreInputMobileWrapper>
                <ExploreInput />
              </ExploreInputMobileWrapper>

              <ChainSwitch />
              <MobileNodeSwitch />
              <Navi />
            </MobileMenuWrapper>
          )}
        </Mobile>
      </FlexBetween>
    </Wrapper>
  );
}
