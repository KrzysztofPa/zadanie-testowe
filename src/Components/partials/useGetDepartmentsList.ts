import axios from "axios";
import { useState, useEffect } from "react";

export const useGetDepartmentsList = (): Deparment[] => {
  const [departmentList, setDepartmentList] = useState([]);
  const url =
    "https://ddh-front-default-rtdb.europe-west1.firebasedatabase.app/departments.json";

  useEffect(() => {
    axios.get(url).then((response) => {
      setDepartmentList(response.data);
    });
  }, []);

  return departmentList;
};

export interface Deparment {
  id: number;
  name: string;
}
