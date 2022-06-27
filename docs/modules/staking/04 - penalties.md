# Penalties

The rewards described earlier incentivize desired validator behaviors. The penalties below exist to deter unwanted validator behaviors:

## Double Signing Penalty 
This penalty triggers when a validator signs two different blocks at the same time (i.e. attempts a double spend attack). If double-signing is detected, then the violating validator will be penalized with:
       
  - Burned FRA
    - burn **5%** of FRA staked at validator
                     - i.e. if validator staked 100 tokens, then 5 FRA will be burned
  - Unbonding
    - all FRA staked (including FRA delegated to validator) are unbonded
    - the unbonded FRA can't rebond to another validator for **21** days.


## Unavailability Penalty
This penalty triggers when a validator is offline too often for a certain number of blocks. Since  the availablility of validators to contribute to voting is critical to securing a PoS blockchain, highly unreliable validators must be punished when they fall below a minimum performance threshold (aka `unavailability threshold`). 

The `unavailability threshold` is defined as **95%** missed blocks in last **10k** blocks (~16hours). If a validator's availabilty to compute consensus falls below the `unavailability threshold`, then **0.1%** of FRA staked by the validator is burned as a penalty.
    











