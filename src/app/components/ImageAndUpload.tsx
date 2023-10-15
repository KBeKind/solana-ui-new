import React from "react";
import ReceiptMetaData from "./ReceiptMetaData";
import NewBundlrUpload from "./NewBundlrUpload";

interface ImageAndUploadProps {
  imageSet: Boolean;
  image: string;
  textObject: {
    customer: string;
    vendor: string;
    description: string;
  };
  blob: Blob;
}

const ImageAndUpload = ({
  imageSet,
  image,
  textObject,
  blob,
}: ImageAndUploadProps) => {
  return (
    <div>
      <div> {imageSet && <ReceiptMetaData textObject={textObject} />}</div>
      <div className="mx-5 p-5 border-solid border-2 border-green-400">
        {imageSet && <img src={image} width="500" height="600"></img>}
        {imageSet && blob && (
          <NewBundlrUpload blob={blob} textObject={textObject} />
        )}
      </div>
    </div>
  );
};

export default ImageAndUpload;
