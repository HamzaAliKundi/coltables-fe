import React from 'react';

const Gallery = () => {
  return (
    <div className="mt-20 max-w-7xl mx-auto px-4 lg:px-8">
      {/* Gallery Header */}
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-[32px] font-space-grotesk text-white">Gallery</h2>
        <div className="w-20 h-1 bg-[#FF00A2]"></div>
      </div>

      {/* Gallery Grid - Masonry Layout */}
      <div className="grid grid-cols-12 gap-4 max-h-[521px] overflow-y-auto pr-4">
        {/* Left Column */}
        <div className="col-span-3 flex flex-col gap-4">
          <div className="aspect-square rounded-2xl overflow-hidden">
            <img 
              src="https://placehold.co/280x280/2A2A2A/FFFFFF?text=Gallery+1" 
              alt="Gallery"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden">
            <img 
              src="https://placehold.co/280x280/2A2A2A/FFFFFF?text=Gallery+2" 
              alt="Gallery"
              className="w-full h-full object-cover grayscale"
            />
          </div>
          <div className="h-20 rounded-xl overflow-hidden relative">
            <img 
              src="https://placehold.co/280x80/2A2A2A/FFFFFF?text=Video+1"
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 right-2">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Center Large Column */}
        <div className="col-span-6">
          <div className="rounded-2xl overflow-hidden h-full">
            <img 
              src="https://placehold.co/580x521/2A2A2A/FFFFFF?text=Main+Gallery" 
              alt="Gallery"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-3 flex flex-col gap-4">
          <div className="aspect-square rounded-2xl overflow-hidden">
            <img 
              src="https://placehold.co/280x280/2A2A2A/FFFFFF?text=Gallery+3" 
              alt="Gallery"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden">
            <img 
              src="https://placehold.co/280x280/2A2A2A/FFFFFF?text=Gallery+4" 
              alt="Gallery"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-40 rounded-xl overflow-hidden relative">
            <img 
              src="https://placehold.co/280x160/2A2A2A/FFFFFF?text=Video+2"
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 right-2">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
          <div className="h-20 rounded-xl overflow-hidden relative">
            <img 
              src="https://placehold.co/280x80/2A2A2A/FFFFFF?text=Video+3"
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 right-2">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
          <div className="h-20 rounded-xl overflow-hidden">
            <img 
              src="https://placehold.co/280x80/2A2A2A/FFFFFF?text=Gallery+5"
              alt="Gallery"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

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
          background: #FF00A2;
          border-radius: 2px;
        }
        
        .overflow-y-auto {
          scrollbar-width: thin;
          scrollbar-color: #FF00A2 rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Gallery;