export const isEmailValid = (email: string): boolean => {
  const dateReqex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return dateReqex.test(email);
};
