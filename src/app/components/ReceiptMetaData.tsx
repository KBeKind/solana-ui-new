"use client";

import { useEffect, useState } from "react";

interface ReceiptMetaDataProps {
  textObject: {
    customer: string;
    vendor: string;
    total: string;
    description: string;
  };
}

const ReceiptMetaData = ({ textObject }: ReceiptMetaDataProps) => {
  const [descriptionSpacedString, setDescriptionSpacedString] = useState("");

  let splitDescription = textObject.description.split(" ");

  for (let i = 0; i < splitDescription.length; i++) {
    if (splitDescription[i].length > 30) {
      const word = splitDescription[i];
      const firstString = word.slice(0, 31);
      splitDescription[i] = firstString;
      splitDescription.splice(i + 1, 0, word.slice(31));
    }
  }
  useEffect(() => {
    setDescriptionSpacedString(splitDescription.join(" "));
  }, [textObject]);

  return (
    <div className="m-4 text-lg px-5 py-2 bg-transparent border-solid border-2 border-green-400 text-green-400">
      <h3 className="text-2xl">Current Metadata:</h3>
      <ul>
        <li>nft name: Leet-Receipt--{textObject.vendor}</li>
        <li>
          nft description: Leet Receipts {textObject.vendor}-
          {textObject.customer}
        </li>
        <li>
          nft attributes:
          <ul className="ms-8">
            <li>vendor: {textObject.vendor} </li>
            <li>customer: {textObject.customer} </li>
            <li>total: {textObject.total}</li>
            <li>
              description: <div className="w-64">{descriptionSpacedString}</div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default ReceiptMetaData;
