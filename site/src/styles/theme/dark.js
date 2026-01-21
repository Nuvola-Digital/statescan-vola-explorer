import { getChainSettings } from "../../utils/chain";
import light from "./light";

const chainSetting = getChainSettings();
const customTheme = chainSetting?.customTheme?.dark || {};

const dark = {
  ...light,
  fontPrimary: "#F8FAFC",
  fontPrimaryInverse: "#fff",
  fontTertiary: "rgba(255, 255, 255, 0.25)",
  fontQuaternary: "rgba(255, 255, 255, 0.1)",
  fontPositive: "rgba(82, 204, 138, 1)",
  fontPending: "rgba(255, 187, 55, 1)",
  fontNegative: "rgba(238, 68, 68, 1)",
  strokeBase: "#252B37",
  strokeBox: "#4B505A",
  strokeBoxSelected: "#81848C",
  fillPanel: "#222732",
  fillPopup: "#292D38",
  fillPopupHover: "#2D323C",
  fillSub: "#2D323D",
  fillBase: "#1B202C",
  fillSecondary: "#373C45",
  fillSecondaryHover: "#334155",
  fillButton: "#1B202C",
  fillTooltip: "rgba(0, 0, 0, 0.85)",
  fillPanelBlanket: "rgba(34, 39, 50, 0.8)",
  fillAlpha: "rgba(255, 255, 255, 0.05)",
  fillBeta: "rgba(255, 255, 255, 0.02)",
  fillGamma: "rgba(255, 255, 255, 0)",
  fillActiveBlue: "#3765dc",
  fillPositive: "#52CC8A",
  fillNegative: "#ee4444",
  fillPending: "#FFBB37",
  secondaryContainer: "#1E293B",
  secondaryContainerHover: "#334155",
  fontSecondary: "#94A3B8",
  surfaceContainerHigh: "#1A212B",
  tabOutline: "#374151",
  theme500: chainSetting?.color,
  theme100: chainSetting?.colorSecondary,
  fontButtonTag: "#fff",
  defaultOutline: "#4B5563",
  ...customTheme,
};

export default dark;
