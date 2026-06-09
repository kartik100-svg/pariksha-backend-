import dotenv from "dotenv";
dotenv.config();

import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const calendar = google.calendar({
  version: "v3",
  auth: oauth2Client,
});

export const createGoogleMeet = async (
  title,
  description,
  startDateTime,
  endDateTime
) => {
  const response = await calendar.events.insert({
    calendarId: "primary",
    conferenceDataVersion: 1,
    resource: {
      summary: title,
      description,
      start: {
        dateTime: startDateTime,
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: endDateTime,
        timeZone: "Asia/Kolkata",
      },
      conferenceData: {
        createRequest: {
          requestId: Date.now().toString(),
        },
      },
    },
  });

  return response.data.hangoutLink;
};