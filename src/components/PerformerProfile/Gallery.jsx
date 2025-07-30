import { useState } from "react";

const Gallery = ({ images = [], videos = [] }) => {
  const filteredImages = images ? images.filter(img => img !== null) : [];

  // ✅ FIXED: Enhanced video detection function that supports multiple formats
  const isVideo = (url) => {
    if (!url || typeof url !== "string") return false;
    
    // Check if URL contains /video/upload/ (Cloudinary video URLs)
    if (url.includes('/video/upload/')) return true;
    
    // Also check for video file extensions
    const videoExtensions = ['.mp4', '.mov', '.avi', '.webm', '.mkv', '.wmv', '.flv', '.m4v', '.3gp', '.ogg'];
    const urlLower = url.toLowerCase();
    return videoExtensions.some(ext => urlLower.includes(ext));
  };

  // ✅ FIXED: Helper function to get correct MIME type for videos
  const getVideoMimeType = (url) => {
    if (!url || typeof url !== "string") return 'video/mp4';
    const urlLower = url.toLowerCase();
    
    if (urlLower.includes('.mov')) return 'video/quicktime';
    if (urlLower.includes('.avi')) return 'video/x-msvideo';
    if (urlLower.includes('.webm')) return 'video/webm';
    if (urlLower.includes('.mkv')) return 'video/x-matroska';
    if (urlLower.includes('.wmv')) return 'video/x-ms-wmv';
    if (urlLower.includes('.flv')) return 'video/x-flv';
    if (urlLower.includes('.m4v')) return 'video/x-m4v';
    if (urlLower.includes('.3gp')) return 'video/3gpp';
    if (urlLower.includes('.ogg')) return 'video/ogg';
    
    return 'video/mp4'; // default
  };

  const media = filteredImages.map((item) => {
    // ✅ FIXED: Use new isVideo function instead of just checking .mp4
    if (typeof item === "string" && isVideo(item)) {
      return { url: item, type: "video" };
    }
    return { url: item, type: "image" };
  });

  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (media) => {
    setSelectedMedia(media);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getMediaDistribution = () => {
    const count = media.length;

    if (count === 0) return { left: [], center: [], right: [] };
    if (count === 1) return { left: [], center: [media[0]], right: [] };
    if (count === 2) return { left: [media[1]], center: [media[0]], right: [] };
    if (count === 3)
      return { left: [media[1]], center: [media[0]], right: [media[2]] };
    if (count === 4)
      return {
        left: [media[1], media[3]],
        center: [media[0]],
        right: [media[2]],
      };
    if (count === 5)
      return {
        left: [media[1], media[3]],
        center: [media[0]],
        right: [media[2], media[4]],
      };
    if (count === 6)
      return {
        left: [media[1], media[3], media[5]],
        center: [media[0]],
        right: [media[2], media[4]],
      };
    if (count === 7)
      return {
        left: [media[1], media[3], media[5]],
        center: [media[0]],
        right: [media[2], media[4], media[6]],
      };
    if (count === 8)
      return {
        left: [media[1], media[3], media[5]],
        center: [media[0], media[7]],
        right: [media[2], media[4], media[6]],
      };
    if (count === 9)
      return {
        left: [media[1], media[3], media[5], media[8]],
        center: [media[0], media[7]],
        right: [media[2], media[4], media[6]],
      };
    if (count === 10)
      return {
        left: [media[1], media[3], media[5], media[8]],
        center: [media[0], media[7]],
        right: [media[2], media[4], media[6], media[9]],
      };

    const leftCount = Math.min(4, Math.ceil((count - 2) / 2));
    const rightCount = Math.min(4, Math.floor((count - 2) / 2));

    return {
      left: media.slice(0, leftCount),
      center: [media[leftCount], media[leftCount + rightCount + 1]],
      right: media.slice(leftCount + 1, leftCount + 1 + rightCount),
    };
  };

  const { left, center, right } = getMediaDistribution();

  return (
    <div className="mt-20 max-w-7xl mx-auto px-4 lg:px-8 relative">
      {/* Gallery Header */}
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-[32px] font-space-grotesk text-white">Gallery</h2>
        <div className="w-20 h-1 bg-[#FF00A2]"></div>
      </div>

      {media.length > 0 ? (
        <div className="grid grid-cols-12 gap-4 max-h-[500px] overflow-y-auto pr-4">
          {/* Left Column */}
          <div className="col-span-3 flex flex-col gap-4">
            {left.map((media, index) => (
              <MediaTile
                key={`left-${index}`}
                media={media}
                index={index}
                openModal={openModal}
                getVideoMimeType={getVideoMimeType}
              />
            ))}
          </div>

          {/* Center Column - Now with two items */}
          <div className="col-span-6 flex flex-col gap-4">
            {center.map((media, index) => (
              <div
                key={`center-${index}`}
                className="rounded-2xl overflow-hidden h-full relative group"
              >
                {media.type === "video" ? (
                  <video
                    className="w-full md:h-[550px] h-[170px] object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    muted
                    loop
                    autoPlay
                    playsInline
                  >
                    <source src={media.url} type={getVideoMimeType(media.url)} />
                  </video>
                ) : (
                  <img
                    src={media.url}
                    alt={`Center Gallery ${index + 1}`}
                    className="w-full md:h-[550px] h-[170px] object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                )}
                <PreviewButton openModal={() => openModal(media)} />
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="col-span-3 flex flex-col gap-4">
            {right.map((media, index) => (
              <MediaTile
                key={`right-${index}`}
                media={media}
                index={index + left.length + center.length}
                openModal={openModal}
                getVideoMimeType={getVideoMimeType}
              />
            ))}
          </div>
        </div>
      ) : (
        <h1 className="text-center text-white">No media to show!</h1>
      )}

      {/* Preview Modal */}
      {isModalOpen && (
        <ModalPreview media={selectedMedia} closeModal={closeModal} getVideoMimeType={getVideoMimeType} />
      )}

      {/* Custom Scrollbar Styles */}
      <ScrollbarStyles />
    </div>
  );
};

// ✅ FIXED: MediaTile component with proper video MIME type
const MediaTile = ({ media, index, openModal, getVideoMimeType }) => (
  <div className="aspect-square rounded-2xl overflow-hidden relative group">
    {media.type === "video" ? (
      <video
        className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
        muted
        loop
        autoPlay
        playsInline
      >
        <source src={media.url} type={getVideoMimeType(media.url)} />
      </video>
    ) : (
      <img
        src={media.url}
        alt={`Gallery item ${index + 1}`}
        className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
      />
    )}
    <PreviewButton openModal={() => openModal(media)} />
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

// ✅ FIXED: ModalPreview with proper video MIME type
const ModalPreview = ({ media, closeModal, getVideoMimeType }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
    <div className="relative max-w-4xl w-full max-h-[90vh] flex justify-center">
      {media.type === "video" ? (
        <video
          className="w-full h-full object-contain max-h-[80vh]"
          controls
          autoPlay
          playsInline
        >
          <source src={media.url} type={getVideoMimeType(media.url)} />
        </video>
      ) : (
        <img
          src={media.url}
          alt="Preview"
          className="w-full h-full object-contain max-h-[80vh]"
        />
      )}
      <button
        onClick={closeModal}
        className="absolute top-2 right-2 md:top-4 md:right-4 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-75 transition-colors"
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