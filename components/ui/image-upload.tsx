"use client";

import { FC, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (Value: string) => void;
  onRemove: (Value: string) => void;
  value: string[];
}
const ImageUpload: FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className=" relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
            <Image src={url} className="object-cover" alt="Image" fill />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="fgkhtuf1">
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type="button"
              variant="blue"
              onClick={onClick}
              disabled={disabled}
            >
              <ImagePlus className="w-4 h-4 mr-2" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
