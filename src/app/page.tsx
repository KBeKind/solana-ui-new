"use client";

import ReceiptForm from "@/app/components/ReceiptForm";
import ReceiptCanvas from "@/app/components/ReceiptCanvas";
import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import NewBundlrUpload from "./components/NewBundlrUpload";

import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
// import {
//   WalletDisconnectButton,
//   WalletMultiButton,
// } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import WelcomeHeader from "./components/WelcomeHeader";
import ReceiptMetaData from "./components/ReceiptMetaData";
import ImageAndUpload from "./components/ImageAndUpload";

//testing this import with dynamic to see what happens because it is in the Next.js wallet adapter sample on solana labs
const WalletDisconnectButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletDisconnectButton,
  { ssr: false }
);
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const Home = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [textObject, setTextObject] = useState({
    customer: "",
    vendor: "",
    total: "",
    description: "",
  });
  const [imageSet, setImageSet] = useState(false);
  const [image, setImage] = useState();
  const [blob, setBlob] = useState();
  const [file, setFile] = useState<File>();

  // passing two callback functions into RecieptForm
  return (
    <div>
      <WelcomeHeader></WelcomeHeader>
      {/* <Link
        className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        href="/mintTokenTest"
      >
        Mint Token Test Page
      </Link> */}
      <br />
      <div className="mx-5 border-solid border-2 border-green-400">
        <WalletMultiButtonDynamic />
        <WalletDisconnectButtonDynamic />
      </div>
      <div className="lg:flex">
        <ReceiptForm
          setFormSubmitted={setFormSubmitted}
          setTextObject={setTextObject}
        />
        <div className="hidden">
          {formSubmitted && (
            <ReceiptCanvas
              textObject={textObject}
              setImage={setImage}
              setImageSet={setImageSet}
              setBlob={setBlob}
              width="500"
              height="600"
            />
          )}
        </div>
        <br />

        {imageSet && blob && image && (
          <ImageAndUpload
            imageSet={imageSet}
            textObject={textObject}
            image={image}
            blob={blob}
          />
        )}
        {/* <div> {imageSet && <ReceiptMetaData textObject={textObject} />}</div>
      <div className="p-4 mx-8">
        {imageSet && <img src={image} width="500" height="600"></img>}
      </div>
      <div>
        {imageSet && blob && (
          <NewBundlrUpload blob={blob} textObject={textObject} />
        )}
      </div> */}
      </div>{" "}
    </div>
  );
};
{
}
export default Home;
