const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const convertToDate = (date: string): string => {
  const localDate = new Date(date);
  const day = localDate.getDate();
  const month = months[localDate.getMonth()];
  const year = localDate.getFullYear();

  return `${month} ${day}, ${year}`;
}
