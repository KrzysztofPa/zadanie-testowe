export const isDateValid = (date: string): boolean => {
  const dateReqex =
    /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  return dateReqex.test(date);
};
