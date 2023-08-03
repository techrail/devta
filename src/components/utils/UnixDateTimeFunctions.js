import moment from "moment/moment";
import { useGlobalStore } from "@stores/index.mjs";

const store = useGlobalStore();

// unix time
export const getUnixTime = () => Math.floor(Date.now() / 1000);

// unix to GMT
export const unixToDate = (epoch) => {
  const date = new Date(epoch * 1000);
  const gmt = date.toGMTString();
  const loc = date.toLocaleString();
  return { gmt: gmt, loc: loc };
};

export const getCurrentDate = () => {
  const date = new Date();
  const gmt = date.toGMTString();
  const loc = date.toLocaleString();
  return { gmt, loc };
};

export const dateToUnixTimestamp = (dateString) => {
  const dateObj = new Date(dateString);
  const unixTimestamp = dateObj.getTime();
  const unixTimestampInSeconds = Math.floor(unixTimestamp / 1000);
  return unixTimestampInSeconds;
};

export const getRelativeTime = (date) => moment(date * 1000).fromNow();

export const formatDates = (date) => {
  const d = date * 1000;
  const dd = new Date();
  const data = {
    timeOnly: moment(d).format("LT"), // 6:20 PM
    timeWithSecond: moment(d).format("LTS"), // 6:20:44 PM
    monthDayYearPretty: moment(d).format("L"), // 07/30/2023
    monthDayYear: moment(d).format("l"), // 7/30/2023
    dateFull: moment(d).format("LL"), // July 30, 2023
    date: moment(d).format("ll"),
    dateFullWithTime: moment(d).format("LLL"), // July 30, 2023 6:20 PM
    dateWithTime: moment(d).format("lll"), // Jul 30, 2023 6:20 PM
    dayDateTimeFull: moment(d).format("LLLL"), // Sunday, July 30, 2023 6:20 PM
    dayDateTime: moment(d).format("llll"), // Sun, Jul 30, 2023 6:20 PM
    locale: dd.toLocaleString(),
    gmt: dd.toGMTString(),
    relative: moment(d).fromNow(),
  };
  return data;
};

export const convertToTimeZone = (originalDate, timeZone) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: timeZone,
  };

  return new Intl.DateTimeFormat("en-US", options).format(originalDate);
};

export const copyToClipboard = async (text) => {
  await navigator.clipboard.writeText(text);
  store.showSnackbar("Contents copied to clipboard");
};

export const labelFormatter = (format) => {
  const formatMap = {
    timeOnly: "Time",
    timeWithSecond: "Time with seconds",
    dateFullWithTime: "Date Full With Time",
    monthDayYearPretty: "MM/DD/YYYY",
    monthDayYear: "MM/DD/YYYY",
    dateFull: "Full date",
    date: "Date",
    dateFullWithTime: "Date and time",
    dateWithTime: "Date and time",
    dateWithTime: "Date and time",
    dayDateTimeFull: "Full date and time",
    dayDateTime: "Full date and time",
    locale: "Locale time",
    gmt: "GMT",
    relative: "Relative time",
  };
  return formatMap[format] || format;
};
