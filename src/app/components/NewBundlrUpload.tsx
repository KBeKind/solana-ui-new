import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";

import { createGenericFile, Signer } from "@metaplex-foundation/umi";
import { clusterApiUrl } from "@solana/web3.js";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";

//import { createBundlrUploader } from "@metaplex-foundation/umi-uploader-bundlr";
// bundlr is being depricated now it is Irys
import { sign } from "crypto";
import * as UmiWeb3Adapters from "@metaplex-foundation/umi-web3js-adapters";

import {
  walletAdapterIdentity,
  WalletAdapter,
  createSignerFromWalletAdapter,
} from "@metaplex-foundation/umi-signer-wallet-adapters";

// mockStorage is for testing
import { mockStorage } from "@metaplex-foundation/umi-storage-mock";

interface BundlrUploadProps {
  blob: Blob;
}

const NewBundlrUpload = ({ blob }: BundlrUploadProps) => {
  //const { connection } = useConnection();
  const wallet = useWallet();
  const uploadFile = async () => {
    //const connection = new Web3.Connection(Web3.clusterApiUrl("devnet"));
    //UPDATE TO UMI FRAMEWORK
    const umi = createUmi("https://api.devnet.solana.com");
    // setting up the mockStorage for testing
    umi.use(mockStorage());

    const arrayBuffer: ArrayBuffer = await blob.arrayBuffer();
    const uint8Array: Uint8Array = new Uint8Array(arrayBuffer);

    const genericFile = createGenericFile(uint8Array, "testImage.jpg", {
      displayName: "My Test Image",
      uniqueName: "my-test-image",
      contentType: "image/jpeg",
      extension: ".jpg",
      tags: [{ name: "name", value: "value" }],
    });

    // Devnet Bundlr address
    const BUNDLR_ADDRESS = "https://devnet.bundlr.network";
    const IRYS_ADDRESS = "https://devnet.irys.xyz";

    // Mainnet Irys address, https://node1.irys.xyz

    // Mainnet Bundlr address, uncomment if using mainnet
    // const BUNDLR_ADDRESS = "https://node1.bundlr.network"

    // Connection endpoint, switch to a mainnet RPC if using mainnet
    const ENDPOINT = clusterApiUrl("devnet");

    if (!wallet.publicKey) throw new Error("DEV_PRIVATE_KEY not found");
    if (!wallet.signMessage) throw new Error("DEV_PRIVATE_KEY not found");
    if (!wallet.signTransaction) throw new Error("DEV_PRIVATE_KEY not found");
    if (!wallet.signAllTransactions)
      throw new Error("DEV_PRIVATE_KEY not found");

    const umiWallet: WalletAdapter = {
      publicKey: wallet.publicKey,
      signMessage: wallet.signMessage,
      signTransaction: wallet.signTransaction,
      signAllTransactions: wallet.signAllTransactions,
    };
    const signer: Signer = createSignerFromWalletAdapter(umiWallet);

    const bundlerUploaderOptions = {
      address: BUNDLR_ADDRESS,
      timeout: 60000, //number for timeout
      providerUrl: ENDPOINT,
      priceMultiplier: 1, // 1 is standard - this payment multiple is a fee to store data ahead of others
      payer: signer,
    };

    //const bundlerUploadTest = createBundlrUploader(umi, bundlerUploaderOptions);

    const [myUri] = await umi.uploader.upload([genericFile]);

    console.log(myUri);

    const [myDownloadedFile] = await umi.downloader.download([myUri]);

    console.log(myDownloadedFile);
  };

  return (
    <div>
      <button
        onClick={uploadFile}
        className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Upload Image
      </button>
    </div>
  );
};

export default NewBundlrUpload;
