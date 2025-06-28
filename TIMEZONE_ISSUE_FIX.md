# Timezone Issue Fix Documentation

## Problem Description

The client reported that events happening at 11pm tonight were not showing up on the home page, even though they were created and should be visible. This was happening because:

1. **Backend Filter Issue**: The backend was filtering events using only `startDate` field
2. **Data Structure Issue**: Events have two separate fields:
   - `startDate`: Always midnight UTC (e.g., `"2025-06-28T00:00:00.000Z"`) - just the date
   - `startTime`: Actual event time (e.g., `"2025-06-20T08:24:00.000Z"`) - contains real event time
3. **Timezone Problem**: The filtering was not considering the actual event time, causing events happening today to be filtered out

## Root Cause

The backend query was using:
```javascript
{ $match: { status: 'approved', startDate: { $gte: dayjs().subtract(1, 'day').toDate() }, isPrivate: false } }
```

This only checked the `startDate` field, which is always midnight UTC, not the actual event time stored in `startTime`.

## Frontend Fixes Applied

### 1. EventListing.jsx
- Added `getActualEventDate()` function to combine `startDate` and `startTime`
- Added `formatActualEventDate()` function for proper date display
- Added `extractActualEventTime()` function for proper time display
- Updated event card rendering to use these new functions

### 2. UpComingEvents.jsx
- Updated `getLocalDateParts()` function to accept the full event object
- Added proper date/time combination logic
- Added `formatEventTime()` helper function
- Updated time display to use consistent formatting

## Backend Fix Required

The backend needs to be updated to filter based on the actual event time, not just the date. Here's the suggested fix:

### Current Backend Query:
```javascript
{ $match: { status: 'approved', startDate: { $gte: dayjs().subtract(1, 'day').toDate() }, isPrivate: false } }
```

### Suggested Backend Fix:
```javascript
{ $match: { status: 'approved', isPrivate: false } },
{
  $addFields: {
    actualEventTime: {
      $dateFromString: {
        dateString: {
          $concat: [
            { $substr: ["$startDate", 0, 10] }, // Get YYYY-MM-DD from startDate
            "T",
            { $substr: ["$startTime", 11, 8] }, // Get HH:MM:SS from startTime
            "Z"
          ]
        }
      }
    }
  }
},
{
  $match: {
    actualEventTime: { $gte: dayjs().subtract(1, 'day').toDate() }
  }
}
```

## Testing

To verify the fix works:

1. Create an event for today at 11pm
2. Check if it appears on the home page
3. Verify the date and time display correctly
4. Test with different timezones

## Files Modified

1. `src/common/EventListening/EventListing.jsx`
2. `src/components/Home/UpComingEvents.jsx`

## Notes

- The frontend fixes provide immediate relief but the backend fix is essential for proper filtering
- The timezone handling logic is consistent across components
- All date/time displays now properly combine `startDate` and `startTime` 