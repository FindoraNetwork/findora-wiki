---
sidebar_position: 1
---

# Networks 

## Mainnet

- Network Name: Findora
- Chain ID: `2152`
- Gas Token: FRA
- RPC URL: https://prod-mainnet.prod.findora.org:8545
- Websocket:
  - ws://prod-mainnet01-us-west-2-sentry-001-public.prod.findora.org:8546
- Block Explorer:
  - https://prod-mainnet01-blockscout.prod.findora.org/ (EVM Explorer)

## Forge Testnet

Forge Testnet replicates the Findora Mainnet, which is to be used for testing.

- Network Name: `Forge`
- Chain ID: `525`
- Gas Token: `FRA`
- RPC URL: https://prod-forge.prod.findora.org:8545
- Websocket:
  - ws://prod-forge-us-west-2-sentry-000-public.prod.findora.org:8546
  - ws://prod-forge-us-west-2-sentry-001-public.prod.findora.org:8546
- Block Explorer:
  - https://forge.findorascan.io  (UTXO Explorer)
  - https://testnet-forge.evm.findorascan.io (EVM Explorer)
 

## Anvil

### Two Environments

### `Dev` - private, internal-use only
- Includes `qa01` (for QA use), `qa02`
  - For developing and testing use
  - AWS account number: 358484141435

`Prod` - publicly-accessible
- Includes: Such as `Testnet` and `Mainnet`.
  - No matter the demo chain or the mainnet, all the public chains should in prod environment.
  - AWS account number: 863374702288

### `Dev` Environment

- `qa01`
    
    OFFLINE

    For internal use. Debug and test.

    - **Version**: https://dev-qa01.dev.findora.org:8668/version

    - **Tendermint RPC** : https://dev-qa01.dev.findora.org:26656

    - **Query server RPC** : https://dev-qa01.dev.findora.org:8668

    - **Chain ID**: `2222`

    - **EVM RPC** : https://dev-qa01.dev.findora.org:8545

    - **EVM WS**: 

      dev-qa01-us-west-2-sentry-000-public.dev.findora.org:8546

      dev-qa01-us-west-2-sentry-001-public.dev.findora.org:8546

      dev-qa01-us-west-2-sentry-002-public.dev.findora.org:8546

      dev-qa01-us-west-2-sentry-003-public.dev.findora.org:8546

    **Public seed node endpoint**:

    dev-qa01-us-west-2-seed-000-public.dev.findora.org

    dev-qa01-us-west-2-seed-001-public.dev.findora.org

    dev-qa01-us-west-2-seed-002-public.dev.findora.org

    dev-qa01-us-west-2-seed-003-public.dev.findora.org

    - **Block Explorer**: [https://dev-qa01.findorascan.io/](https://dev-qa01.findorascan.io/)

    - **EVM Explorer**: [https://dev-qa01-blockscout.dev.findora.org](https://dev-qa01-blockscout.dev.findora.org/)

    - **Slack alert channel**: #dev-alerts(will change the name later)

    - **Monitoring:**

    Grafana: [http://monitoring.dev.findora.org:3030/](http://monitoring.dev.findora.org:3030/)

    username: 
    ```js 
        grafana-viewer
    ```
    password: 
    ```js
        findora
    ```
    Promethues: [http://monitoring.dev.findora.org:9090/](http://monitoring.dev.findora.org:9090/)


- `qa02`
    
    OFFLINE

    - **Version**: https://dev-qa02.dev.findora.org:8668/version

    - **Tendermint RPC** : https://dev-qa02.dev.findora.org:26656
    
    - **Query server RPC** : https://dev-qa02.dev.findora.org:8668

    - **Chain ID**:  

    - **EVM RPC** : https://dev-qa02.dev.findora.org:8545

    - **EVM WS**: 

    dev-qa02-us-west-2-sentry-000-public.dev.findora.org:8546

    dev-qa02-us-west-2-sentry-001-public.dev.findora.org:8546

    dev-qa02-us-west-2-sentry-002-public.dev.findora.org:8546

    dev-qa02-us-west-2-sentry-003-public.dev.findora.org:8546

    **Public seed node endpoint**:

    dev-qa02-us-west-2-seed-000-public.dev.findora.org

    dev-qa02-us-west-2-seed-001-public.dev.findora.org

    dev-qa02-us-west-2-seed-002-public.dev.findora.org

    dev-qa02-us-west-2-seed-003-public.dev.findora.org

    - **Block Explorer**: 

    - **EVM Explorer**: 

    - **Slack alert channel**: #dev-alerts(will change the name later)

    - **Monitoring:**

    Grafana: [http://monitoring.dev.findora.org:3030/](http://monitoring.dev.findora.org:3030/)

    username: 
    ```js
        grafana-viewer
    ```
    password: 
    ```js 
        findora
    ```
    Promethues: [http://monitoring.dev.findora.org:9090/](http://monitoring.dev.findora.org:9090/)

- `mainnet-mock`
    
    - **Version**: https://dev-mainnetmock.dev.findora.org:8668/version
    
    - **Tendermint RPC** : https://dev-mainnetmock.dev.findora.org:26656
    
    - **Query server RPC** : https://dev-mainnetmock.dev.findora.org:8668
    
    - **Chain ID**:  2152
    
    - **EVM RPC** : https://dev-mainnetmock.dev.findora.org:8545
    
    - **EVM WS**: 
    
    dev-mainnetmock-us-west-2-sentry-000-public.dev.findora.org:8546
    
    dev-mainnetmock-us-west-2-sentry-001-public.dev.findora.org:8546
    
    dev-mainnetmock-us-west-2-sentry-002-public.dev.findora.org:8546
    
    dev-mainnetmock-us-west-2-sentry-003-public.dev.findora.org:8546
    
    - **Public seed node endpoint**:
    
    dev-mainnetmock-us-west-2-seed-000-public.dev.findora.org
    
    dev-mainnetmock-us-west-2-seed-001-public.dev.findora.org
    
    dev-mainnetmock-us-west-2-seed-002-public.dev.findora.org
    
    dev-mainnetmock-us-west-2-seed-003-public.dev.findora.org
    
    - **Block Explorer**: 
    
    - **EVM Explorer**: [Findora FRA Explorer](https://dev-mainnetmock-blockscout.dev.findora.org/)
    
    - **Slack alert channel**: #dev-alerts(will change the name later)
    
    - **Monitoring:**
    
    Grafana: [http://monitoring.dev.findora.org:3030/](http://monitoring.dev.findora.org:3030/)
    
    username: 
    ```js
        grafana-viewer
    ```
    password: 
    ```js
        findora
    ```
    Promethues: [http://monitoring.dev.findora.org:9090/](http://monitoring.dev.findora.org:9090/)

### `Prod` environment

- `Mainnet`
        
    Mainnet is the release environment. 
    
    - **Version**: https://prod-mainnet.prod.findora.org:8668/version
    
    - **Tendermint RPC** : https://prod-mainnet.prod.findora.org:26656
    **Query server RPC** : https://prod-mainnet.prod.findora.org:8668
  -   
    **Chain ID**: 
  -   ```js
        2152
    ```
    - **EVM RPC** : https://prod-mainnet.prod.findora.org:8545
    
    - **EVM WS**: 
    
    prod-mainnet-us-west-2-sentry-000-public.prod.findora.org:8546
    
    prod-mainnet-us-west-2-sentry-001-public.prod.findora.org:8546
    
    prod-mainnet-us-west-2-sentry-002-public.prod.findora.org:8546
    
    prod-mainnet-us-west-2-sentry-003-public.prod.findora.org:8546
    
    **Public seed node endpoint**:
    
    prod-mainnet-us-west-2-seed-000-public.prod.findora.org
    
    prod-mainnet-us-west-2-seed-001-public.prod.findora.org
    
    prod-mainnet-us-west-2-seed-002-public.prod.findora.org
    
    prod-mainnet-us-west-2-seed-003-public.prod.findora.org
    
    - **Block Explorer**: [Findora Explorer (findorascan.io)](https://findorascan.io/)
    
    - **EVM Explorer**: 
    
    - https://evm.findorascan.io
    
    - **Slack alert channel**: #mainnet-alerts(will change the name later)
    
    **Monitoring:**
    
    Grafana: [https://monitoring.prod.findora.org/](https://monitoring.prod.findora.org/)
    
    username: 
    ```js 
        grafana-viewer
    ```
    password: 
    ```js
    findora
    ```
    Promethues: [https://monitoring.prod.findora.org:9090/](https://monitoring.prod.findora.org:9090/)

- `Testnet-anvil`

    - **Version**: https://prod-testnet.prod.findora.org:8668/version

    - **Tendermint RPC** : https://prod-testnet.prod.findora.org:26656
    
    - **Query server RPC** : https://prod-testnet.prod.findora.org:8668

    - - **EVM RPC** : https://prod-testnet.prod.findora.org:8545

    **Chain ID**: 
    ```js
    2153
    ```

    - **EVM WS**: 

    prod-testnet-us-west-2-sentry-000-public.prod.findora.org:8546

    prod-testnet-us-west-2-sentry-001-public.prod.findora.org:8546

    prod-testnet-us-west-2-sentry-002-public.prod.findora.org:8546

    prod-testnet-us-west-2-sentry-003-public.prod.findora.org:8546

    **Public seed node endpoint**:

    prod-testnet-us-west-2-seed-000-public.prod.findora.org

    prod-testnet-us-west-2-seed-001-public.prod.findora.org

    prod-testnet-us-west-2-seed-002-public.prod.findora.org

    prod-testnet-us-west-2-seed-003-public.prod.findora.org

    - **Block Explorer**: [Findora Explorer (findorascan.io)](https://prod-testnet.findorascan.io/)

    - **EVM Explorer**: 

    - https://testnet-anvil.evm.findorascan.io

    - **Slack alert channel**: #testnet-alerts(will change the name later)

    **Monitoring:**

    Grafana: [https://monitoring.prod.findora.org/](https://monitoring.prod.findora.org/)

    username: 
    ```js
    grafana-viewer
    ```
    password: 
    ```js
    findora
    ```

    Promethues: [https://monitoring.prod.findora.org:9090/](https://monitoring.prod.findora.org:9090/)

- `Testnet - Forge`
    
    
    - **Version**: https://prod-forge.prod.findora.org:8668/version
    
    - **Tendermint RPC** : https://prod-forge.prod.findora.org:26656
   
    - **Query server RPC** : https://prod-forge.prod.findora.org:8668
    
    - **Chain ID**: 
    ```js
        525
    ```
    - **EVM RPC** : 
    ```js
    https://prod-forge.prod.findora.org:8545
    ```
    
    - **EVM WS**: 
    
    prod-forge-us-west-2-sentry-000-public.prod.findora.org:8546
    
    prod-forge-us-west-2-sentry-001-public.prod.findora.org:8546
    
    prod-forge-us-west-2-sentry-002-public.prod.findora.org:8546
    
    prod-forge-us-west-2-sentry-003-public.prod.findora.org:8546
    
    **Public seed node endpoint**:
    
    prod-forge-us-west-2-seed-000-public.prod.findora.org
    
    prod-forge-us-west-2-seed-001-public.prod.findora.org
    
    prod-forge-us-west-2-seed-002-public.prod.findora.org
    
    prod-forge-us-west-2-seed-003-public.prod.findora.org
    
    - **Block Explorer**: 
    
    - **EVM Explorer**: 
    [https://testnet-forge.evm.findorascan.io](https://testnet-forge.evm.findorascan.io)
    
    - **Slack alert channel**: #testnet-alerts(will change the name later)
    
    - **Monitoring:**
    
    Grafana: [https://monitoring.prod.findora.org/](https://monitoring.prod.findora.org/)
    
    username: 
    ```js
        grafana-viewer
    ```
    password: 
    ```js 
        findora
    ```
    Promethues: [https://monitoring.prod.findora.org:9090/](https://monitoring.prod.findora.org:9090/)