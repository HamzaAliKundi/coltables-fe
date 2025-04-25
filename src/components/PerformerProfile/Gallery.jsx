import React from "react";

const Gallery = ({ images }) => {
  return (
    <div className="mt-20 max-w-7xl mx-auto px-4 lg:px-8">
      {/* Gallery Header */}
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-[32px] font-space-grotesk text-white">Gallery</h2>
        <div className="w-20 h-1 bg-[#FF00A2]"></div>
      </div>

      {images?.length ? (
        // Gallery Grid - Masonry Layout
        <div className="grid grid-cols-12 gap-4 max-h-[600px] overflow-y-auto pr-4">
          {/* Left Column */}
          <div className="col-span-3 flex flex-col gap-4">
            {images?.slice(0, 2).map((image, index) => (
              <div
                key={index}
                className="aspect-square rounded-2xl overflow-hidden"
              >
                <img
                  src={image}
                  alt={`Gallery Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Center Large Column */}
          <div className="col-span-6">
            {images[2] && (
              <div className="rounded-2xl overflow-hidden h-full max-h-[585px]">
                <img
                  src={images[2]}
                  alt="Main Gallery Image"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="col-span-3 flex flex-col gap-4">
            {images?.slice(3).map((image, index) => (
              <div
                key={index}
                className="aspect-square rounded-2xl overflow-hidden"
              >
                <img
                  src={image}
                  alt={`Gallery Image ${index + 4}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h1 className="text-center text-white">No images to show!</h1>
      )}

      {/* Custom Scrollbar Styles */}
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
    </div>
  );
};

export default Gallery;
