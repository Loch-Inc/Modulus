import {
  createWeb3Modal,
  defaultConfig,
  useDisconnect,
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalEvents,
} from "@web3modal/ethers/react";
import { useEffect } from "react";
import { Route } from "react-router-dom";
import { removeSessionSavedStrategyId } from "./ReusableFunctions";
import { toast } from "react-toastify";

const PublicRoute = ({ component: Component, ...rest }) => {
  useEffect(() => {
    removeSessionSavedStrategyId();
  }, []);
  // Wallet
  const mainnet = {
    chainId: 1,
    name: "Ethereum",
    currency: "ETH",
    explorerUrl: "https://etherscan.io",
    rpcUrl: "https://cloudflare-eth.com",
  };
  const metadata = {
    name: "Loch",
    description: "My Website description",
    url: "https://app.loch.one/", // origin must match your domain & subdomain
    icons: ["https://avatars.mywebsite.com/"],
  };
  createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: [mainnet],
    projectId: "4ba0f16b53f8888a667cbbb8bb366918",
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
  });
  const walletevents = useWeb3ModalEvents();
  const { address, isConnected } = useWeb3ModalAccount();
  const { open: openConnectWallet } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const openDisconnectConnectWallet = () => {
    if (isConnected) {
      disconnect();
      setTimeout(() => {
        openConnectWallet();
      }, 1000);
    } else {
      openConnectWallet();
    }
  };
  // Wallet

  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <div className="main-section">
            <div className={`main-section-right`}>
              <div className="main-content-wrapper">
                <Component
                  connectedWalletAddress={address}
                  isWalletConnected={isConnected}
                  connectedWalletevents={walletevents}
                  openConnectWallet={openDisconnectConnectWallet}
                  disconnectWallet={disconnect}
                  key={props.location.pathname}
                  {...props}
                />
              </div>
            </div>
          </div>
        );
      }}
    />
  );
};

export default PublicRoute;
