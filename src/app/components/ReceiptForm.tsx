"use client";
import React, { useState } from "react";

interface ReceiptFormCallbackInterface {
  setFormSubmitted: Function;
  setTextObject: Function;
}

// receive two callback functions to set the data for the image
const ReceiptForm = ({
  setFormSubmitted,
  setTextObject,
}: ReceiptFormCallbackInterface) => {
  const [customer, setCustomer] = useState("");
  const [vendor, setVendor] = useState("");
  const [description, setDescription] = useState("");
  const [total, setTotal] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    setTextObject({ customer, vendor, total, description });
  };

  const handleDescriptionInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const maxLength = 100;
    if (e.target.value.length > maxLength) {
      e.preventDefault();
      return;
    }
    setDescription(e.target.value);
  };

  const handleCustomerInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const maxLength = 20;
    if (e.target.value.length > maxLength) {
      e.preventDefault();
      return;
    }
    setCustomer(e.target.value);
  };

  const handleVendorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxLength = 20;
    if (e.target.value.length > maxLength) {
      e.preventDefault();
      return;
    }
    setVendor(e.target.value);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFunction: Function,
    maxLength: number
  ) => {
    if (e.target.value.length > maxLength) {
      e.preventDefault();
      return;
    }
    setFunction(e.target.value);
  };

  // 23 char long for customer
  // 26 char long for vendor?
  return (
    <div className="m-4 p-4">
      <h2 className="m-3 text-4xl text-green-400 object-contain">
        Receipt Form
      </h2>

      <form
        onSubmit={handleSubmit}
        className="m-4 p-4 border-solid border-2 border-green-400 "
      >
        <input
          className="m-4 p-2 w-48 sm:w-64 bg-transparent border-solid border-2 border-green-400"
          type="text"
          placeholder="customer name..."
          value={customer}
          // as the user types it sets the query state variable
          onChange={(e) => handleInputChange(e, setCustomer, 20)}
        />
        <input
          className="m-4 p-2 w-48 sm:w-64 bg-transparent border-solid border-2 border-green-400"
          type="text"
          placeholder="vendor name..."
          value={vendor}
          // as the user types it sets the query state variable
          onChange={(e) => handleInputChange(e, setVendor, 20)}
        />
        <br />
        <input
          className="m-4 p-2 w-48 sm:w-64 bg-transparent border-solid border-2 border-green-400"
          type="text"
          placeholder="total..."
          value={total}
          // as the user types it sets the query state variable
          onChange={(e) => handleInputChange(e, setTotal, 20)}
        />
        <br />
        <textarea
          className="m-4 p-2 w-56 sm:w-96 h-28 bg-transparent border-solid border-2 border-green-400"
          placeholder="description..."
          maxLength={100}
          value={description}
          // as the user types it sets the query state variable
          onInput={handleDescriptionInputChange}
        />
        <button
          className="mx-2 py-2 px-4 transition ease-in-out delay-250 bg-transparent hover:!bg-gradient-to-b from-transparent to-green-800 hover:scale-110 duration-300 text-white font-bold border-solid border-2 border-green-400"
          type="submit"
        >
          Initialize Receipt
        </button>
      </form>
    </div>
  );
};

export default ReceiptForm;
