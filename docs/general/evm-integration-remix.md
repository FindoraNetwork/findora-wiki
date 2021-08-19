# EVM Integration - Use Remix

## Prerequisites
Make sure you have setup Ethereum account and received FRA on it.

### Connect FRA-EVM account to remix
1 . Open remix https://remix.ethereum.org/
2 . Select The `Deploy and Run Transactions` tab , and select `Injected Web3` as the enviorment.

![img.png](static/img/evm/remix_0.png)

3 . Give permissions to metamask and select account with FRA balance . Your address should show up and show the FRA balance.(It shows as ether right now but would be changed soon)

### Create a smart contract
1 . Go to `File Explorers` tab and create a new workspace . We created one called `Findora Devnet` [ Name does not matter].Remove the default scripts if any, and a new script file.

![img_1.png](static/img/evm/remix_1.png)

2.  Write out the contract . Here is a some sample code.

```javascript
pragma solidity ^0.4.22;

contract helloFindora {
  function renderHelloFromFindora () public pure returns (string) {
   return 'helloFindorian';
  }
}
```

### Deploy and Test smart contract
1 . Go to `Solidity Compiler` and compile your contract .

![img_2.png](static/img/evm/remix_2.png)

2. Go to `Deploy and Run Transactions` , select your contract and click deploy .Allow permissions and wait fot the tx to be commited . The status is visible on the terminal

![img_4.png](static/img/evm/remix_4.png)

3 .The deployed contract would now be available for you to test.

![img_5.png](static/img/evm/remix_5.png)