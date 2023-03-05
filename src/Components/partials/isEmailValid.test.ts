import { isEmailValid } from "./isEmailValid";

interface TestDataSet {
  email: string;
  expected: boolean;
}

const testDataSet: TestDataSet[] = [
  {
    email: "jan.nowak@gmail.com",
    expected: true,
  },
  {
    email: "janNowak",
    expected: false,
  },
];

test.each(testDataSet)("isEmailValid", ({ email, expected }: TestDataSet) => {
  expect(isEmailValid(email)).toEqual(expected);
});
