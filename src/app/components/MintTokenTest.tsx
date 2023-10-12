"use client";
import {
  Connection,
  LAMPORTS_PER_SOL,
  Keypair,
  Transaction,
  Signer,
  SystemProgram,
} from "@solana/web3.js";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { generateKeyPair } from "crypto";

import {
  createInitializeMintInstruction,
  TOKEN_PROGRAM_ID,
  MINT_SIZE,
  getMinimumBalanceForRentExemptMint,
  createMint,
} from "@solana/spl-token";

const MintTokenTest = () => {
  // const { connection } = useConnection();

  // const wallet = useWallet();

  // async function createToken() {
  //   if (!wallet.publicKey) throw new Error("wallet.publicKey not found");
  //   // the fromAirdropSignature will end up being the transaction signature.
  // const fromAirdropSignature = await connection.requestAirdrop(wallet.publicKey, LAMPORTS_PER_SOL);
  // await connection.confirmTransaction(fromAirdropSignature);
  // THE await connection.confirmTransaction are ensuring our program doesnt move on until the transaction is done.

  // if (!wallet.signTransaction)
  //   throw new Error("wallet.signTransaction not found");

  // const lamports = await getMinimumBalanceForRentExemptMint(connection);

  return (
    <div>
      <p className="text-2xl">MintTokenTest page</p>
      <div className="text-center">
        <p className="mt-8 text-3xl">Mint Token Section</p>
        <hr className="m-5" />
        <button className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create Token
        </button>
        <button className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Mint Token
        </button>
        <button className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Check Balance
        </button>
        <button className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Send Token
        </button>
      </div>
    </div>
  );
};

export default MintTokenTest;
