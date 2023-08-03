import spacetime from "spacetime";
import { dateToUnixTimestamp, formatDates } from "./UnixDateTimeFunctions";

export const timezones = [
  "Pacific/Midway", // -11
  "America/Adak", // -10,
  "Pacific/Gambier", // -9
  "America/Los_Angeles", // -8
  "America/Denver", // -7
  "America/Chicago", // -6
  "America/New_York", // -5
  "America/Santiago", // -4
  "America/Sao_Paulo", // -3
  "America/Noronha", // -2
  "Atlantic/Cape_Verde", // -1
  "UTC", // utc
  "Europe/Brussels", //+1
  "Africa/Cairo", // +2
  "Europe/Minsk", // +3
  "Europe/Moscow", // +4
  "Asia/Tashkent", // +5
  "Asia/Kolkata",
  "Asia/Dhaka", // +6
  "Asia/Novosibirsk", // +7
  "Australia/Perth", // +8
  "Asia/Tokyo", // +9
  "Australia/Hobart", // +10
  "Asia/Vladivostok", // +11
  "Pacific/Auckland", // +12
];

export const isoToTimeStamp = (isoStr) => {
  try {
    const date = new Date(isoStr);
    console.log(date);
  } catch (error) {
    console.log(error);
  }
};

export const convertTimezone = (inputDate, inputTimezone, requiredTimezone) => {
  try {
    // Parse the input date and set the input timezone
    const inputDateTime = spacetime(inputDate, inputTimezone);

    // Set the required timezone
    const convertedDateTime = inputDateTime.goto(requiredTimezone);

    // Format the converted date to a string
    const formattedDate = convertedDateTime.format("iso");
    console.log(formattedDate);
    const updatedTs = isoToTimeStamp(formattedDate);
    console.log(formatDates(updatedTs));
  } catch (error) {
    return `Error: ${error.message}`;
  }
};
