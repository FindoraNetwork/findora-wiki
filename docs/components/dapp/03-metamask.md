# Using Metamask


import useBaseUrl from '@docusaurus/useBaseUrl';

If you have used Metamask for any sort of development work on the EVM, then setting up Findora for use is as simple as can be. Simply take the network details as shown [here](https://wiki.findora.org/docs/dapp/network/) and make use of them as Metamask requires. Let's jump right in!

The first step is to install Metamask from [metamask.io](https://metamask.io). 

Next up, click on the bar that would typically show your last connected network. 

<img src={useBaseUrl("/img/evm/metamask.png")} width="45%" height="30%"/>


You should get a drop-down and a button that shows "Add Network". Click on that and a new tab will open where you can place Findora's network configurations.

<img src={useBaseUrl("/img/evm/metamask-1.png")} width="100%" height="100%"/>

Next, configure Metamask to connect to Findora’s EVM network (aka Smart Chain).

For example, if you would like to connect to the Anvil testnet, in the `Network Name` input field, copy and place this

```
Anvil
```

In the New `RPC URL` input field, copy and place this in 

```
https://prod-forge.prod.findora.org:8545
```

Just below in the `Chain ID` input field, copy and place this

```
525
```

Beside the Chain ID, `Currency Symbol` is 

```
FRA
```

And at the end is the `Block Explorer URL`. Please place this in

```
http://blockscout.findorascan.io
```

After everything, you should see this screen

<img src={useBaseUrl("/img/evm/anvil-3.png")} width="100%" height="100%"/>


Click on the 'Save' button and you should have a screen like this and be ready to go!

<img src={useBaseUrl("/img/evm/anvil-4.png")} width="45%" height="30%"/>
