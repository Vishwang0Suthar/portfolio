import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Catalogue } from "@/lib/constData";
import exifr from "exifr";
import MetadataInfo from "@/components/metadata";
import ThumbnailPreview from "@/components/previmages";

interface ImageModalProps {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  closeModal: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  selectedIndex,
  setSelectedIndex,
  closeModal,
}) => {
  const [metadata, setMetadata] = useState<any>(null);

  useEffect(() => {
    const extractMetadata = async () => {
      try {
        const response = await fetch(Catalogue[selectedIndex].imgUrl.src);
        const arrayBuffer = await response.arrayBuffer();
        const exifData = await exifr.parse(arrayBuffer);

        if (exifData?.ExposureTime) {
          exifData.ExposureTime = parseFloat(exifData.ExposureTime.toFixed(5));
        }

        setMetadata(exifData);
      } catch (error) {
        console.error("Error extracting metadata:", error);
        setMetadata(null);
      }
    };

    extractMetadata();
  }, [selectedIndex]);

  const prevImage = () => {
    setSelectedIndex((prev) => (prev === 0 ? Catalogue.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setSelectedIndex((prev) => (prev === Catalogue.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center backdrop-blur-sm bg-black bg-opacity-80 z-50">
      <button
        className="absolute top-5 right-5 text-white text-xl md:text-3xl"
        onClick={closeModal}
      >
        ✕
      </button>
      <button
        onClick={prevImage}
        className="absolute left-5 text-white md:text-4xl text-xl"
      >
        ◀
      </button>

      <ThumbnailPreview
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />

      <Image
        src={Catalogue[selectedIndex].imgUrl}
        alt={Catalogue[selectedIndex].alt}
        className="md:max-w-[90vw] max-w-[70vw] flex-1 md:max-h-[80vh] max-h-[70vh] object-contain"
        width={800}
        height={600}
      />

      <button
        onClick={nextImage}
        className="absolute right-5 text-white md:text-4xl text-xl"
      >
        ▶
      </button>

      {metadata &&
        (metadata.ApertureValue ||
          metadata.ISO ||
          metadata.ExposureTime ||
          metadata.Model) && <MetadataInfo metadata={metadata} />}
    </div>
  );
};

export default ImageModal;
