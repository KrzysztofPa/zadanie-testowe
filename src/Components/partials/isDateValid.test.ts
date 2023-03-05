import { isDateValid } from "./isDateValid";

interface TestDataSet {
  date: string;
  expected: boolean;
}

const testDataSet: TestDataSet[] = [
  {
    date: "31/01/2023",
    expected: true,
  },
  {
    date: "01/12/1410",
    expected: true,
  },
  {
    date: "32/02/2023",
    expected: false,
  },
  {
    date: "",
    expected: false,
  },
  {
    date: "05.03.2023",
    expected: false,
  },
];

test.each(testDataSet)("isDateValid", ({ date, expected }: TestDataSet) => {
  expect(isDateValid(date)).toEqual(expected);
});
