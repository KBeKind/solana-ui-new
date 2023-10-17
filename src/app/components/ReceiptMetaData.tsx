import React from "react";

interface ReceiptMetaDataProps {
  textObject: {
    customer: string;
    vendor: string;
    total: string;
    description: string;
  };
}

const ReceiptMetaData = ({ textObject }: ReceiptMetaDataProps) => {
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
            {textObject.total.length > 0 && (
              <li>total: {textObject.customer} </li>
            )}
            <li>description: {textObject.description} </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default ReceiptMetaData;
