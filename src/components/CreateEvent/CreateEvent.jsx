import React, { useState } from 'react';
import Input from '../../common/Input';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    eventHost: '',
    eventType: '',
    soundEquipment: '',
    outdoorVenue: '',
    eventTitle: '',
    eventTheme: '',
    audienceType: '',
    eventStartTime: '',
    eventEndTime: '',
    hostCount: '',
    performerCount: '',
    callTime: '',
    dressingArea: '',
    musicRequirements: '',
    specialRequests: '',
    performerName: '',
    hostBudget: '',
    performerBudget: '',
    otherBudget: '',
    totalBudget: '',
    isPublicEvent: true,
    performerEquipment: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen text-white py-12 px-4 md:px-8">
      <form className="max-w-7xl mx-auto space-y-8">
        {/* Event Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Event Name */}
          <div>
            <label className="block font-['Space_Grotesk'] text-[14px] text-white/90 mb-2">
              Event Name<span className="text-[#FF00A2]">*</span>
            </label>
            <input
              type="text"
              name="eventName"
              value={formData.eventName}
              onChange={handleInputChange}
              placeholder="Event Name..."
              required
              className="w-full h-[40px] bg-white rounded-[8px] px-4 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] placeholder-[#1A1A1A]/50 focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent"
            />
          </div>

          {/* Event Host */}
          <div>
            <label className="block font-['Space_Grotesk'] text-[14px] text-white/90 mb-2">
              Event Host<span className="text-[#FF00A2]">*</span>
            </label>
            <input
              type="text"
              name="eventHost"
              value={formData.eventHost}
              onChange={handleInputChange}
              placeholder="Event Host Name..."
              required
              className="w-full h-[40px] bg-white rounded-[8px] px-4 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] placeholder-[#1A1A1A]/50 focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent"
            />
          </div>

          {/* Event Type - Full Width */}
          <div className="md:col-span-2">
            <label className="block font-['Space_Grotesk'] text-[14px] text-white/90 mb-2">
              Event Type<span className="text-[#FF00A2]">*</span>
            </label>
            <div className="relative">
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleInputChange}
                className="w-full h-[40px] bg-white rounded-[8px] px-4 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] appearance-none cursor-pointer"
              >
                <option value="">Drag show</option>
                <option value="drag-brunch">Drag Brunch</option>
                <option value="drag-bingo">Drag Bingo</option>
                <option value="drag-trivia">Drag Trivia</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <svg
                  className="h-5 w-5 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Sound Equipment */}
          <div>
            <label className="block font-['Space_Grotesk'] text-[14px] text-white/90 mb-2 h-[60px] flex items-end">
              Does the venue have sound equipment for music/microphone,DJ, etc?
            </label>
            <input
              type="text"
              name="soundEquipment"
              value={formData.soundEquipment}
              onChange={handleInputChange}
              placeholder="Type..."
              className="w-full h-[40px] bg-white rounded-[8px] px-4 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] placeholder-[#1A1A1A]/50 focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent"
            />
          </div>

          {/* Outdoor Venue */}
          <div>
            <label className="block font-['Space_Grotesk'] text-[14px] text-white/90 mb-2 h-[60px] flex items-end">
              If an Outdoor venue, are there awnings/coverings to account for
              inclement weather conditions?
            </label>
            <input
              type="text"
              name="outdoorVenue"
              value={formData.outdoorVenue}
              onChange={handleInputChange}
              placeholder="Type..."
              className="w-full h-[40px] bg-white rounded-[8px] px-4 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] placeholder-[#1A1A1A]/50 focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent"
            />
          </div>

          {/* Event Title */}
          <div>
            <label className="block font-['Space_Grotesk'] text-[14px] text-white/90 mb-2">
              Event Title
            </label>
            <input
              type="text"
              name="eventTitle"
              value={formData.eventTitle}
              onChange={handleInputChange}
              placeholder="Event Title..."
              className="w-full h-[40px] bg-white rounded-[8px] px-4 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] placeholder-[#1A1A1A]/50 focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent"
            />
          </div>

          {/* Event Theme */}
          <div>
            <label className="block font-['Space_Grotesk'] text-[14px] text-white/90 mb-2">
              Event Theme
            </label>
            <input
              type="text"
              name="eventTheme"
              value={formData.eventTheme}
              onChange={handleInputChange}
              placeholder="Event Theme..."
              className="w-full h-[40px] bg-white rounded-[8px] px-4 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] placeholder-[#1A1A1A]/50 focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent"
            />
          </div>

          {/* Performer Equipment */}
          {/* Audience Type */}
          <div>
            <label className="block font-['Space_Grotesk'] text-[14px] text-white/90 mb-2 h-[60px] flex items-end">
              Audience Type<span className="text-[#FF00A2]">*</span>
            </label>
            <div className="relative">
              <select
                name="audienceType"
                value={formData.audienceType}
                onChange={handleInputChange}
                className="w-full h-[40px] bg-white rounded-[8px] px-4 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] appearance-none cursor-pointer"
              >
                <option value="adults">Adults</option>
                <option value="all-ages">All Ages</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <svg
                  className="h-5 w-5 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block font-['Space_Grotesk'] text-[14px] text-white/90 mb-2 h-[60px] flex items-end">
              Is the Performer responsible for supplying any equipment (i.e.
              Audio/Visual, microphones, games, bingo cards/setup, etc.)?
            </label>
            <input
              type="text"
              name="performerEquipment"
              value={formData.performerEquipment}
              onChange={handleInputChange}
              placeholder="Type..."
              className="w-full h-[40px] bg-white rounded-[8px] px-4 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] placeholder-[#1A1A1A]/50 focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent"
            />
          </div>

          {/* Event Start Time */}
          <div>
            <label className="block font-['Space_Grotesk'] text-[14px] text-white/90 mb-2">
              Event Start Time
            </label>
            <input
              type="time"
              name="eventStartTime"
              value={formData.eventStartTime}
              onChange={handleInputChange}
              className="w-full h-[40px] bg-white rounded-[8px] px-4 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent"
            />
          </div>

          {/* Event End Time */}
          <div>
            <label className="block font-['Space_Grotesk'] text-[14px] text-white/90 mb-2">
              Event End Time
            </label>
            <input
              type="time"
              name="eventEndTime"
              value={formData.eventEndTime}
              onChange={handleInputChange}
              className="w-full h-[40px] bg-white rounded-[8px] px-4 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent"
            />
          </div>

          {/* Host Count */}
          <div>
            <label className="block font-['Space_Grotesk'] text-[14px] text-white/90 mb-2">
              How many hosts/co-hosts?
            </label>
            <input
              type="number"
              name="hostCount"
              value={formData.hostCount}
              onChange={handleInputChange}
              placeholder="0"
              className="w-full h-[40px] bg-white rounded-[8px] px-4 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] placeholder-[#1A1A1A]/50 focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent"
            />
          </div>

          {/* Performer Count */}
          <div>
            <label className="block font-['Space_Grotesk'] text-[14px] text-white/90 mb-2">
              How many Performers (incl. host) will be part of the event?
            </label>
            <input
              type="number"
              name="performerCount"
              value={formData.performerCount}
              onChange={handleInputChange}
              placeholder="0"
              className="w-full h-[40px] bg-white rounded-[8px] px-4 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] placeholder-[#1A1A1A]/50 focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent"
            />
          </div>

          {/* Call Time */}
          <div>
            <label className="block font-['Space_Grotesk'] text-[14px] text-white/90 mb-2">
              Event Call Time (The time performers/staff need to be at the
              venue)
            </label>
            <input
              type="time"
              name="callTime"
              value={formData.callTime}
              onChange={handleInputChange}
              className="w-full h-[40px] bg-white rounded-[8px] px-4 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent"
            />
          </div>

          {/* Performer Numbers */}
          <div>
            <label className="block font-['Space_Grotesk'] text-[14px] text-white/90 mb-2">
              How Many numbers will the performer/each performer have?
            </label>
            <input
              type="number"
              name="performerNumbers"
              value={formData.performerNumbers}
              onChange={handleInputChange}
              placeholder="0"
              className="w-full h-[40px] bg-white rounded-[8px] px-4 font-['Space_Grotesk'] text-[#1A1A1A] text-[14px] placeholder-[#1A1A1A]/50 focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent"
            />
          </div>

          {/* Dressing Area */}
          <div>
            <label className="block font-['Space_Grotesk'] text-[14px] text-white/90 mb-2">
              Is there a Private Dressing area to allow for the performers to
              change costumes?
            </label>
            <div className="relative">
              <select
                name="dressingArea"
                value={formData.dressingArea}
                onChange={handleInputChange}
                className="w-full h-[40px] bg-white rounded-[8px] px-4 font-space-grotesk text-[#1A1A1A] text-[14px] appearance-none cursor-pointer"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <svg
                  className="h-5 w-5 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Music Requirements */}
          <div>
            <label className="block font-space-grotesk text-[14px] text-white/90 mb-2">
              What does the venue need to provide the music/and needed by the
              performer?
            </label>
            <input
              type="text"
              name="musicRequirements"
              value={formData.musicRequirements}
              onChange={handleInputChange}
              placeholder="Type..."
              className="w-full h-[40px] bg-white rounded-[8px] px-4 font-space-grotesk text-[#1A1A1A] text-[14px] placeholder-[#1A1A1A]/50 focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent"
            />
          </div>
        </div>

        {/* Special Requests */}
        <div className="mt-8">
          <label className="block font-space-grotesk text-[14px] text-white/90 mb-2">
            Any special Requests for the performer?
          </label>
          <textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleInputChange}
            placeholder="Type..."
            className="w-full h-[120px] bg-white rounded-[8px] px-4 py-3 
      font-space-grotesk text-[#1A1A1A] text-[14px] placeholder-[#1A1A1A]/50
      focus:outline-none focus:ring-2 focus:ring-[#FF00A2] focus:border-transparent"
          />
        </div>

        <div className="max-w-7xl mx-auto flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <div className="w-[105px] h-[6px] bg-pink-500 rounded-[10px]"></div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="font-space-grotesk text-[32px] leading-[40px] mb-8">
            BOOK PERFORMER
          </h2>

          <div className="space-y-6">
            {/* Select Performer */}
            <div>
              <label className="block font-space-grotesk text-[14px] text-white/90 mb-2">
                Select Performer
              </label>
              <div className="relative">
                <select
                  name="performerName"
                  value={formData.performerName}
                  onChange={handleInputChange}
                  className="w-full h-[40px] bg-white rounded-[8px] px-4 
            font-space-grotesk text-[#1A1A1A] text-[14px]
            appearance-none cursor-pointer"
                >
                  <option value="">Performer name</option>
                  {/* Add performer options here */}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                  <svg
                    className="h-5 w-5 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Budget Section - Two Columns */}
            <div className="grid grid-cols-2 gap-x-8">
              {/* Left Column */}
              <div>
                <label className="block font-space-grotesk text-[14px] text-white/90 mb-2">
                  Host Budget
                </label>
                <input
                  type="text"
                  name="hostBudget"
                  placeholder="Amount"
                  className="w-full h-[40px] bg-white rounded-[8px] px-4 
            font-space-grotesk text-[#1A1A1A] text-[14px]"
                />
              </div>

              {/* Right Column */}
              <div>
                <label className="block font-space-grotesk text-[14px] text-white/90 mb-2">
                  Performer Budget
                </label>
                <input
                  type="text"
                  name="performerBudget"
                  placeholder="Amount"
                  className="w-full h-[40px] bg-white rounded-[8px] px-4 
            font-space-grotesk text-[#1A1A1A] text-[14px]"
                />
              </div>
            </div>

            {/* Second Row of Budget Fields */}
            <div className="grid grid-cols-2 gap-x-8">
              <div>
                <label className="block font-space-grotesk text-[14px] text-white/90 mb-2">
                  Other staff budget, if any
                </label>
                <input
                  type="text"
                  name="otherBudget"
                  placeholder="Amount"
                  className="w-full h-[40px] bg-white rounded-[8px] px-4 
            font-space-grotesk text-[#1A1A1A] text-[14px]"
                />
              </div>

              <div>
                <label className="block font-space-grotesk text-[14px] text-white/90 mb-2">
                  Total Event Budget
                </label>
                <input
                  type="text"
                  name="totalBudget"
                  placeholder="Amount"
                  className="w-full h-[40px] bg-white rounded-[8px] px-4 
            font-space-grotesk text-[#1A1A1A] text-[14px]"
                />
              </div>
            </div>

            {/* Radio Buttons */}
            <div className="flex items-center gap-6 mt-8">
              <label className="flex items-center gap-2 cursor-pointer">
                <div className="relative flex items-center">
                  <input
                    type="radio"
                    name="isPublicEvent"
                    checked={formData.isPublicEvent}
                    onChange={() =>
                      setFormData((prev) => ({ ...prev, isPublicEvent: true }))
                    }
                    className="appearance-none w-4 h-4 border border-white/60 rounded-sm
          checked:bg-[#FF00A2] checked:border-[#FF00A2]
          focus:outline-none focus:ring-0 cursor-pointer"
                  />
                  {formData.isPublicEvent && (
                    <svg
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 text-white pointer-events-none"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 3L4.5 8.5L2 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span className="font-space-grotesk text-[14px] text-white">
                  Public event*
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <div className="relative flex items-center">
                  <input
                    type="radio"
                    name="isPublicEvent"
                    checked={!formData.isPublicEvent}
                    onChange={() =>
                      setFormData((prev) => ({ ...prev, isPublicEvent: false }))
                    }
                    className="appearance-none w-4 h-4 border border-white/60 rounded-sm
          checked:bg-[#FF00A2] checked:border-[#FF00A2]
          focus:outline-none focus:ring-0 cursor-pointer"
                  />
                  {!formData.isPublicEvent && (
                    <svg
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 text-white pointer-events-none"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 3L4.5 8.5L2 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span className="font-space-grotesk text-[14px] text-white/60">
                  Private event*
                </span>
              </label>
            </div>

            {/* Disclaimer Text */}
            <p className="font-space-grotesk text-[14px] text-white/90 mt-6">
              The Venue is responsible for paying all performers at the time of
              performance or terms agreed to with performers.
            </p>

            <p className="font-space-grotesk text-[14px] text-white/90 mt-4 max-w-[1000px]">
              For private bookings, please provide a clear overview of the event
              expectations so that the performers can adequately prepare and
              deliver a high-quality performance tailored to the audience. Key
              details, such as the audience's age, identity, and other relevant
              factors, should be communicated to the performer to ensure the
              performance aligns with your vision
            </p>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-8">
              <button
                type="button"
                className="px-8 py-3 rounded-full border border-[#FF00A2] text-[#FF00A2] 
          font-space-grotesk text-[14px] hover:bg-[#FF00A2] hover:text-white transition-colors"
              >
                Save Event for Later
              </button>
              <button
                type="submit"
                className="px-8 py-3 rounded-full bg-[#FF00A2] text-white 
          font-space-grotesk text-[14px] hover:bg-[#FF00A2]/90 transition-colors"
              >
                Submit Event
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;