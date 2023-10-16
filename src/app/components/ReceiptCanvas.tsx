"use client";

import { LegacyRef, useEffect, useState } from "react";
import { useRef } from "react";

interface CanvasOGProps {
  textObject: {
    customer: string;
    vendor: string;
    total: string;
    description: string;
  };
  setImage: Function;
  setImageSet: Function;
  setBlob: Function;
  width: string;
  height: string;
}

interface textObjectInterface {
  customer: string;
  vendor: string;
  total: string;
  description: string;
}

const ReceiptCanvas = ({
  textObject,
  setImage,
  setImageSet,
  setBlob,
  ...rest
}: CanvasOGProps) => {
  const ref = useRef<HTMLCanvasElement>(null);

  const draw = (
    aTextObject: textObjectInterface,
    context: any /*,count: number*/
  ) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    // const delta = count % 500;
    context.fillStyle = "white";
    context.font = "25px Arial";
    context.fillRect(0, 0, rest.width, rest.height);
    context.fillStyle = "black";

    // Create a new path.
    context.beginPath();
    context.moveTo(0, 0);
    let xLine = 0;
    for (let i = 0; i < 17; i++) {
      context.lineTo(xLine, 0);
      xLine += 10;
      context.lineTo(xLine, 10);
      xLine += 10;
      context.lineTo(xLine, 0);
      xLine += 10;
    }
    context.closePath();
    context.fill();

    // Create a new path.
    context.beginPath();
    context.moveTo(0, 600);
    xLine = 0;
    for (let i = 0; i < 17; i++) {
      context.lineTo(xLine, 600);
      xLine += 10;
      context.lineTo(xLine, 590);
      xLine += 10;
      context.lineTo(xLine, 600);
      xLine += 10;
    }
    context.closePath();
    context.fill();

    context.fillText(`Vendor: ${aTextObject.vendor}`, 15 /*+ delta*/, 50);
    context.fillText(`Customer: ${aTextObject.customer}`, 15 /*+ delta*/, 100);
    context.fillText(`Total: ${aTextObject.total}`, 15, 150);
    context.fillText(`Description:`, 15 /*+ delta*/, 200);

    //let lines: String[] = [];
    let current_line = "";
    let totalLineNumber = 1;
    let splitDescription = aTextObject.description.split(" ");

    for (let i = 0; i < splitDescription.length; i++) {
      if (current_line.length + 1 + splitDescription[i].length > 30) {
        context.fillText(
          `${current_line}`,
          40 /*+ delta*/,
          200 + totalLineNumber * 50
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
        200 + totalLineNumber * 50
      );
      // lines.push(current_line);
    }
    //context.fillText(`${aTextObject.description}`, 40 /*+ delta*/, 200);
  };

  useEffect(() => {
    if (ref.current) {
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
    }
  }, [textObject]);

  return (
    <canvas className="" ref={ref as LegacyRef<HTMLCanvasElement>} {...rest} />
  );
};

export default ReceiptCanvas;
