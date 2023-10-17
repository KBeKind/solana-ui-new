import React from "react";
import Image from "next/image";

const WelcomeHeader = () => {
  return (
    <div className="flex">
      <Image
        className="object-contain"
        src={"/images/LEET-RECEIPT-LOGO-LARGE.jpg"}
        alt="leet receipt"
        width="120"
        height="100"
      />

      <div>
        <h1 className="mx-3 mb-1 mt-6 sm:mt-4 text-4xl sm:text-6xl text-green-400">
          leet receipt
        </h1>
        <div className="mx-3 text-lg sm:text-2xl text-green-400">
          <p>receipts for the leet</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;
