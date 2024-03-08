import { Skeleton } from '@/shared/ui/skeleton';
import '@uploadthing/react/styles.css';
import { FileIcon, X } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { generateComponents } from '@uploadthing/react';
import { OurFileRouter } from '@/shared/api/uploadthing';

interface props {
  onChange: (url?: string) => void;
  value: string;
  endpoint: 'messageFile' | 'serverImage';
}

export const FileUpload = ({ onChange, value, endpoint }: props) => {
  const { UploadDropzone } = generateComponents<OurFileRouter>();
  const [isLoaded, setIsLoaded] = useState(false);
  const fileType = value.split('.').pop();

  if (value && fileType !== 'pdf') {
    return (
      <div className="relative h-20 w-20">
        {!isLoaded && (
          <Skeleton className="h-full w-full rounded-full bg-gray-400" />
        )}
        <Image
          fill
          src={value}
          alt="Upload"
          className="rounded-full"
          onLoad={() => setIsLoaded(false)}
        />

        <button
          onClick={() => onChange('')}
          className="absolute right-0 top-0 rounded-full bg-rose-500 p-1 text-white shadow-sm "
          type="button">
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (value && fileType === 'pdf') {
    return (
      <div className="relative mx-4 mt-2 flex items-center rounded-md bg-background/10 p-2">
        <div className="relative mx-4 mt-2 flex items-center rounded-md bg-background/10 p-2">
          <FileIcon className="pointer h-10 w-10 fill-indigo-200 stroke-indigo-400" />
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-sm text-indigo-500 hover:underline dark:text-indigo-400">
            PDF File
          </a>
        </div>
        <button
          onClick={() => onChange('')}
          className="absolute -right-2 -top-2 rounded-full bg-rose-500 p-1 text-white shadow-sm "
          type="button">
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(response) => onChange(response?.[0].url)}
      onUploadError={(error: Error) => {
        console.error(error);
      }}
    />
  );
};
