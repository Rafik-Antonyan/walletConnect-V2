import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon, sepolia } from 'wagmi/chains'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import Core from 'web3modal'

const chains = [arbitrum, mainnet, polygon, sepolia]
const projectId = 'f9bfe097999499e1be1155a5e1a98f8a'

const core = new Core({
    projectId
})

const web3wallet = await web3wallet.init({
    core, // <- pass the shared `core` instance
    metadata: {
        name: 'Demo app',
        description: 'Demo Client as Wallet/Peer',
        url: 'www.walletconnect.com',
        icons: []
    }
})
web3wallet.on('session_proposal', async proposal => {
    const session = await web3wallet.approveSession({
        id: proposal.id,
        namespaces
    })
})
await web3wallet.core.pairing.pair({ uri })

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: [
        new MetaMaskConnector({ chains }),
        new CoinbaseWalletConnector({
            chains,
            options: {
                appName: 'wagmi',
            },
        }),
        new WalletConnectConnector({
            chains,
        }),
        new InjectedConnector({
            chains,
            options: {
                name: 'Injected',
                shimDisconnect: true,
            },
        }),
    ],
    publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

function MyApp({ Component, pageProps }) {
    return <>
        <WagmiConfig config={wagmiConfig}>
            <Component {...pageProps} />
        </WagmiConfig>

        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />

    </>
}

export default MyApp;

