import { useWeb3Modal, useWeb3ModalTheme } from '@web3modal/react'
import { Web3NetworkSwitch } from '@web3modal/react'
import { W3mQrCode } from '@web3modal/react'
import { useEffect } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

export default function Home() {
    const { connect, connectors, error, isLoading, pendingConnector } =
        useConnect()
    const { theme, setTheme } = useWeb3ModalTheme()
    const { disconnect } = useDisconnect();
    const { address, isConnected } = useAccount()
    const { isOpen, open, close, setDefaultChain } = useWeb3Modal()
    useEffect(() => {
        setTheme({
            themeMode: 'light',
            themeVariables: {
                '--w3m-font-family': 'Roboto, sans-serif',
                '--w3m-accent-color': '#000'
            }
        })
    }, [])

    return <div>
        <W3mQrCode size={200} imageUrl="url/to/image" uri="data" />
        <Web3NetworkSwitch />
        <div>
            {connectors.map((connector) => (
                <button
                    key={connector.id}
                    onClick={() => connect({ connector })}
                >
                    {connector.name}
                    {isLoading &&
                        connector.id === pendingConnector?.id &&
                        ' (connecting)'}
                </button>
            ))}

            {error && <div>{error.message}</div>}
        </div>
        {/* <button onClick={() => open()}>Connect Wallet</button> */}
        <button onClick={() => disconnect()}>Dissconnect</button>
       
    </div>
}