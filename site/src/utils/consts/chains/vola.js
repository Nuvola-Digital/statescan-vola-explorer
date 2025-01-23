import VolaLogo from "../../../components/icons/VolaLogo";

const nodes = [
  {
    name: "Node00",
    url: "wss://rpc-private.volanetwork.io/",
  },
];

const vola = {
  name: "Vola",
  icon: <VolaLogo width={20} height={20} />,
  // identity: "vola",
  value: "vola",
  symbol: "VOLA",
  decimals: 12,
  color: "rgba(8, 145, 178, 1)",
  colorSecondary: "rgba(6, 182, 212, 1)",
  // modules: {
  //   identity: true,
  //   multisig: false,
  // },
  nodes,
  useOnChainBlockData: true,
};

export default vola;
