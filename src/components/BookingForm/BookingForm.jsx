import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSendOTPMutation, useVerifyOTPMutation, useSubmitBookingRequestMutation } from '../../apis/booking';
import { useGetPerformersQuery } from '../../apis/performers';

const equipmentOptions = [
  { value: 'sound-pa-system', label: 'Sound/PA System' },
  { value: 'lighting', label: 'Lighting' },
  { value: 'microphones', label: 'Microphones' },
  { value: 'backline-instruments', label: 'Backline (instruments)' },
  { value: 'fog-machine', label: 'Fog Machine' },
  { value: 'stage', label: 'Stage' },
  { value: 'not-sure', label: "I'm Not Sure Yet" },
  { value: 'other', label: 'Other..' }
];

const durationOptions = [
  { value: '15-minutes', label: '15 minutes' },
  { value: '30-minutes', label: '30 minutes' },
  { value: '1-hour', label: '1 hour' },
  { value: '2-hour', label: '2 hour' },
  { value: '3-hour', label: '3 hour' },
  { value: '4-hour', label: '4 hour' }
];

const BookingForm = ({ isOpen, onClose }) => {
  // OTP/Email Verification - Starting at step 0 (email verification)
  const [currentStep, setCurrentStep] = useState(0);
  const [equipmentDropdownOpen, setEquipmentDropdownOpen] = useState(false);
  const [durationDropdownOpen, setDurationDropdownOpen] = useState(false);
  const [performerDropdownOpen, setPerformerDropdownOpen] = useState(false);
  const [performerSearchQuery, setPerformerSearchQuery] = useState('');
  const [debouncedPerformerSearch, setDebouncedPerformerSearch] = useState('');
  const [allPerformers, setAllPerformers] = useState([]);
  const performerDropdownRef = useRef(null);
  const performerSearchTimeoutRef = useRef(null);
  const [customDuration, setCustomDuration] = useState('');
  // OTP/Email Verification
  const [emailVerified, setEmailVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaRef = useRef(null);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  
  // Load reCAPTCHA script dynamically
  useEffect(() => {
    const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
    if (recaptchaSiteKey && !window.grecaptcha) {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.grecaptcha) {
          window.grecaptcha.ready(() => {
            setRecaptchaLoaded(true);
          });
        }
      };
      script.onerror = () => {
        console.warn('reCAPTCHA script failed to load');
        setRecaptchaLoaded(false);
      };
      document.head.appendChild(script);
    } else if (window.grecaptcha) {
      window.grecaptcha.ready(() => {
        setRecaptchaLoaded(true);
      });
    }
  }, []);
  
  // API hooks
  const [sendOTP, { isLoading: isSendingOTP }] = useSendOTPMutation();
  const [verifyOTP, { isLoading: isVerifyingOTP }] = useVerifyOTPMutation();
  const [submitBooking] = useSubmitBookingRequestMutation();
  const { data: performersData, isLoading: performersLoading } = useGetPerformersQuery(
    { page: 1, limit: 1000, search: debouncedPerformerSearch },
    {
      skip: !isOpen || (currentStep !== 1 && currentStep !== 2), // Always fetch when form is open on step 1 or 2
    }
  );

  // Debounce performer search
  useEffect(() => {
    if (performerSearchTimeoutRef.current) {
      clearTimeout(performerSearchTimeoutRef.current);
    }
    performerSearchTimeoutRef.current = setTimeout(() => {
      setDebouncedPerformerSearch(performerSearchQuery);
    }, 300);
    return () => {
      if (performerSearchTimeoutRef.current) {
        clearTimeout(performerSearchTimeoutRef.current);
      }
    };
  }, [performerSearchQuery]);

  // Accumulate performers as pages load
  useEffect(() => {
    // API returns { success: true, performers: [...], pagination: {...} }
    const performers = performersData?.performers || [];
    setAllPerformers(performers);
  }, [performersData]);

  // Ensure performerDuration is always a string (not an array) - run once on mount
  useEffect(() => {
    if (Array.isArray(formData.performerDuration)) {
      const firstValue = formData.performerDuration.length > 0 
        ? formData.performerDuration[0]
        : '';
      const stringValue = typeof firstValue === 'string' ? firstValue : String(firstValue || '');
      setFormData(prev => ({
        ...prev,
        performerDuration: stringValue
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Reset search when dropdown closes (but keep performers loaded)
  useEffect(() => {
    if (!performerDropdownOpen) {
      setPerformerSearchQuery('');
      setDebouncedPerformerSearch('');
      // Don't clear allPerformers - keep them loaded for next time dropdown opens
    }
  }, [performerDropdownOpen]);

  // If we ever re-enable scroll-based infinite loading, we can add a handler here.
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    textPhone: '',
    password: '',
    confirmPassword: '',
    // Combined Step 1 & 2 fields
    eventType: '',
    audienceAgeRange: '',
    performerDuration: [],
    minBudget: '',
    maxBudget: '',
    equipmentNeeded: [],
    bookingDate: '',
    bookingTime: '',
    planningProcess: '',
    // Step 2 fields (previously Step 3)
    eventAddress: '',
    eventCity: '',
    cityOrPostalCode: '',
    numberOfGuests: '',
    knowAddress: '',
    performerInfo: '',
    selectedPerformers: [],
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox' && name === 'equipmentNeeded') {
      setFormData(prev => {
        const currentEquipment = prev.equipmentNeeded || [];
        if (checked) {
          return {
            ...prev,
            [name]: [...currentEquipment, value]
          };
        } else {
          return {
            ...prev,
            [name]: currentEquipment.filter(item => item !== value)
          };
        }
      });
    } else if (type === 'radio' && name === 'performerDuration') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCustomDurationChange = (e) => {
    const value = e.target.value;
    setCustomDuration(value);
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        performerDuration: `custom-${value}`
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        performerDuration: ''
      }));
    }
  };

  // OTP/Email Verification functions
  const handleSendOTP = async () => {
    if (!formData.email) {
      toast.error('Please enter your email address');
      return;
    }
    
    try {
      const result = await sendOTP({ email: formData.email }).unwrap();
      if (result.success) {
        toast.success('Verification code sent to your email');
        setOtpSent(true);
      }
    } catch (error) {
      toast.error(error?.data?.error || 'Failed to send verification code');
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit code');
      return;
    }
    
    try {
      const result = await verifyOTP({ email: formData.email, otp }).unwrap();
      if (result.success) {
        toast.success('Email verified successfully');
        setEmailVerified(true);
        setCurrentStep(1);
      }
    } catch (error) {
      toast.error(error?.data?.error || 'Invalid verification code');
    }
  };

  const handleNext = () => {
    if (currentStep === 0 && !emailVerified) {
      toast.error('Please verify your email first');
      return;
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else if (currentStep === 1) {
      setCurrentStep(0);
    } else {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!emailVerified) {
      toast.error('Please verify your email first');
      return;
    }

    setIsSubmitting(true);

    // CAPTCHA VERIFICATION DISABLED - BYPASSED
    // // Get reCAPTCHA token
    // let captchaToken = null;
    // const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
    // 
    // if (recaptchaSiteKey && window.grecaptcha) {
    //   try {
    //     captchaToken = await new Promise((resolve, reject) => {
    //       const timeout = setTimeout(() => {
    //         reject(new Error('reCAPTCHA timeout'));
    //       }, 10000); // 10 second timeout
    //       
    //       if (window.grecaptcha.ready) {
    //         window.grecaptcha.ready(() => {
    //           window.grecaptcha.execute(recaptchaSiteKey, { action: 'submit' })
    //             .then((token) => {
    //               clearTimeout(timeout);
    //               resolve(token);
    //             })
    //             .catch((error) => {
    //               clearTimeout(timeout);
    //               reject(error);
    //             });
    //         });
    //       } else {
    //         clearTimeout(timeout);
    //         reject(new Error('reCAPTCHA not ready'));
    //       }
    //     });
    //   } catch (error) {
    //     console.error('reCAPTCHA error:', error);
    //     // In development, continue without captcha
    //     if (import.meta.env.DEV) {
    //       console.warn('Continuing without reCAPTCHA in development');
    //       captchaToken = null;
    //     } else {
    //       toast.error('reCAPTCHA verification failed. Please refresh and try again.');
    //       setIsSubmitting(false);
    //       return;
    //     }
    //   }
    // } else if (!recaptchaSiteKey) {
    //   console.warn('reCAPTCHA site key not configured - continuing without captcha');
    // }
    const captchaToken = null; // CAPTCHA DISABLED - always null

    try {
      // Combine bookingDate and bookingTime into bookingDateOrTime for backend
      const bookingDateOrTime = formData.bookingDate && formData.bookingTime 
        ? `${formData.bookingDate} ${formData.bookingTime}`
        : formData.bookingDate || formData.bookingTime || '';
      
      const submissionData = {
        ...formData,
        bookingDateOrTime,
        captchaToken,
      };
      
      const result = await submitBooking(submissionData).unwrap();
      if (result.success) {
        toast.success('Booking request submitted successfully!');
        onClose();
        // Reset form
        setCurrentStep(0);
        setEmailVerified(false);
        setOtpSent(false);
        setOtp('');
        setCustomDuration('');
        setFormData({
          name: '',
          email: '',
          phone: '',
          textPhone: '',
          password: '',
          confirmPassword: '',
          eventType: '',
          audienceAgeRange: '',
          performerDuration: '',
          minBudget: '',
          maxBudget: '',
          equipmentNeeded: [],
          bookingDate: '',
          bookingTime: '',
          planningProcess: '',
          eventAddress: '',
          eventCity: '',
          cityOrPostalCode: '',
          numberOfGuests: '',
          knowAddress: '',
          performerInfo: '',
          selectedPerformers: [],
        });
      }
    } catch (error) {
      toast.error(error?.data?.error || 'Failed to submit booking request');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        /* Select dropdown styling */
        select {
          color-scheme: dark;
        }
        
        select option {
          background-color: #000;
          color: #fff;
        }
        
        /* Date picker dropdown styling - Hide native icon and style dropdown */
        input[type="date"] {
          color-scheme: dark;
        }
        
        input[type="date"]::-webkit-calendar-picker-indicator {
          display: none !important;
          -webkit-appearance: none !important;
          appearance: none !important;
          width: 0;
          height: 0;
          opacity: 0;
          pointer-events: none;
        }
        
        /* Date picker dropdown background - Chrome/Edge */
        input[type="date"]::-webkit-datetime-edit {
          color: #1A1A1A;
        }
        
        /* Time picker dropdown styling - Hide native icon and style dropdown */
        input[type="time"] {
          color-scheme: dark;
        }
        
        input[type="time"]::-webkit-calendar-picker-indicator {
          display: none !important;
          -webkit-appearance: none !important;
          appearance: none !important;
          width: 0;
          height: 0;
          opacity: 0;
          pointer-events: none;
        }
        
        input[type="time"]::-webkit-datetime-edit-hour-field,
        input[type="time"]::-webkit-datetime-edit-minute-field,
        input[type="time"]::-webkit-datetime-edit-ampm-field {
          color: #1A1A1A;
        }
        
        /* Firefox - Hide native icons */
        input[type="time"]::-moz-calendar-picker-indicator {
          display: none !important;
        }
        
        input[type="date"]::-moz-calendar-picker-indicator {
          display: none !important;
        }
        
        /* Style the native date/time picker dropdowns with black background */
        input[type="date"]:focus,
        input[type="time"]:focus {
          color-scheme: dark;
        }
        
        /* Ensure the picker dropdown has dark background */
        input[type="date"]::-webkit-calendar-picker-indicator,
        input[type="time"]::-webkit-calendar-picker-indicator {
          color-scheme: dark;
        }
      `}</style>
      <div className="fixed inset-0 bg-black flex items-start justify-center z-50 overflow-y-auto pt-8 sm:pt-12 md:pt-16 pb-4 sm:pb-8">
      <div className="bg-black w-full max-w-6xl mx-2 sm:mx-4 rounded-lg relative p-4 sm:p-6 md:p-8 mt-4 sm:mt-8 md:mt-12">
        <button 
          onClick={onClose}
          className="absolute right-2 sm:right-4 top-2 sm:top-4 text-white/70 hover:text-white transition-colors z-10"
        >
          <X size={20} className="sm:w-6 sm:h-6" />
        </button>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
          <div className="flex items-center">
            <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full flex flex-col items-center justify-center transition-all ${
              currentStep >= 0 
                ? 'bg-[#FF00A2]' 
                : 'bg-[#2A2A2A]'
            }`}>
              <span className="text-white font-bold text-xs sm:text-sm md:text-base">1st</span>
              <span className="text-white text-[10px] sm:text-xs md:text-sm">STEP</span>
            </div>
            <div className={`w-8 sm:w-10 md:w-12 lg:w-16 h-[2px] ${
              currentStep >= 1 ? 'bg-[#FF00A2]' : 'bg-[#2A2A2A]'
            }`}></div>
          </div>
          
          <div className="flex items-center">
            <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full flex flex-col items-center justify-center transition-all ${
              currentStep >= 1 
                ? 'bg-[#FF00A2]' 
                : 'bg-[#2A2A2A]'
            }`}>
              <span className="text-white font-bold text-xs sm:text-sm md:text-base">2nd</span>
              <span className="text-white text-[10px] sm:text-xs md:text-sm">STEP</span>
            </div>
            <div className={`w-8 sm:w-10 md:w-12 lg:w-16 h-[2px] ${
              currentStep >= 2 ? 'bg-[#FF00A2]' : 'bg-[#2A2A2A]'
            }`}></div>
          </div>

          <div className="flex items-center">
            <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full flex flex-col items-center justify-center transition-all ${
              currentStep >= 2 
                ? 'bg-[#FF00A2]' 
                : 'bg-[#2A2A2A]'
            }`}>
              <span className="text-white font-bold text-xs sm:text-sm md:text-base">3rd</span>
              <span className="text-white text-[10px] sm:text-xs md:text-sm">STEP</span>
            </div>
          </div>
        </div>

        {/* Form Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-4 sm:mb-6 md:mb-8 px-2">
          {currentStep === 0 ? 'Email Verification' : currentStep === 1 ? 'Booking Form' : 'Book Performer Form'}
        </h2>

        {/* Email Verification Step */}
        {currentStep === 0 && (
          <div className="space-y-6 max-w-md mx-auto">
            <div className="space-y-4">
              <label className="block text-white font-bold text-xs sm:text-sm">
                Email Address
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="flex-1 bg-[#1A1A1A] border-2 border-[#FF00A2] rounded-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF00A2]"
                  required
                  disabled={emailVerified}
                />
                {!otpSent && !emailVerified && (
                  <button
                    type="button"
                    onClick={handleSendOTP}
                    disabled={isSendingOTP}
                    className="px-6 sm:px-8 py-2.5 sm:py-3 bg-[#FF00A2] text-white rounded-full hover:bg-[#FF00A2]/90 transition-colors font-semibold text-sm sm:text-base whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSendingOTP ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      'Send Code'
                    )}
                  </button>
                )}
              </div>
              
              {otpSent && !emailVerified && (
                <div className="space-y-4">
                  <label className="block text-white font-bold text-xs sm:text-sm">
                    Verification Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="Enter 6-digit code"
                      className="flex-1 bg-[#1A1A1A] border-2 border-[#FF00A2] rounded-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF00A2] text-center tracking-widest"
                      maxLength={6}
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOTP}
                      disabled={isVerifyingOTP}
                      className="px-6 sm:px-8 py-2.5 sm:py-3 bg-[#FF00A2] text-white rounded-full hover:bg-[#FF00A2]/90 transition-colors font-semibold text-sm sm:text-base whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isVerifyingOTP ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Verifying...</span>
                        </>
                      ) : (
                        'Verify'
                      )}
                    </button>
                  </div>
                  <p className="text-gray-400 text-xs text-center">
                    Check your email for the verification code
                  </p>
                  <button
                    type="button"
                    onClick={handleSendOTP}
                    disabled={isSendingOTP}
                    className="text-[#FF00A2] text-xs hover:underline w-full text-center disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSendingOTP ? (
                      <>
                        <div className="w-3 h-3 border-2 border-[#FF00A2] border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      'Resend Code'
                    )}
                  </button>
                </div>
              )}
              
              {emailVerified && (
                <div className="bg-green-500/20 border-2 border-green-500 rounded-lg p-4 text-center">
                  <p className="text-green-400 text-sm font-semibold">✓ Email Verified Successfully</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Step 2: Combined User Information + Event Details */}
          {currentStep === 1 && (
            <div className="space-y-4 sm:space-y-6">
              {/* User Information Section */}
              <div className="space-y-4 sm:space-y-6">
                {/* Row 1: Name and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label className="block font-['Space_Grotesk'] text-[14px] text-white/90">
                      Your Name<span className="text-[#FF00A2]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      className="w-full h-[40px] bg-white rounded-[8px] px-4 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] placeholder-[#1A1A1A]/50 focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-['Space_Grotesk'] text-[14px] text-white/90">
                      Your Phone Number<span className="text-[#FF00A2]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                      className="w-full h-[40px] bg-white rounded-[8px] px-4 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] placeholder-[#1A1A1A]/50 focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent"
                      required
                    />
                    <p className="text-gray-400 text-[12px]">
                      Accepting phone calls from providers will make the quoting & booking process faster and easier!
                    </p>
                  </div>
                </div>

                {/* Row 2: Email and Text Notifications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label className="block font-['Space_Grotesk'] text-[14px] text-white/90">
                      Your Email<span className="text-[#FF00A2]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email Address"
                      className="w-full h-[40px] bg-white rounded-[8px] px-4 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] placeholder-[#1A1A1A]/50 focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent"
                      required
                      disabled={emailVerified}
                    />
                    <p className="text-gray-400 text-[12px]">terms of service apply</p>
                  </div>

                  <div className="space-y-2">
                    <label className="block font-['Space_Grotesk'] text-[14px] text-white/90">
                      Receive Text Message Notifications? (Recommended)
                    </label>
                    <input
                      type="tel"
                      name="textPhone"
                      value={formData.textPhone}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                      className="w-full h-[40px] bg-white rounded-[8px] px-4 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] placeholder-[#1A1A1A]/50 focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent"
                    />
                    <p className="text-gray-400 text-[12px]">
                      Texts are sent when you receive a new quote, message, or booking confirmation. you can update your preferences at any time through your control panel.
                    </p>
                  </div>
                </div>

                {/* Row 3: Password Fields - Side by Side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label className="block font-['Space_Grotesk'] text-[14px] text-white/90">
                      Create A Login Password<span className="text-[#FF00A2]">*</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Type Passwords"
                      className="w-full h-[40px] bg-white rounded-[8px] px-4 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] placeholder-[#1A1A1A]/50 focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent"
                      required
                    />
                    <p className="text-gray-400 text-[12px]">Enter your password with %,5,a,A...</p>
                  </div>

                  <div className="space-y-2">
                    <label className="block font-['Space_Grotesk'] text-[14px] text-white/90">
                      Confirmation Password<span className="text-[#FF00A2]">*</span>
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Re-Type Passwords"
                      className="w-full h-[40px] bg-white rounded-[8px] px-4 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] placeholder-[#1A1A1A]/50 focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Event Details Section */}
              <div className="space-y-4 sm:space-y-6 pt-4 border-t border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Left Column */}
                  <div className="space-y-4 sm:space-y-6">
                    <div className="space-y-2">
                      <label className="block font-['Space_Grotesk'] text-[14px] text-white/90">
                        What Type Of Event Are You Planning?<span className="text-[#FF00A2]">*</span>
                      </label>
                      <select
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleInputChange}
                        className="w-full h-[40px] bg-white rounded-[8px] px-4 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23FF00A2' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 0.75rem center',
                        paddingRight: '2rem'
                      }}
                      required
                    >
                      <option value="">Please Select</option>
                      <option value="all-event">All event</option>
                      <option value="anniversary-party">Anniversary Party</option>
                      <option value="baby-shower">Baby Shower</option>
                      <option value="bachelor-party">Bachelor Party</option>
                      <option value="bachelorette-party">Bachelorette Party</option>
                      <option value="band-member-audition">Band Member Audition</option>
                      <option value="bar-bat-mitzvah-party">Bar/Bat Mitzvah Party</option>
                      <option value="birthday-adult">Birthday (Adult)</option>
                      <option value="birthday-child">Birthday (Child)</option>
                      <option value="birthday-teen">Birthday (Teen)</option>
                      <option value="bridal-shower">Bridal Shower</option>
                      <option value="camp-event">Camp Event</option>
                      <option value="campus-events">Campus Events</option>
                      <option value="casting-call">Casting call</option>
                      <option value="cocktail-party">Cocktail Party</option>
                      <option value="concert">Concert</option>
                      <option value="convention-trade-show">Convention/Trade Show</option>
                      <option value="corporate-event">Corporate Event</option>
                      <option value="cruise-ship-event">Cruise ship Event</option>
                      <option value="cultural-event">Cultural Event</option>
                      <option value="dinner-party">Dinner Party</option>
                      <option value="fair">Fair</option>
                      <option value="festival">Festival</option>
                      <option value="fundraiser">Fundraiser</option>
                      <option value="funeral-memorial-service">Funeral/Memorial Service</option>
                      <option value="graduation">Graduation</option>
                      <option value="grand-opening">Grand Opening</option>
                      <option value="holiday-party-christmas">Holiday Party (Christmas)</option>
                      <option value="holiday-party-easter">Holiday Party (Easter)</option>
                      <option value="holiday-party-halloween">Holiday Party (Halloween)</option>
                      <option value="holiday-party-new-year">Holiday Party (New Year)</option>
                      <option value="holiday-party-other">Holiday Party (Other)</option>
                      <option value="hours-party">Hours Party</option>
                      <option value="launch-party">Launch Party</option>
                      <option value="nightclub-party">Nightclub Party</option>
                      <option value="nonprofit-event">Nonprofit Event</option>
                      <option value="parade">Parade</option>
                      <option value="personal-occasion">Personal Occasion</option>
                      <option value="product-promotion">Product Promotion</option>
                      <option value="prom-after-prom">Prom/After Prom</option>
                      <option value="rehearsal-dinner">Rehearsal Dinner</option>
                      <option value="religious-celebration">Religious Celebration</option>
                      <option value="restaurant-bar-event">Restaurant /Bar Event</option>
                      <option value="retirement-community-event">Retirement Community Event</option>
                      <option value="retirement-party">Retirement Party</option>
                      <option value="reunion">Reunion</option>
                      <option value="school-assembly">School Assembly</option>
                      <option value="sporting-event">Sporting Event</option>
                      <option value="studio-session">Studio Session</option>
                      <option value="surprise">Surprise</option>
                      <option value="talent-competition">Talent Competition</option>
                      <option value="virtual-event">Virtual Event</option>
                      <option value="wedding-ceremony">Wedding Ceremony</option>
                      <option value="wedding-cocktail-hour">Wedding Cocktail Hour</option>
                      <option value="wedding-engagement">Wedding Engagement</option>
                      <option value="wedding-reception">Wedding Reception</option>
                      <option value="weekly-recurring-performance">Weekly/Recurring Performance</option>
                    </select>
                  </div>

                    <div className="space-y-2">
                      <label className="block font-['Space_Grotesk'] text-[14px] text-white/90">
                        Select Performers (Optional)
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setPerformerDropdownOpen(!performerDropdownOpen)}
                          className="w-full h-[40px] bg-white rounded-[8px] px-4 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent appearance-none cursor-pointer text-left flex items-center justify-between"
                        >
                          <span className={formData.selectedPerformers.length === 0 ? 'text-[#1A1A1A]/50' : 'text-[#1A1A1A]'}>
                            {formData.selectedPerformers.length === 0
                              ? 'Please Select Performers'
                              : formData.selectedPerformers.length === 1
                              ? (allPerformers.find(p => p._id === formData.selectedPerformers[0])?.fullDragName || 'Selected')
                              : `${formData.selectedPerformers.length} performers selected`}
                          </span>
                        <svg
                          className={`w-4 h-4 transition-transform ${performerDropdownOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {performerDropdownOpen && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setPerformerDropdownOpen(false)}
                          ></div>
                          <div className="absolute z-20 w-full mt-2 bg-black border-2 border-[#FF00A2] rounded-[8px] shadow-lg max-h-80 overflow-hidden flex flex-col">
                            {/* Search Input */}
                            <div className="p-3 border-b border-[#FF00A2]/30">
                              <input
                                type="text"
                                placeholder="Search performers..."
                                value={performerSearchQuery}
                                onChange={(e) => setPerformerSearchQuery(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                                className="w-full bg-white border border-[#FF00A2] rounded-[8px] px-3 py-2 text-[#1A1A1A] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#FF00A2]"
                              />
                            </div>
                            <div 
                              className="overflow-y-auto flex-1"
                              ref={performerDropdownRef}
                            >
                              <div className="p-3 sm:p-4 space-y-2.5 sm:space-y-3">
                                {performersLoading && performerPage === 1 ? (
                                  <div className="text-white text-center py-4">Loading performers...</div>
                                ) : allPerformers.length === 0 && !performersLoading ? (
                                  <div className="text-white text-center py-4">
                                    {debouncedPerformerSearch 
                                      ? `No performers match your search`
                                      : 'No performers available'}
                                  </div>
                                ) : (
                                  <>
                                    {allPerformers.map((performer) => (
                                  <label
                                    key={performer._id}
                                    className="flex items-center justify-between cursor-pointer hover:bg-gray-800 p-2 sm:p-2.5 rounded transition-colors group"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <div className="flex items-center gap-3 flex-1">
                                      <span className="text-white text-[14px]">{performer.fullDragName}</span>
                                    </div>
                                    <input
                                      type="checkbox"
                                      name="selectedPerformers"
                                      value={performer._id}
                                      checked={formData.selectedPerformers.includes(performer._id)}
                                      onChange={(e) => {
                                        const { checked, value } = e.target;
                                        setFormData(prev => {
                                          const current = prev.selectedPerformers || [];
                                          if (checked) {
                                            return { ...prev, selectedPerformers: [...current, value] };
                                          } else {
                                            return { ...prev, selectedPerformers: current.filter(id => id !== value) };
                                          }
                                        });
                                      }}
                                      className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white/80 rounded bg-transparent focus:ring-2 focus:ring-[#FF00A2] cursor-pointer appearance-none checked:bg-[#FF00A2] checked:border-[#FF00A2] relative flex-shrink-0 ml-3"
                                      style={{
                                        backgroundImage: formData.selectedPerformers.includes(performer._id)
                                          ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 16 16'%3E%3Cpath fill='white' d='M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z'/%3E%3C/svg%3E")`
                                          : 'none',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                        backgroundSize: '70%'
                                      }}
                                    />
                                  </label>
                                    ))}
                                    {performersLoading && performerPage > 1 && (
                                      <div className="text-gray-400 text-center py-2 text-sm">Loading more...</div>
                                    )}
                                    {performersData?.pagination?.hasMore && !performersLoading && (
                                      <div className="text-gray-400 text-center py-2 text-xs">
                                        Scroll down to load more
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                    <div className="space-y-2">
                      <label className="block font-['Space_Grotesk'] text-[14px] text-white/90">
                        What Is The Age Range Of The Audience?<span className="text-[#FF00A2]">*</span>
                      </label>
                      <select
                        name="audienceAgeRange"
                        value={formData.audienceAgeRange}
                        onChange={handleInputChange}
                        className="w-full h-[40px] bg-white rounded-[8px] px-4 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%231A1A1A' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 0.75rem center',
                          paddingRight: '2rem'
                        }}
                        required
                      >
                      <option value="">Please Select</option>
                      <option value="0-12">0-12 years</option>
                      <option value="13-17">13-17 years</option>
                      <option value="18-25">18-25 years</option>
                      <option value="26-35">26-35 years</option>
                      <option value="36-50">36-50 years</option>
                      <option value="50+">50+ years</option>
                      <option value="mixed">Mixed Ages</option>
                    </select>
                  </div>

                    <div className="space-y-2">
                      <label className="block font-['Space_Grotesk'] text-[14px] text-white/90">
                        How Long Performer Will Needed?
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setDurationDropdownOpen(!durationDropdownOpen)}
                          className="w-full h-[40px] bg-white rounded-[8px] px-4 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent appearance-none cursor-pointer text-left flex items-center justify-between"
                        >
                          <span className={!formData.performerDuration ? 'text-[#1A1A1A]/50' : 'text-[#1A1A1A]'}>
                          {!formData.performerDuration || (Array.isArray(formData.performerDuration) && formData.performerDuration.length === 0)
                            ? 'Please Select'
                            : typeof formData.performerDuration === 'string' && formData.performerDuration.startsWith('custom-')
                            ? formData.performerDuration.replace('custom-', '')
                            : typeof formData.performerDuration === 'string'
                            ? durationOptions.find(opt => opt.value === formData.performerDuration)?.label || 'Selected'
                            : 'Please Select'}
                        </span>
                        <svg
                          className={`w-4 h-4 transition-transform ${durationDropdownOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {durationDropdownOpen && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setDurationDropdownOpen(false)}
                          ></div>
                          <div className="absolute z-20 w-full mt-2 bg-black border-2 border-[#FF00A2] rounded-[8px] shadow-lg max-h-80 overflow-y-auto">
                            <div className="p-3 sm:p-4 space-y-2.5 sm:space-y-3">
                              {durationOptions.map((duration) => (
                                <label
                                  key={duration.value}
                                  className="flex items-center justify-between cursor-pointer hover:bg-gray-800 p-2 sm:p-2.5 rounded transition-colors group"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setFormData(prev => ({
                                      ...prev,
                                      performerDuration: typeof prev.performerDuration === 'string' ? duration.value : duration.value
                                    }));
                                    setCustomDuration('');
                                    setDurationDropdownOpen(false);
                                  }}
                                >
                                  <span className="text-white text-[14px] flex-1">{duration.label}</span>
                                  <input
                                    type="radio"
                                    name="performerDuration"
                                    value={duration.value}
                                    checked={formData.performerDuration === duration.value}
                                    onChange={handleInputChange}
                                    className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white/80 rounded-full bg-transparent focus:ring-2 focus:ring-[#FF00A2] cursor-pointer appearance-none checked:bg-[#FF00A2] checked:border-[#FF00A2] relative flex-shrink-0 ml-3"
                                    style={{
                                      backgroundImage: typeof formData.performerDuration === 'string' && formData.performerDuration === duration.value
                                        ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Ccircle cx='4' cy='4' r='3' fill='white'/%3E%3C/svg%3E")`
                                        : 'none',
                                      backgroundRepeat: 'no-repeat',
                                      backgroundPosition: 'center',
                                      backgroundSize: '50%'
                                    }}
                                  />
                                </label>
                              ))}
                              <div className="pt-2 border-t border-gray-700">
                                <label 
                                  className="flex items-center justify-between cursor-pointer hover:bg-gray-800 p-2 sm:p-2.5 rounded transition-colors group mb-2"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (customDuration.trim()) {
                                      setFormData(prev => ({
                                        ...prev,
                                        performerDuration: `custom-${customDuration}`
                                      }));
                                    }
                                  }}
                                >
                                  <span className="text-white text-[14px] flex-1">Custom Duration</span>
                                  <input
                                    type="radio"
                                    name="performerDuration"
                                    value="custom"
                                    checked={formData.performerDuration.startsWith('custom-')}
                                    onChange={(e) => {
                                      if (customDuration.trim()) {
                                        setFormData(prev => ({
                                          ...prev,
                                          performerDuration: `custom-${customDuration}`
                                        }));
                                      }
                                    }}
                                    className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white/80 rounded-full bg-transparent focus:ring-2 focus:ring-[#FF00A2] cursor-pointer appearance-none checked:bg-[#FF00A2] checked:border-[#FF00A2] relative flex-shrink-0 ml-3"
                                    style={{
                                      backgroundImage: formData.performerDuration.startsWith('custom-')
                                        ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Ccircle cx='4' cy='4' r='3' fill='white'/%3E%3C/svg%3E")`
                                        : 'none',
                                      backgroundRepeat: 'no-repeat',
                                      backgroundPosition: 'center',
                                      backgroundSize: '50%'
                                    }}
                                  />
                                </label>
                                <input
                                  type="text"
                                  value={customDuration}
                                  onChange={handleCustomDurationChange}
                                  placeholder="type.."
                                  className="w-full h-[40px] bg-white border-2 border-[#FF00A2] rounded-[8px] px-4 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] placeholder-[#1A1A1A]/50 focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (typeof formData.performerDuration !== 'string' || !formData.performerDuration.startsWith('custom-')) {
                                      setFormData(prev => ({
                                        ...prev,
                                        performerDuration: customDuration.trim() ? `custom-${customDuration}` : ''
                                      }));
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4 sm:space-y-6">
                    <div className="space-y-2">
                      <label className="block font-['Space_Grotesk'] text-[14px] text-white/90">
                        What Equipment Will You Need The Performer To Provide?
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setEquipmentDropdownOpen(!equipmentDropdownOpen)}
                          className="w-full h-[40px] bg-white rounded-[8px] px-4 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent appearance-none cursor-pointer text-left flex items-center justify-between"
                        >
                          <span className={formData.equipmentNeeded.length === 0 ? 'text-[#1A1A1A]/50' : 'text-[#1A1A1A]'}>
                          {formData.equipmentNeeded.length === 0
                            ? 'Please Select'
                            : formData.equipmentNeeded.length === 1
                            ? equipmentOptions.find(eq => eq.value === formData.equipmentNeeded[0])?.label || 'Selected'
                            : `${formData.equipmentNeeded.length} items selected`}
                        </span>
                        <svg
                          className={`w-4 h-4 transition-transform ${equipmentDropdownOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {equipmentDropdownOpen && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setEquipmentDropdownOpen(false)}
                          ></div>
                          <div className="absolute z-20 w-full mt-2 bg-black border-2 border-[#FF00A2] rounded-[8px] shadow-lg max-h-80 overflow-y-auto">
                            <div className="p-3 sm:p-4 space-y-2.5 sm:space-y-3">
                              {equipmentOptions.map((equipment) => (
                                <label
                                  key={equipment.value}
                                  className="flex items-center justify-between cursor-pointer hover:bg-gray-800 p-2 sm:p-2.5 rounded transition-colors group"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <span className="text-white text-[14px] flex-1">{equipment.label}</span>
                                  <input
                                    type="checkbox"
                                    name="equipmentNeeded"
                                    value={equipment.value}
                                    checked={formData.equipmentNeeded.includes(equipment.value)}
                                    onChange={handleInputChange}
                                    className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white/80 rounded bg-transparent focus:ring-2 focus:ring-[#FF00A2] cursor-pointer appearance-none checked:bg-[#FF00A2] checked:border-[#FF00A2] relative flex-shrink-0 ml-3"
                                    style={{
                                      backgroundImage: formData.equipmentNeeded.includes(equipment.value)
                                        ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 16 16'%3E%3Cpath fill='white' d='M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z'/%3E%3C/svg%3E")`
                                        : 'none',
                                      backgroundRepeat: 'no-repeat',
                                      backgroundPosition: 'center',
                                      backgroundSize: '70%'
                                    }}
                                  />
                                </label>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                    <div className="space-y-2">
                      <label className="block font-['Space_Grotesk'] text-[14px] text-white/90">
                        Booking Date Or Time For Performer<span className="text-[#FF00A2]">*</span>
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                          <input
                            type="date"
                            name="bookingDate"
                            value={formData.bookingDate}
                            onChange={handleInputChange}
                            className="w-full h-[40px] bg-white rounded-[8px] px-4 pr-10 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent"
                            style={{
                              colorScheme: 'dark'
                            }}
                            required
                          />
                          <div 
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 cursor-pointer z-10"
                            onClick={(e) => {
                              e.stopPropagation();
                              const input = e.currentTarget.previousElementSibling;
                              if (input && typeof input.showPicker === 'function') {
                                input.showPicker();
                              } else {
                                input?.click();
                              }
                            }}
                          >
                            <svg
                              className="w-4 h-4 text-black"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                        <div className="relative">
                          <input
                            type="time"
                            name="bookingTime"
                            value={formData.bookingTime}
                            onChange={handleInputChange}
                            className="w-full h-[40px] bg-white rounded-[8px] px-4 pr-10 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent"
                            style={{
                              colorScheme: 'dark'
                            }}
                            required
                          />
                          <div 
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 cursor-pointer z-10"
                            onClick={(e) => {
                              e.stopPropagation();
                              const input = e.currentTarget.previousElementSibling;
                              if (input && typeof input.showPicker === 'function') {
                                input.showPicker();
                              } else {
                                input?.click();
                              }
                            }}
                          >
                            <svg
                              className="w-4 h-4 text-black"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block font-['Space_Grotesk'] text-[14px] text-white/90">
                        Where Are You In The Planning Process?<span className="text-[#FF00A2]">*</span>
                      </label>
                      <select
                        name="planningProcess"
                        value={formData.planningProcess}
                        onChange={handleInputChange}
                        className="w-full h-[40px] bg-white rounded-[8px] px-4 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%231A1A1A' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 0.75rem center',
                          paddingRight: '2rem'
                        }}
                        required
                      >
                      <option value="">Please Select</option>
                      <option value="ready-to-book-asap">I'm ready to book someone ASAP</option>
                      <option value="plan-to-book-soon">I Plan to book soon, but need to speak to providers</option>
                      <option value="just-started-planning">I just started planning and I need pricing</option>
                      <option value="just-researching">I'm just researching various options</option>
                    </select>
                  </div>
                </div>
                </div>

                {/* Budget Range Section */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="space-y-2">
                    <label className="block font-['Space_Grotesk'] text-[14px] text-white/90">
                      What Is Your Budget Range?
                    </label>
                    <p className="text-gray-400 text-[12px]">
                      A minimum budget influences the quality of service you receive and max budget communicates the highest amount you're willing to pay. both fields are optional.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#1A1A1A] text-[14px]">$</span>
                        <input
                          type="text"
                          name="minBudget"
                          value={formData.minBudget}
                          onChange={handleInputChange}
                          placeholder=""
                          className="w-full h-[40px] bg-white rounded-[8px] px-4 pl-7 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] placeholder-[#1A1A1A]/50 focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#1A1A1A] text-[14px]">$</span>
                        <input
                          type="text"
                          name="maxBudget"
                          value={formData.maxBudget}
                          onChange={handleInputChange}
                          placeholder=""
                          className="w-full h-[40px] bg-white rounded-[8px] px-4 pl-7 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] placeholder-[#1A1A1A]/50 focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* End of Step 1: Combined User Information + Event Details */}

          {/* Step 3: Event Location and Details */}
          {currentStep === 2 && (
            <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-6 md:mt-8">
              {/* Section 1: Where Is Your Event Being Held? */}
              <div className="space-y-3 sm:space-y-4">
                <label className="block font-['Space_Grotesk'] text-[14px] text-white/90">
                  Where Is Your Event Being Held?
                </label>
                
                {/* Row 1: Event Address and City */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label className="block font-['Space_Grotesk'] text-[14px] text-white/90">
                      Event address or venue name<span className="text-[#FF00A2]">*</span>
                    </label>
                    <input
                      type="text"
                      name="eventAddress"
                      value={formData.eventAddress}
                      onChange={handleInputChange}
                      placeholder="Address or venue name"
                      className="w-full h-[40px] bg-white rounded-[8px] px-4 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] placeholder-[#1A1A1A]/50 focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-['Space_Grotesk'] text-[14px] text-white/90">
                      Event city<span className="text-[#FF00A2]">*</span>
                    </label>
                    <input
                      type="text"
                      name="eventCity"
                      value={formData.eventCity}
                      onChange={handleInputChange}
                      placeholder="Event city"
                      className="w-full h-[40px] bg-white rounded-[8px] px-4 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] placeholder-[#1A1A1A]/50 focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Row 2: City/Postal Code and Guest Count */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label className="block font-['Space_Grotesk'] text-[14px] text-white/90">
                      City or Postal Code<span className="text-[#FF00A2]">*</span>
                    </label>
                    <input
                      type="text"
                      name="cityOrPostalCode"
                      value={formData.cityOrPostalCode}
                      onChange={handleInputChange}
                      placeholder="City or Postal Code"
                      className="w-full h-[40px] bg-white rounded-[8px] px-4 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] placeholder-[#1A1A1A]/50 focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-['Space_Grotesk'] text-[14px] text-white/90">
                      How Many Guest Are You Expecting At Event? (Approximate)<span className="text-[#FF00A2]">*</span>
                    </label>
                    <input
                      type="text"
                      name="numberOfGuests"
                      value={formData.numberOfGuests}
                      onChange={handleInputChange}
                      placeholder="Number of Guests"
                      className="w-full h-[40px] bg-white rounded-[8px] px-4 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] placeholder-[#1A1A1A]/50 focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Do You Know The Address/Venue Name For Event? */}
              <div className="space-y-3 sm:space-y-4">
                <label className="block font-['Space_Grotesk'] text-[14px] text-white/90">
                  Do You Know The Address/Venue Name For Event?<span className="text-[#FF00A2]">*</span>
                </label>
                <p className="text-gray-400 text-[12px]">
                  Providing an exact address or venue will help providers send you more accurate quotes.
                </p>
                <select
                  name="knowAddress"
                  value={formData.knowAddress}
                  onChange={handleInputChange}
                  className="w-full h-[40px] bg-white rounded-[8px] px-4 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%231A1A1A' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    paddingRight: '2rem'
                  }}
                  required
                >
                  <option value="">Please Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="partial">Partially</option>
                </select>
              </div>

              {/* Section 3: What Should Performer Needed To Know About The Event? */}
              <div className="space-y-3 sm:space-y-4">
                <label className="block font-['Space_Grotesk'] text-[14px] text-white/90">
                  What Should Performer Needed To Know About The Event?
                </label>
                <p className="text-gray-400 text-[12px]">
                  Include things like special requests, your budget, venue requirements, or other unique aspects of your event.
                </p>
                <textarea
                  name="performerInfo"
                  value={formData.performerInfo}
                  onChange={handleInputChange}
                  placeholder="Anything you need to let the performer know...."
                  rows="5"
                  className="w-full bg-white rounded-[8px] px-4 py-3 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] placeholder-[#1A1A1A]/50 focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent resize-none"
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex justify-center sm:justify-end order-2 sm:order-1">
                <button
                  type="button"
                  onClick={handleBack}
                  className="w-full sm:w-auto px-8 sm:px-12 md:px-16 lg:px-20 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-[#FF00A2] text-[#FF00A2] bg-black rounded-full sm:rounded-l-full sm:rounded-r-none hover:bg-[#FF00A2] hover:text-white transition-colors font-semibold"
                >
                  Back
                </button>
              </div>
              <div className="flex justify-center sm:justify-start order-1 sm:order-2">
                {currentStep === 0 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!emailVerified}
                    className="w-full sm:w-auto px-8 sm:px-12 md:px-16 lg:px-20 py-2.5 sm:py-3 text-sm sm:text-base bg-[#FF00A2] text-white rounded-full sm:rounded-r-full sm:rounded-l-none hover:bg-[#FF00A2]/90 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                ) : currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full sm:w-auto px-8 sm:px-12 md:px-16 lg:px-20 py-2.5 sm:py-3 text-sm sm:text-base bg-[#FF00A2] text-white rounded-full sm:rounded-r-full sm:rounded-l-none hover:bg-[#FF00A2]/90 transition-colors font-semibold"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 sm:px-12 md:px-16 lg:px-20 py-2.5 sm:py-3 text-sm sm:text-base bg-[#FF00A2] text-white rounded-full sm:rounded-r-full sm:rounded-l-none hover:bg-[#FF00A2]/90 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default BookingForm;
