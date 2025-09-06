
import React from 'react';
import { Spinner } from './Spinner';

interface ImageDisplayProps {
  title: string;
  imageUrl: string | null;
  isLoading?: boolean;
  isEmpty?: boolean;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ title, imageUrl, isLoading = false, isEmpty = true }) => {
  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold text-center mb-4 text-gray-300">{title}</h2>
      <div className="aspect-square w-full bg-gray-800 border-2 border-dashed border-gray-600 rounded-xl flex items-center justify-center overflow-hidden">
        {isLoading ? (
          <div className="text-center text-gray-400">
            <Spinner />
            <p className="mt-2">AI is thinking...</p>
          </div>
        ) : imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-contain" />
        ) : (
          <div className="text-center text-gray-500">
            <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 4v.01M28 8l4 4m0 0l4 4m-4-4v12m0 12V12m0 12a4 4 0 01-4 4H12a4 4 0 01-4-4V12a4 4 0 014-4h4m16 32h-4a4 4 0 01-4-4V28M16 20a4 4 0 11-8 0 4 4 0 018 0z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="mt-2">{isEmpty ? "Your cleaned image will appear here" : "Upload an image to get started"}</p>
          </div>
        )}
      </div>
    </div>
  );
};
