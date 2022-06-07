# Penalties

As rewards go to validators for the work in securing the system, penalties exist to act as safeguards from malicious nodes. Right now, Findora engages in punitive mesaures when validators engage in two major malicious activites.
Findora has penalties for the following actions

## Double Signing penalty 
- This penalty is triggered when a validator proposes , signs two different blocks at the same time , This penalty is important because a validator can double spend using an attack like this 
- If double-signing at validator detected, then violating validator will suffer via:
       
  - Burned FRA
    - burn **5%** of FRA staked at validator
                     - i.e. if validator staked 100 tokens, the 5 FRA will be burned
  - Unbonding
    - All FRA staked (including FRA delegated to validator) are unbonded
    - these unbonded FRA can't rebond to another validator for **21** days.


## Unavailability penalty (
- This penalty is triggered when a validator is offline for a certain number of blocks . Voting is an important feature of a POS chain , and since offline validator nodes can't vote ,this needs to be punished
- `unavailability threshold` is **95%** missed blocks in last **10k** blocks (~16hours)
- If validator unavailable (to compute consensus) for `unavailability threshold` then
    - **0.1%** of staked FRA at validator is burned
    











