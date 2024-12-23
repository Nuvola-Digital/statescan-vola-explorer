import CrustIcon from "../../../components/icons/crustIcon";

const nodes = [
  {
    name: "Node00",
    url: "wss://rpc-private.volanetwork.io/",
  },
];

const crust = {
  name: "Vola",
  icon: <CrustIcon />,
  // identity: "crust",
  value: "vola",
  symbol: "VOLA",
  decimals: 12,
  color: "#FA8C16",
  colorSecondary: "rgba(250,140,22, 0.1)",
  // modules: {
  //   identity: true,
  //   multisig: false,
  // },
  nodes,
  useOnChainBlockData: true,
};

export default crust;
