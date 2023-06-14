const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const convertToDate = (date: string): string => {
  const timestamp = new Date(date);
  const day = timestamp.getDate();
  const month = months[timestamp.getMonth()];
  const year = timestamp.getFullYear();

  return `${month} ${day}, ${year}`;
}
