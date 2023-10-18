import ReceiptMetaData from "./ReceiptMetaData";
import NewBundlrUpload from "./NewBundlrUpload";
import Image from "next/image";

interface ImageAndUploadProps {
  imageSet: Boolean;
  image: string;
  textObject: {
    customer: string;
    vendor: string;
    total: string;
    description: string;
  };
  blob: Blob;
  receiptWidth: number;
  receiptHeight: number;
}

const ImageAndUpload = ({
  imageSet,
  image,
  textObject,
  blob,
  receiptWidth,
  receiptHeight,
}: ImageAndUploadProps) => {
  return (
    <div>
      <div> {imageSet && <ReceiptMetaData textObject={textObject} />}</div>
      <div className="mx-5 p-5 border-solid border-2 border-green-400">
        {imageSet && (
          <Image
            src={image}
            alt="Leet Receipt"
            width={receiptWidth}
            height={receiptHeight}
          />
        )}
        {imageSet && blob && (
          <NewBundlrUpload blob={blob} textObject={textObject} />
        )}
      </div>
    </div>
  );
};

export default ImageAndUpload;
