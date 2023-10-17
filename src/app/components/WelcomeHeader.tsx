import React from "react";
import Image from "next/image";

const WelcomeHeader = () => {
  return (
    <div className="flex">
      <Image
        src={"/images/LEET-RECEIPT-LOGO-LARGE.jpg"}
        alt="leet receipt"
        width="120"
        height="100"
      />

      <div>
        <h1 className="m-3 text-6xl text-green-400">leet receipt</h1>
        <div className="m-3 text-2xl text-green-400">
          <p>receipts for the leet</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;
