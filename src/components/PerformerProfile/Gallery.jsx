import React, { useState } from 'react';

const Gallery = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Calculate image distribution based on count
  const getImageDistribution = () => {
    const count = images.length;
    
    if (count === 0) return { left: [], center: null, right: [] };
    if (count === 1) return { left: [], center: images[0], right: [] };
    
    // For 2-10 images
    const leftCount = Math.min(4, Math.ceil((count - 1) / 2));
    const rightCount = Math.min(4, Math.floor((count - 1) / 2));
    
    return {
      left: images.slice(0, leftCount),
      center: count >= 2 ? images[leftCount] : null,
      right: images.slice(leftCount + 1, leftCount + 1 + rightCount)
    };
  };

  const { left, center, right } = getImageDistribution();

  return (
    <div className="mt-20 max-w-7xl mx-auto px-4 lg:px-8 relative">
      {/* Gallery Header */}
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-[32px] font-space-grotesk text-white">Gallery</h2>
        <div className="w-20 h-1 bg-[#FF00A2]"></div>
      </div>

      {images.length > 0 ? (
        <div className="grid grid-cols-12 gap-4 max-h-[600px] overflow-y-auto pr-4">
          {/* Left Column */}
          <div className="col-span-3 flex flex-col gap-4">
            {left.map((image, index) => (
              <ImageTile 
                key={`left-${index}`}
                image={image}
                index={index}
                openModal={openModal}
              />
            ))}
          </div>

          {/* Center Column */}
          <div className="col-span-6">
            {center && (
              <div className="rounded-2xl overflow-hidden h-full max-h-[585px] relative group">
                <img
                  src={center}
                  alt="Main Gallery Image"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <PreviewButton openModal={() => openModal(center)} />
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="col-span-3 flex flex-col gap-4">
            {right.map((image, index) => (
              <ImageTile 
                key={`right-${index}`}
                image={image}
                index={index + left.length + (center ? 1 : 0)}
                openModal={openModal}
              />
            ))}
          </div>
        </div>
      ) : (
        <h1 className="text-center text-white">No images to show!</h1>
      )}

      {/* Preview Modal */}
      {isModalOpen && (
        <ModalPreview 
          image={selectedImage} 
          closeModal={closeModal} 
        />
      )}

      {/* Custom Scrollbar Styles */}
      <ScrollbarStyles />
    </div>
  );
};

// Subcomponents for better organization
const ImageTile = ({ image, index, openModal }) => (
  <div className="aspect-square rounded-2xl overflow-hidden relative group">
    <img
      src={image}
      alt={`Gallery Image ${index + 1}`}
      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
    <PreviewButton openModal={() => openModal(image)} />
  </div>
);

const PreviewButton = ({ openModal }) => (
  <button
    onClick={openModal}
    className="absolute inset-0 m-auto w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  </button>
);

const ModalPreview = ({ image, closeModal }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
    <div className="relative max-w-4xl w-full max-h-[90vh]">
      <img
        src={image}
        alt="Preview"
        className="w-full h-full object-contain max-h-[80vh]"
      />
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-75 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
);

const ScrollbarStyles = () => (
  <style jsx global>{`
    .overflow-y-auto::-webkit-scrollbar {
      width: 4px;
    }
    .overflow-y-auto::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 2px;
    }
    .overflow-y-auto::-webkit-scrollbar-thumb {
      background: #ff00a2;
      border-radius: 2px;
    }
    .overflow-y-auto {
      scrollbar-width: thin;
      scrollbar-color: #ff00a2 rgba(255, 255, 255, 0.1);
    }
  `}</style>
);

export default Gallery;