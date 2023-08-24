import moment from "moment-timezone";
// import { moment as mom } from "moment";

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

export const convertTimezone = (dateString, currentTz, requiredTz) => {
  try {
    // Create a Moment object from the input date with the current timezone
    const originalMoment = moment.tz(dateString, currentTz);

    // Convert the Moment object to the required timezone
    const convertedMoment = originalMoment.clone().tz(requiredTz);

    // Format the converted date as a string
    const convertedDate = convertedMoment.format("YYYY-MM-DD HH:mm:ss");

    return convertedDate;
  } catch (error) {
    console.log(error);
  }
};

export const convertedFormatDates = (d) => {
  try {
    const data = {
      rfc3339: moment(d).format("YYYY-MM-DDTHH:mm:ssZ") + "Z",
      dateFullWithTime: moment(d).format("LLL"), // July 30, 2023 6:20 PM
      dateWithTime: moment(d).format("lll"), // Jul 30, 2023 6:20 PM
      dayDateTimeFull: moment(d).format("LLLL"), // Sunday, July 30, 2023 6:20 PM
      dayDateTime: moment(d).format("llll"), // Sun, Jul 30, 2023 6:20 PM
      timeOnly: moment(d).format("LT"), // 6:20 PM
      timeWithSecond: moment(d).format("LTS"), // 6:20:44 PM
      monthDayYearPretty: moment(d).format("L"), // 07/30/2023
      monthDayYear: moment(d).format("l"), // 7/30/2023
      dateFull: moment(d).format("LL"), // July 30, 2023
      date: moment(d).format("ll"),
    };
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentLocaleTimezone = () => {
  const options = { timeZoneName: "long" };
  const timezone = Intl.DateTimeFormat(undefined, options).resolvedOptions()
    .timeZone;
  return timezone;
};
