import React, { useState } from 'react';
import ReviewModal from './ReviewModal';
import { useParams } from 'react-router-dom';

const Reviews = () => {
  const { id: performerId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "MATTHEW SPARKS",
      image: "https://placehold.co/64x64/FF0000/FFFFFF?text=MS", // Red background dummy image
      rating: 5,
      text: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s,"
    },
    {
      id: 2,
      name: "FÉLIX THOMAS",
      image: "https://placehold.co/64x64/FF0000/FFFFFF?text=FT", // Red background dummy image
      rating: 4,
      text: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s,"
    }
  ]);

  const handleReviewSubmit = (reviewData) => {
    // Add the new review to the local state
    const newReview = {
      id: reviews.length + 1,
      name: reviewData.name,
      rating: reviewData.rating,
      text: reviewData.review
    };
    setReviews([newReview, ...reviews]);
  };

  return (
    <div className="mt-20 max-w-7xl mx-auto px-4 lg:px-8">
      {/* Reviews Header */}
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-[32px] font-space-grotesk text-white">Fan Reviews!</h2>
        <div className="w-32 h-1 bg-[#FF00A2]"></div>
      </div>

      {/* TrustScore Section */}
      <div className="flex flex-col items-center mb-12">
        <div className="flex gap-1 mb-2">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="w-12 h-12 bg-[#FF00A2] flex items-center justify-center rounded-lg">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
          ))}
          <div className="w-12 h-12 bg-white/20 flex items-center justify-center rounded-lg">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        </div>
        <div className="flex items-center gap-2 text-white">
          <span className="text-lg">TrustScore</span>
          <span className="text-2xl font-bold">4.7</span>
          <span className="text-lg">|</span>
          <span className="text-2xl font-bold">36,769</span>
          <span className="text-lg">reviews</span>
        </div>
      </div>

      {/* Reviews Slider */}
      <div className="relative">
        <div className="flex gap-6 overflow-hidden">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className={`flex-none w-full md:w-[calc(50%-12px)] h-[294px] rounded-2xl p-8 relative
                bg-gradient-to-br from-[#FF00A2]/40 to-[#2A2A2A]`}
            >
              {/* Pink accent line */}
              <div className="absolute left-0 top-0 w-2 h-full bg-[#FF00A2] rounded-l-2xl"></div>
              
              {/* Rest of the card content remains the same */}
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={review.image} 
                  alt={review.name} 
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div>
                  <h3 className="text-white text-xl font-space-grotesk">{review.name}</h3>
                  <div className="flex gap-1">
                    {Array(5).fill(null).map((_, index) => (
                      <svg 
                        key={index}
                        className={`w-4 h-4 ${index < review.rating ? 'text-[#FF00A2]' : 'text-white/20'}`}
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-white/90 text-lg leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>

        {/* Slider Dots */}
        <div className="flex justify-center gap-2 mt-8">
          <div className="w-2 h-2 rounded-full bg-[#FF00A2]"></div>
          <div className="w-2 h-2 rounded-full bg-white/20"></div>
          <div className="w-2 h-2 rounded-full bg-white/20"></div>
          <div className="w-2 h-2 rounded-full bg-white/20"></div>
        </div>

        {/* Leave Reviews Button */}
        <div className="flex justify-center mt-8">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#FF00A2] text-white text-lg font-space-grotesk py-4 px-12 rounded-full hover:bg-[#FF00A2]/90 transition-colors"
          >
            Leave Reviews
          </button>
        </div>
      </div>

      {/* Review Modal */}
      <ReviewModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleReviewSubmit}
        performerId={performerId}
      />
    </div>
  );
};

export default Reviews;