
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ImageUploader } from './components/ImageUploader';
import { ImageDisplay } from './components/ImageDisplay';
import { Button } from './components/Button';
import { Spinner } from './components/Spinner';
import { removeFlaresFromImage } from './services/geminiService';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    setOriginalImage(file);
    setEditedImage(null);
    setError(null);
  };

  const handleCleanImage = useCallback(async () => {
    if (!originalImage) {
      setError("Please upload an image first.");
      return;
    }

    setIsLoading(true);
    setEditedImage(null);
    setError(null);

    try {
      const result = await removeFlaresFromImage(originalImage);
      if (result) {
        setEditedImage(result);
      } else {
        setError("The AI could not process this image. Please try another one.");
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [originalImage]);

  const originalImageUrl = originalImage ? URL.createObjectURL(originalImage) : null;

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-5xl">
          <p className="text-center text-lg text-gray-400 mb-8">
            Upload a photo to automatically remove lens flares and reflections using AI.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <ImageDisplay title="Original Image" imageUrl={originalImageUrl} />
            <ImageDisplay
              title="Cleaned Image"
              imageUrl={editedImage}
              isLoading={isLoading}
              isEmpty={!editedImage}
            />
          </div>

          {error && (
            <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative mb-6 text-center" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <ImageUploader onImageUpload={handleImageUpload} />
            <div className="flex items-center gap-4">
               {originalImage && editedImage && (
                <a
                  href={editedImage}
                  download={`cleaned-${originalImage.name}`}
                  className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900 transition-colors"
                >
                  Download
                  <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </a>
              )}
              <Button onClick={handleCleanImage} disabled={!originalImage || isLoading}>
                {isLoading ? <Spinner /> : 
                  <>
                  <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 3.104 5.25 5.25a.75.75 0 0 1 0 1.06l-5.25 5.25m0-11.562a1.5 1.5 0 0 0-2.122 2.122L8.625 9.75l-1.002-1.001a1.5 1.5 0 0 0-2.122 2.122l2.122 2.122 1.002 1.001-2.122 2.122a1.5 1.5 0 0 0 2.122 2.122l5.25-5.25a.75.75 0 0 1 0-1.06l-5.25-5.25Z" />
                  </svg>
                  Clean Image
                  </>
                }
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
