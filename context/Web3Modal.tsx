import { http, createConfig } from "wagmi";
import { walletConnect, coinbaseWallet } from "wagmi/connectors";
import {
  ENABLED_CHAINS,
  PUB_APP_DESCRIPTION,
  PUB_APP_NAME,
  PUB_PROJECT_URL,
  PUB_RPC_URL,
  PUB_WALLET_CONNECT_PROJECT_ID,
  PUB_WALLET_ICON,
} from "@/constants";
import { ChainId } from "@/utils/chains";

// wagmi config
const metadata = {
  name: PUB_APP_NAME,
  description: PUB_APP_DESCRIPTION,
  url: PUB_PROJECT_URL,
  icons: [PUB_WALLET_ICON],
};

export const config = createConfig({
  chains: ENABLED_CHAINS,
  // TODO do we need to have this enabled?
  ssr: true,
  transports: {
    [1]: http(PUB_RPC_URL[1], { batch: true }),
    [11155111]: http(PUB_RPC_URL[11155111], { batch: true }),
  } satisfies Record<ChainId, unknown>,
  connectors: [
    walletConnect({
      projectId: PUB_WALLET_CONNECT_PROJECT_ID,
      metadata,
      showQrModal: false,
    }),
    coinbaseWallet({ appName: metadata.name, appLogoUrl: metadata.icons[0] }),
  ],
});
