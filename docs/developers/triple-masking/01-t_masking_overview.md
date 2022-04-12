---
sidebar_position: 0
---

# Overview

The `Findora SDK` contains a `Triple Masking` API, which enables developers to have access to the latest `Findora` privacy features, such as a fully secured transfers with zero visibility and full privacy.

User can transfer funds from its _normal_ wallet to the _anonymous_ wallet. This process is called `bar to abar`.

When `bar to abar` process is completed, then only the person, who has access to the keys of that _anonymous_ wallet as well as to the **special hash with the trasnfer information** (a.k.a _a randomizer_), would be able to decode the information related to that transfer, to see its balance and to use funds from it, like to transfer it back to the _normal wallet_ and so on.

After funds are _converted_ (using `bar to abar`), they are fully secured and hidden under full privacy protection, which basically means, that nobody can trace neither the sender _normal_ wallet information, nor the amount or type of the asset whatever. It is fully secured and the only way to retrive that iformation, as well as use those funds is to have both **the randomizer** and **the anonymous wallet** information.

It is **critically** important to secure and protect this information, otherwise funds would be completely lost without an option to recover it.

To receive funds from the _anonymous walllet_, user needs to perform the _opposiute_ operation, which is called `abar to bar`. For that user needs to provide the randomizer and some pieces of the _anonymous wallet_ information, as well as the information about the _normal_ wallet (where the funds should be tansfered to).

Both operations are available in the `Findora SDK` via its `Triple Masking` API, please see the examples in the next chapters.
