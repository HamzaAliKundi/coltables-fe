import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAddPerformerReviewMutation } from '../../apis/performers';
import { toast } from 'react-hot-toast';

const ReviewModal = ({ isOpen, onClose, onSubmit, performerId }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [name, setName] = useState('');
  const [addReview, { isLoading }] = useAddPerformerReviewMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {     
      toast.error('Please enter your name');
      return;
    }
    
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    
    if (!review.trim()) {
      toast.error('Please enter your review');
      return;
    }

    if (!performerId) {
      toast.error('Performer ID is missing');
      return;
    }

    try {
      const reviewData = {
        name: name.trim(),
        description: review.trim(),
        rating
      };
      
      const result = await addReview({ performerId, reviewData }).unwrap();
      if (result.success) {
        toast.success('Review Added Successfully! Please wait for approval.');
        onSubmit({ rating, review, name });
        setRating(0);
        setReview('');
        setName('');
        onClose();
      } else {
        toast.error('Failed to submit review. Please try again.');
      }
    } catch (error) {
      toast.error(error.data?.message || 'Failed to submit review. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1A1A1A] p-6 rounded-lg w-full max-w-md relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-white/70 hover:text-white"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-space-grotesk text-white mb-6 text-center">Leave a Review</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-white/90 text-sm">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/10 rounded-lg p-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FF00A2]"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-white/90 text-sm">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-2xl ${star <= rating ? 'text-[#FF00A2]' : 'text-white/30'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-white/90 text-sm">Your Review</label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full h-32 bg-white/10 rounded-lg p-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FF00A2]"
              placeholder="Share your experience..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#FF00A2] text-white text-lg font-space-grotesk py-3 px-6 rounded-full hover:bg-[#FF00A2]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal; 