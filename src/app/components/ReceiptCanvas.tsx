"use client";

import { updateArgs } from "@metaplex-foundation/mpl-token-metadata";
import { useEffect, useState } from "react";
import { useRef } from "react";

interface CanvasOGProps {
  textObject: {
    customer: string;
    vendor: string;
    description: string;
  };
  setImage: Function;
  setImageSet: Function;
  setBlob: Function;
  width: String;
  height: String;
}

const ReceiptCanvas = ({
  textObject,
  setImage,
  setImageSet,
  setBlob,
  ...rest
}: CanvasOGProps) => {
  const ref = useRef();

  const draw = (aTextObject, context /*,count: number*/) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    // const delta = count % 500;
    context.fillStyle = "white";
    context.font = "25px Arial";
    context.fillRect(0, 0, rest.width, rest.height);
    context.fillStyle = "black";
    context.fillText(`Vendor: ${aTextObject.vendor}`, 15 /*+ delta*/, 50);
    context.fillText(`Customer: ${aTextObject.customer}`, 15 /*+ delta*/, 100);
    context.fillText(`Description:`, 15 /*+ delta*/, 150);

    //let lines: String[] = [];
    let current_line = "";
    let totalLineNumber = 1;
    let splitDescription = aTextObject.description.split(" ");

    for (let i = 0; i < splitDescription.length; i++) {
      if (current_line.length + 1 + splitDescription[i].length > 30) {
        context.fillText(
          `${current_line}`,
          40 /*+ delta*/,
          150 + totalLineNumber * 50
        );
        totalLineNumber++;
        current_line = splitDescription[i];
      } else {
        current_line += " " + splitDescription[i];
      }
    }
    if (current_line) {
      context.fillText(
        `${current_line}`,
        40 /*+ delta*/,
        150 + totalLineNumber * 50
      );
      // lines.push(current_line);
    }
    //context.fillText(`${aTextObject.description}`, 40 /*+ delta*/, 200);
  };

  useEffect(() => {
    const theCanvas = ref.current;

    const context = theCanvas.getContext("2d");
    draw(textObject, context);

    // const base64StringDataUrl = theCanvas.toDataURL("image/jpeg", 0.5);

    // localStorage.setItem("image", base64StringDataUrl);

    theCanvas.toBlob(
      (blob: any) => {
        const newImage = document.createElement("img");
        const url = URL.createObjectURL(blob);
        setBlob(blob);
        setImage(url);
      },
      "image/jpeg",
      0.95
    ); // converting to jpeg at 95% quality
    setImageSet(true);

    // setImage(base64StringDataUrl);
    // setImageSet(true);
  }, [textObject]);

  return <canvas className="" ref={ref} {...rest} />;
};

export default ReceiptCanvas;
