import moment from "moment/moment";
// Here I define a helper function to return the time where the post was created.
// I use the "moment" library.
export const getCurrentTimeStamp = (timeFormat) => {
  return moment().format(timeFormat);
};
