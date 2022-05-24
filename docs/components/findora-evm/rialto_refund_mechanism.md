# Rialto Refund Mechanism

## Context

Rialto is a software program which provides connectivity between two EVM compatible chains. It achives this by providing event realaying across both the chains .
### Types of bridges

Rialto has two types of bridges

- Incoming Bridges : These are all the bridges that bring liquidity to our system , from foreign L1 chains. For these bridges the source chain for tokens is `not` Findora EVM .
    - Example : BUSD Bridge
      BUSD(Existing on BSC) <-> BUSD.b (Existing on FRA)
      Use case : Bring TVL to our network

- Outgoing Bridges : THese bridges move liquidity away from our system, to other L1 chains. FRA EVM is the source chain for all of them .
    - Example : FRA Bridge
      FRA(existing on FRA EVM) <-> FRA.f (Existing on BSC)
      Usecase : enable us to create LPs in dex's like pancake swap.

Note : Both the bridges are bidectional

### How a bridge functions

Using BUSD <-> BUSD.b (Incoming Bridge) as an example

1. Rialto deployes a locking contract on `BSC` , and a minting contract on `FRA EVM`
2. User approves locking Smart contract on BSC -   Uses pays gas in BNB (BSC)
3. User deposits to locking smart contract - User pays gas in BNB (BSC)
4. Relayers relay locking event and Vote to mint Busd.b -  Relayers pay in FRA (funded by operators)
5. Busd.b is minted and trasfered to recipent . The recipent address is part of the event relayed .

### Why we need a refund mechanism

- A user has to pay gas twice in step 1 and step 2 above , in the source chain . Although the value of the gas usage might not be much in terms of USD for chains like BSC , but this amount can be substantial for the Ethereum network . We plan to subsidise the users in some way. .
- Provide a user with FRA , as soon as they bring their tokens to our chain . Obtaining which might be difficult for users since they would have to buy it from exchanges like gate.io
- This can also be used for marketing .The idea of getting gas refunded is appeling to most defi users .
- The refund mechanism is required only for Incoming chains , We do not need a one for Outgoing as FRA itself is quite cheap


## Refund Mechanism

- The main idea is to refund the users in FRA equivalent for what they spend in the source chain .
  Example  :  If a user spends 1 BNB in gas (hypothetical).
  We refund 1 BNB = $640 i.e  $640/$0.04 FRA  = 16,000 FRA

- Note
    - A calculation like this might benifit from using a oracle price feed  , But we can also do this calculation offchain . The reason being
    - The gas usage for `Approve` and `Deposit` transactions is almost constant .
    - Although the gas price might vary , we can account for that by keeping this distribution value easily configurable. ( More details on this on the Techinical implementation section)
    - Integrating with a price feed oracle will be a bigger developemt effort and would definitly delay the launch a little bit.


## Technical Implementation

- Using the same example as above . When BUSD.b is minted on FRA EVM , the smart contrct emits an event which contains {Recipient Address , Name of token minted}.
- The token name / address of the minting token can be used to obtain the SourceChain .(Tokens like USDT would still have different minting contracts on FRA EVM)

### Create an off-chain deamon

- The deamon maintains the following maps
```go=
   refund_amount =  map[Sourcechain]Amount
   refund_amoun[BSC] -> 250 FRA
   refund_amoun[ETH] -> 2000 FRA
```
```go=
   gas_used_l1 = map [SourceChain]GasUsed
   gas_used_l1[BSC] -> 1000
   gas_used_l1[ETH] -> 1000
```


- This map amount is based on the USD calculation below
  ```rust
    gas_price = fetch (Cmc API with parameter SourceChain) 
    fra_price = fetch (Cmc API with parameter FRA) 
    usd_value_source_chain = gas_used_l1[SourceChain] * gas_price
    refund_amount = usd_value_source_chain / fra_price * reducing_factor [More details on reducing factor in later sections]
    ```

- This daemon then  listens to events from the minting smart contract and uses the calculations above to create a list like below
```json=
DistributionList : [
    {
        "address" : "0x96B05C238b99768F349135de0653b687f9c13fEE",
        "refund_amount"  : "250"
    }
]  
```

- The daemon should only add an entry to this list after it has been confirmed on the blockchain i.e receive atleast three confirmations

- Since this daemon can parse events as soon as the are commited , the maximum price fluctiontion that we have to worry about is 3 blocks , i.e 48secs .

### Create a distribution script

- THe distribution script parses the `DistributionList` json , creates sendTx for each entry and submits the transactions
- The sender of this tx can be a Foundation controlled address (Need inputs here)

### Additional points to note
- The refund amount should be at max equivalent to the USD amount the user spend in the orginal chain ( Preferably we keep the reducing_factor less than 1). This will prevent users from spamming the TX , to burn out the relayer balances . ( the relayers pay to vote for every trasfer).
- For outgoing chains , we should set a relayer-fee , for the same purpose as above. The vote txs would cost us quite a bit on L1 chains like ethereum.