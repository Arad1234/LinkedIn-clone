import uuid from "react-uuid";

export const getUniqueID = () => {
  const id = uuid();
  return id;
};
