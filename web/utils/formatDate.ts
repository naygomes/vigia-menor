import moment from "moment";

export function formatDate(date: string): string {
  const formattedDate: string = moment(date).utc().format("DD/MM/YY");

  return formattedDate;
}
