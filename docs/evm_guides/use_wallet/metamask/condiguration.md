---
sidebar_position: 1
---

# Configure Metamask

If you have used Metamask for any sort of development work on the EVM, then setting up Findora for use is as simple as can be. Simply take the network details as shown [here](/docs/network.mdx) and make use of them as Metamask requires. Let's jump right in!

The first step is to install Metamask from [Metamask](https://metamask.io).

Next up, click on the bar that would typically show your last connected network.

![metamask](/img/guides/use-wallet/metamask-01.png)

You should get a drop-down and a button that shows `Add Network`. Click on that and a new tab will open where you can place Findora's network configurations.

![metamask](/img/guides/use-wallet/metamask-02.png)

Next, configure Metamask to connect to Findora’s EVM network (aka Smart Chain). The network details can be found here:

<table>
    <tr>
    <th></th>
    <th>Mainnet</th>
    <th>Testnet</th>
    </tr>
    <tr>
    <th>Chain ID</th>
    <td>2152</td>
    <td>2153</td>
    </tr>
    <tr>
    <th>RPC</th>
    <td>https://rpc-mainnet.findora.org</td>
    <td>https://prod-testnet.prod.findora.org:8545</td>
    </tr>
    <tr>
    <th>Explorer</th>
    <td>https://evm.findorascan.io</td>
    <td>https://testnet-anvil.evm.findorascan.io/</td>
    </tr>
</table>

For example, if you would like to connect to the Anvil Testnet, your Metamask should be configured like this:

![metamask](/img/guides/use-wallet/metamask-03.png)

Click on the `Save` button and you should have a screen like this and be ready to go!

![metamask](/img/guides/use-wallet/metamask-04.png)
