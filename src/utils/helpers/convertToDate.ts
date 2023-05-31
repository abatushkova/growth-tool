const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const convertToDate = (date: string): string => {
  const event = new Date(date);
  const day = event.getDate();
  const month = months[event.getMonth()];
  const year = event.getFullYear();

  return `${month} ${day}, ${year}`;
}
