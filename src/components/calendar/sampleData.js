// Sample data structure to show BE developer the expected response format
export const sampleCalendarData = {
  success: true,
  eventDates: {
    "2025-05": {
      "12": {
        events: 2,
        eventDetails: [
          {
            _id: "6815312faf9b9ba0b7cb556d",
            title: "Morning Concert",
            host: "John Doe",
            type: "music-concert",
            startTime: "2025-05-12T09:00:00.000Z",
            endTime: "2025-05-12T10:30:00.000Z",
            startDate: "2025-05-12T00:00:00.000Z",
            image: "https://example.com/image1.jpg",
            description: "Morning concert event",
            isPrivate: false,
            status: "approved"
          },
          {
            _id: "6815312faf9b9ba0b7cb556e",
            title: "Evening Show",
            host: "John Doe",
            type: "drag-show",
            startTime: "2025-05-12T19:00:00.000Z",
            endTime: "2025-05-12T21:00:00.000Z",
            startDate: "2025-05-12T00:00:00.000Z",
            image: "https://example.com/image2.jpg",
            description: "Evening drag show",
            isPrivate: false,
            status: "approved"
          }
        ]
      },
      "13": {
        events: 1,
        eventDetails: [
          {
            _id: "6815c2774030df4e3f829489",
            title: "Afternoon Workshop",
            host: "Jane Smith",
            type: "workshop",
            startTime: "2025-05-13T14:00:00.000Z",
            endTime: "2025-05-13T16:30:00.000Z",
            startDate: "2025-05-13T00:00:00.000Z",
            image: "https://example.com/image3.jpg",
            description: "Performance workshop",
            isPrivate: false,
            status: "approved"
          }
        ]
      },
      "14": {
        events: 3,
        eventDetails: [
          {
            _id: "6815c2774030df4e3f829490",
            title: "Morning Practice",
            host: "Mike Johnson",
            type: "practice",
            startTime: "2025-05-14T10:00:00.000Z",
            endTime: "2025-05-14T12:00:00.000Z",
            startDate: "2025-05-14T00:00:00.000Z",
            image: "https://example.com/image4.jpg",
            description: "Morning practice session",
            isPrivate: false,
            status: "approved"
          },
          {
            _id: "6815c2774030df4e3f829491",
            title: "Afternoon Meeting",
            host: "Sarah Wilson",
            type: "meeting",
            startTime: "2025-05-14T14:00:00.000Z",
            endTime: "2025-05-14T15:00:00.000Z",
            startDate: "2025-05-14T00:00:00.000Z",
            image: "https://example.com/image5.jpg",
            description: "Team meeting",
            isPrivate: false,
            status: "approved"
          },
          {
            _id: "6815c2774030df4e3f829492",
            title: "Evening Performance",
            host: "Mike Johnson",
            type: "performance",
            startTime: "2025-05-14T19:00:00.000Z",
            endTime: "2025-05-14T21:00:00.000Z",
            startDate: "2025-05-14T00:00:00.000Z",
            image: "https://example.com/image6.jpg",
            description: "Evening performance",
            isPrivate: false,
            status: "approved"
          }
        ]
      },
      "15": {
        events: 1,
        eventDetails: [
          {
            _id: "68153370af9b9ba0b7cb55d6",
            title: "All Day Event",
            host: "Sarah Wilson",
            type: "festival",
            startTime: "2025-05-15T00:00:00.000Z",
            endTime: "2025-05-15T23:59:59.000Z",
            startDate: "2025-05-15T00:00:00.000Z",
            image: "https://example.com/image7.jpg",
            description: "Full day festival",
            isPrivate: false,
            status: "approved"
          }
        ]
      },
      "16": {
        events: 2,
        eventDetails: [
          {
            _id: "6815c2774030df4e3f829493",
            title: "Morning Show",
            host: "Jane Smith",
            type: "drag-show",
            startTime: "2025-05-16T11:00:00.000Z",
            endTime: "2025-05-16T13:00:00.000Z",
            startDate: "2025-05-16T00:00:00.000Z",
            image: "https://example.com/image8.jpg",
            description: "Morning drag show",
            isPrivate: false,
            status: "approved"
          },
          {
            _id: "6815c2774030df4e3f829494",
            title: "Evening Concert",
            host: "John Doe",
            type: "music-concert",
            startTime: "2025-05-16T19:00:00.000Z",
            endTime: "2025-05-16T21:30:00.000Z",
            startDate: "2025-05-16T00:00:00.000Z",
            image: "https://example.com/image9.jpg",
            description: "Evening concert",
            isPrivate: false,
            status: "approved"
          }
        ]
      }
    }
  }
}; 