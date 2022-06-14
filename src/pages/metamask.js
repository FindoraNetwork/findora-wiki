import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import { Web3Provider } from '@ethersproject/providers'
import { NoBscProviderError } from '@binance-chain/bsc-connector'
import { Web3ReactProvider, UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected, InjectedConnector } from '@web3-react/injected-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect, WalletConnectConnector } from '@web3-react/walletconnect-connector'
import css from './metamask.module.css'

const getShortenAddress = (address) => {
    if (!address) return ''
    const firstCharacters = address.substring(0, 6)
    const lastCharacters = address.substring(address.length - 4, address.length)
    return `${firstCharacters}...${lastCharacters}`
}

const setupNetwork = async () => {
    const provider = window.ethereum
    if (provider) {
        try {
            await provider.request({
                method: 'wallet_addEthereumChain',
                params: [
                    {
                        chainId: `0x${parseInt('2152', 10).toString(16)}`,
                        chainName: 'Findora Forge',
                        nativeCurrency: {
                            name: 'FRA',
                            symbol: 'fra',
                            decimals: 18
                        },
                        rpcUrls: ['https://prod-mainnet.prod.findora.org:8545'],
                        blockExplorerUrls: ['https://blockscout.findorascan.io/']
                    }
                ]
            })
            return true
        } catch (error) {
            console.error('Failed to setup the network in Metamask:', error)
            return false
        }
    } else {
        console.error("Can't setup the Findora network on metamask because window.ethereum is undefined")
        return false
    }
}

const injected = new InjectedConnector({
    supportedChainIds: [2152]
})

const useEagerConnect = () => {
    const { activate, active } = useWeb3React()

    const [tried, setTried] = useState(false)

    useEffect(() => {
        injected.isAuthorized().then(isAuthorized => {
            if (isAuthorized && localStorage.getItem('isLogout') === 'false') {
                activate(injected, undefined, true).catch(() => {
                    setTried(true)
                })
            } else {
                setTried(true)
            }
        })
    }, [activate])

    useEffect(() => {
        if (!tried && active) {
            setTried(true)
        }
    }, [tried, active])

    return tried
}

const useInactiveListener = (suppress = false) => {

    const { active, error, activate } = useWeb3React()

    useEffect(() => {
        const { ethereum } = window
        if (ethereum && ethereum.on && !active && !error && !suppress) {
            const handleConnect = () => {
                console.log("Handling 'connect' event")
                activate(injected)
            }
            const handleChainChanged = (chainId) => {
                console.log("Handling 'chainChanged' event with payload", chainId)
                activate(injected)
            }
            const handleAccountsChanged = (accounts) => {
                console.log("Handling 'accountsChanged' event with payload", accounts)
                if (accounts.length > 0) {
                    activate(injected)
                }
            }
            const handleNetworkChanged = (networkId) => {
                console.log("Handling 'networkChanged' event with payload", networkId)
                activate(injected)
            }

            ethereum.on('connect', handleConnect)
            ethereum.on('chainChanged', handleChainChanged)
            ethereum.on('accountsChanged', handleAccountsChanged)
            ethereum.on('networkChanged', handleNetworkChanged)

            return () => {
                if (ethereum.removeListener) {
                    ethereum.removeListener('connect', handleConnect)
                    ethereum.removeListener('chainChanged', handleChainChanged)
                    ethereum.removeListener('accountsChanged', handleAccountsChanged)
                    ethereum.removeListener('networkChanged', handleNetworkChanged)
                }
            }
        }
    }, [active, error, suppress, activate])
}


const ConnectWallet = () => {
    const { account, activate, deactivate, error } = useWeb3React()
    const triedEager = useEagerConnect()
    useInactiveListener(!triedEager)

    const login = async () => {
        await activate(injected, async e => {
            if (e instanceof UnsupportedChainIdError) {
                const hasSetup = await setupNetwork()
                if (hasSetup) {
                    activate(injected)
                    localStorage.setItem('isLogout', 'false')
                }
            } else {
                let message = ''
                let description = ''
                if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
                    message = 'Provider Error'
                    description = 'No provider was found'
                } else if (e instanceof UserRejectedRequestErrorInjected || e instanceof UserRejectedRequestErrorWalletConnect) {
                    if (injected instanceof WalletConnectConnector) {
                        const walletConnector = injected
                        walletConnector.walletConnectProvider = undefined
                    }
                    message = 'Authorization Error'
                    description = 'Please authorize to access your account'
                } else {
                    message = e.name
                    description = e.message
                }
                alert(message)
                localStorage.setItem('isLogout', 'true')
            }
        })
    }

    const logout = ()=>{
        deactivate()
        localStorage.setItem('isLogout', 'true')
        alert('You are successfully logged out.')
    }

    useEffect(() => {
        if (account) {
            localStorage.setItem('isLogout', 'false')
        }
    }, [account])

    return account ? (
        <div className={css.btn} onClick={()=>logout()}>
            <span>{getShortenAddress(account)}</span>
        </div>
    ) : (
        <div className={css.btn} onClick={() => login()}>
            <span>Connect wallet</span>
        </div>
    )
}

export default function Hello() {

    return (
        <Web3ReactProvider
            getLibrary={provider => {
                const library = new Web3Provider(provider)
                library.pollingInterval = 5000
                return library
            }}
        >
            <Layout title="Hello" description="Hello React Page">
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '50vh',
                        fontSize: '20px',
                    }}>
                    <ConnectWallet />
                </div>
            </Layout>
        </Web3ReactProvider>
    );
}