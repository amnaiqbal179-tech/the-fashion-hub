'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  return (
    <div className="space-y-4">
      {value && (
        <div className="relative w-40 h-40 rounded-lg overflow-hidden border">
          <Image src={value} alt="Product Image" fill className="object-cover" />
        </div>
      )}

      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={(result: any) => {
          if (result?.info?.secure_url) {
            onChange(result.info.secure_url);
          }
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className="px-4 py-2 bg-slate-900 text-white rounded-md text-sm font-medium hover:bg-slate-800 transition"
          >
            {value ? 'Change Photo' : 'Upload Product Photo'}
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
}