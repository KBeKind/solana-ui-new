import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createGenericFile,
  Instruction,
  Signer,
  signerIdentity,
  transactionBuilder,
  WrappedInstruction,
} from "@metaplex-foundation/umi";
import { clusterApiUrl } from "@solana/web3.js";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import {
  createBundlrUploader,
  bundlrUploader,
} from "@metaplex-foundation/umi-uploader-bundlr";
// bundlr is being depricated now it is Irys
import { sign } from "crypto";
import * as UmiWeb3Adapters from "@metaplex-foundation/umi-web3js-adapters";

import {
  walletAdapterIdentity,
  WalletAdapter,
  createSignerFromWalletAdapter,
} from "@metaplex-foundation/umi-signer-wallet-adapters";

import { percentAmount, generateSigner } from "@metaplex-foundation/umi";
import {
  createNft,
  createV1,
  TokenStandard,
} from "@metaplex-foundation/mpl-token-metadata";

import { mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine";

// mockStorage is for testing
import { mockStorage } from "@metaplex-foundation/umi-storage-mock";
import { unpackMultisig } from "@solana/spl-token";
import { text } from "stream/consumers";

interface BundlrUploadProps {
  blob: Blob;
  textObject: {
    customer: string;
    vendor: string;
    total: string;
    description: string;
  };
}

const NewBundlrUpload = ({ blob, textObject }: BundlrUploadProps) => {
  //const { connection } = useConnection();
  const wallet = useWallet();
  const uploadFile = async () => {
    //const connection = new Web3.Connection(Web3.clusterApiUrl("devnet"));
    //UPDATE TO UMI FRAMEWORK
    const umi = createUmi("https://api.devnet.solana.com");
    // setting up the mockStorage for testing
    // umi.use(mockStorage());

    const arrayBuffer: ArrayBuffer = await blob.arrayBuffer();
    const uint8Array: Uint8Array = new Uint8Array(arrayBuffer);

    const genericFile = createGenericFile(
      uint8Array,
      `Leet-Receipt--${textObject.vendor}-${textObject.customer}.jpg`,
      {
        displayName: "LR-Image",
        uniqueName: "LR-Image",
        contentType: "image/jpeg",
        extension: ".jpg",
        tags: [
          { name: "customer", value: textObject.customer },
          { name: "vendor", value: textObject.vendor },
          { name: "total", value: textObject.total },
          { name: "description", value: textObject.description },
        ],
      }
    );

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

    umi.use(signerIdentity(signer));

    const bundlerUploaderOptions = {
      address: BUNDLR_ADDRESS,
      timeout: 60000, //number for timeout
      providerUrl: ENDPOINT,
      priceMultiplier: 1, // 1 is standard - this payment multiple is a fee to store data ahead of others
      payer: signer,
    };

    //switching from createBundlrUploader to bundlerUploader via umi

    umi.use(bundlrUploader(bundlerUploaderOptions));

    const collectionUpdateAuthority = generateSigner(umi);
    const collectionMint = generateSigner(umi);

    umi.use(mplCandyMachine());

    //const bundlrUploadTest = createBundlrUploader(umi, bundlerUploaderOptions);

    const [imageUri] = await umi.uploader.upload([genericFile]);

    console.log(imageUri);

    const jsonUri = await umi.uploader.uploadJson({
      name: `Leet-Receipt--${textObject.vendor}`,
      description: "Leet Receipts",
      image: imageUri,
      attributes: [
        {
          trait_type: "Vendor",
          value: textObject.vendor,
        },
        {
          trait_type: "Customer",
          value: textObject.customer,
        },
        {
          trait_type: "Total",
          value: textObject.total,
        },
        {
          trait_type: "Description",
          value: textObject.description,
        },
      ],
      properties: {
        files: [
          {
            uri: imageUri,
            type: "image/jpeg",
          },
        ],
      },
    });

    //const [myUri] = await bundlrUploadTest.upload([genericFile]);

    console.log(jsonUri);

    // const [myDownloadedFile] = await umi.downloader.download([myUri]);

    // console.log(myDownloadedFile);

    // const [myUri] = await umi.uploader.upload([genericFile]);
    // console.log(myUri);
    // const [myDownloadedFile] = await umi.downloader.download([myUri]);
    // console.log(myDownloadedFile);

    const mint = generateSigner(umi);

    // const nftResponse = await createV1(umi, {
    //   mint,
    //   authority: signer,
    //   name: `Leet-Receipt--${textObject.vendor}-${textObject.customer}.jpg`,
    //   uri: jsonUri,
    //   sellerFeeBasisPoints: percentAmount(0),
    //   decimals: 0,
    //   tokenStandard: 0,
    //   // the above had this but it should equate to 0 so im testing it with 0: TokenStandard.NonFungible,
    // }).sendAndConfirm(umi);

    const nftResponse = await createNft(umi, {
      mint: collectionMint,
      authority: collectionUpdateAuthority,
      name: `Leet-Receipt-${textObject.vendor}`,
      uri: jsonUri,
      sellerFeeBasisPoints: percentAmount(0),
      isCollection: true,
    }).sendAndConfirm(umi);
    console.log(nftResponse);
  };

  return (
    <div className="m-5 ms-10">
      <button
        onClick={uploadFile}
        className=" py-2 px-4 transition ease-in-out delay-250 bg-transparent hover:!bg-gradient-to-b from-transparent to-green-800 hover:scale-110 duration-300 text-white font-bold border-solid border-2 border-green-400"
        type="submit"
      >
        Create NFT Receipt!
      </button>
    </div>
  );
};

export default NewBundlrUpload;
