import React, { useState, useEffect } from 'react';
import ReviewModal from './ReviewModal';
import { useParams } from 'react-router-dom';
import { useGetPerformerReviewsQuery } from '../../apis/performers';

const Reviews = () => {
  const { id: performerId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [localReviews, setLocalReviews] = useState([]);
  
  const { data: reviewsData, isLoading, refetch } = useGetPerformerReviewsQuery(performerId);
  
  useEffect(() => {
    if (reviewsData?.reviews) {
      setLocalReviews(reviewsData.reviews);
    }
  }, [reviewsData]);
  
  const reviewsPerPage = 2;
  const totalPages = Math.ceil(localReviews.length / reviewsPerPage);
  
  const getCurrentReviews = () => {
    const startIndex = currentPage * reviewsPerPage;
    return localReviews.slice(startIndex, startIndex + reviewsPerPage);
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };
  
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };
  
  const handleReviewSubmit = (reviewData) => {
    const newReview = {
      id: Date.now(),
      name: reviewData.name,
      image: `https://placehold.co/64x64/FF0000/FFFFFF?text=${reviewData.name.substring(0, 2).toUpperCase()}`,
      rating: reviewData.rating,
      text: reviewData.review
    };
    
    setLocalReviews([newReview, ...localReviews]);
    setCurrentPage(0);
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
          <span className="text-2xl font-bold">{reviewsData?.averageRating || '0.0'}</span>
          <span className="text-lg">|</span>
          <span className="text-2xl font-bold">{localReviews.length}</span>
          <span className="text-lg">reviews</span>
        </div>
      </div>

      {/* Reviews Slider */}
      <div className="relative">
        {isLoading ? (
          <div className="flex justify-center items-center h-[294px]">
            <div className="w-8 h-8 border-4 border-[#FF00A2] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : localReviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[294px] bg-gradient-to-br from-[#FF00A2]/20 to-[#2A2A2A] rounded-2xl p-8">
            <h3 className="text-white text-xl font-space-grotesk mb-4">No Reviews Yet</h3>
            <p className="text-white/70 text-center max-w-md">
              Be the first to share your experience with this performer. Your review will help others make better decisions.
            </p>
          </div>
        ) : (
          <>
            <div className="flex gap-6 overflow-hidden">
              {getCurrentReviews().map((review) => (
                <div 
                  key={review.id} 
                  className={`flex-none w-full md:w-[calc(50%-12px)] h-[294px] rounded-2xl p-8 relative
                    bg-gradient-to-br from-[#FF00A2]/40 to-[#2A2A2A]`}
                >
                  <div className="absolute left-0 top-0 w-2 h-full bg-[#FF00A2] rounded-l-2xl"></div>
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={review.image || `https://placehold.co/64x64/FF0000/FFFFFF?text=${review.name.substring(0, 2).toUpperCase()}`} 
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

            {/* Navigation Dots */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array(totalPages).fill(null).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentPage ? 'bg-[#FF00A2]' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Leave Reviews Button */}
        <div className="flex justify-center mt-8">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#FF00A2] text-white text-lg font-space-grotesk py-4 px-12 rounded-full hover:bg-[#FF00A2]/90 transition-colors"
          >
            Leave a Review
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