import { convertToDate } from "./convertToDate";

export const convertToDatetime = (date: string): string => {
  const timestamp = new Date(date);
  const calendar = convertToDate(date);
  const hours = timestamp.getHours();
  const minutes = timestamp.getMinutes();

  return `${calendar} at ${hours}:${minutes}`;
}
