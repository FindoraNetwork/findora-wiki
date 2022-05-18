## Technical Specifications

### Sequence of steps in ABAR Transfer

1. The Receiver generates Axfr Secret Key and the Decryption Key as part of the Anon Keys.

2. The Receiver then generates Axfr Public Key and Encryption Key from the keys in Step 1 and sends them to the Anon Transfer Sender through some external private channel i.e., it's not recorded on the ledger.

3. The Sender opens an ABAR which he has ownership of, and creates a new ABAR assigning the ownership to the Axfr Public Key of the receiver. The asset type and the amount are hidden in an owner memo which is encrypted with the Receiver's Encryption key.

4. The Sender then submits the anonymous transfer transaction to the ledger along with the zero knowledge proof for the valid spending of input ABAR (the knowledge of the secret key and the correctness of the merkle path). A non membership proof is also generated for the nullifier to prove that the ABAR is unspent.

5. The ledger verifies the zero knowledge proof to confirm the valid spending of sender’s ABAR and adds the nullifier to the nullifier set, while the commitment to the new ABAR is added to the ABAR commitment tree.

6. The Sender receives the confirmation of the transaction from the network in the form of a note, and shares the ABAR commitment to the receiver through private channels.

7. The Receiver queries the ledger for the newly owned ABAR by using the commitment shared by the sender, and gets the corresponding transaction. The transaction ID (ATxoSID) and commitment corresponding to this ABAR are stored for future spending.

8. The Receiver can optionally open the ABAR with the Axfr private key and decrypt the owner memo with the decryption key, to confirm the amount and asset type.


<!--- ![](https://i.imgur.com/CXOqKW0.png) -->
<!--- ![](https://i.imgur.com/0q1AvYW.png) -->
<!--- ![](https://i.imgur.com/rYTLMKk.png) -->
<!--- ![](https://i.imgur.com/098kKlh.png) -->
<!--- 3. The Sender generates a commitment using the AXfrPublicKey that was sent by the receiver in Step 2 and uses it later to submit a transaction to the ledger. So, the sender also indirectly creates the owner memo with which the receiver opens the ABAR since ABAR contains the AXFR Note and AXFR Note contains the AXFR Body which in turn contains the owner memo. -->

<!--- 7. The Receiver generates the randomized public key from his private key in step 1 and randomizer from step 5.-->
<!--- 9. The Receiver wallet saves the TxoSID of the ABAR and commitment combination as a unspent anonymous asset in the local database.
9. In the future, the Receiver is a potential new sender and utilizes his now opened ABAR as in Step 8 to generate a new transaction with the nullifier (Step 3). -->