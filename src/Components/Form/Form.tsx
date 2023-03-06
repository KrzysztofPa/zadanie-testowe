import axios from "axios";
import React, { useState } from "react";
import { isDateValid } from "../partials/isDateValid";
import { isEmailValid } from "../partials/isEmailValid";
import { isStringEmpty } from "../partials/isStringEmpty";
import { useGetDepartmentsList } from "../partials/useGetDepartmentsList";

export const Form = () => {
  const departmentList = useGetDepartmentsList();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    birthDate: "",
    email: "",
    department: "",
    termsOfUseAccepted: false,
  });

  const [formStatus, setFormStatus] = useState({
    fullNameCorrect: true,
    birthDateCorrect: true,
    emailCorrect: true,
    departmentSelected: true,
    wasFormSentCorrectly: false,
    errorOccured: false,
  });

  const handleTermsOfUseChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, termsOfUseAccepted: event.target.checked });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    setFormStatus({
      fullNameCorrect: !isStringEmpty(formData.fullName),
      birthDateCorrect: isDateValid(formData.birthDate),
      emailCorrect: isEmailValid(formData.email),
      departmentSelected: "" !== formData.department,
      wasFormSentCorrectly: false,
      errorOccured: false,
    });

    if (
      !isStringEmpty(formData.fullName) &&
      isDateValid(formData.birthDate) &&
      isEmailValid(formData.email) &&
      "" !== formData.department
    ) {
      setIsLoading(true);
      const postURL =
        "https://ddh-front-default-rtdb.europe-west1.firebasedatabase.app/users.json";
      axios
        .post(postURL, formData)
        .then(() => {
          setFormStatus({
            ...formStatus,
            wasFormSentCorrectly: true,
          });
        })
        .catch(() => {
          setFormStatus({
            ...formStatus,
            errorOccured: true,
          });
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <form className="mt-5">
      <div className="mb-3">
        <label htmlFor="user-name" className="form-label">
          Imię i nazwisko
        </label>
        <input
          type="name"
          className="form-control"
          id="user-name"
          placeholder="Imię i nazwisko"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
        {!formStatus.fullNameCorrect && (
          <p className="text-danger">Wartość nie może być pusta</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="user-birth-date" className="form-label">
          Data urodzenia
        </label>
        <input
          type="text"
          className="form-control"
          id="user-birth-date"
          placeholder="DD/MM/YYYY"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
        />
        {!formStatus.birthDateCorrect && (
          <p className="text-danger">
            Wprowadź date urodzenia w formacie DD/MM/YYYY
          </p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="user-email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="user-email"
          placeholder="user@example.com"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {!formStatus.emailCorrect && (
          <p className="text-danger">Wprowadź prawidłowy adres E-mail</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="user-department" className="form-label">
          Wydział
        </label>
        <select
          className="form-select"
          name="department"
          id="user-department"
          onChange={handleChange}
        >
          <option disabled selected hidden>
            Wybierz oddział
          </option>
          {departmentList.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </select>
        {!formStatus.departmentSelected && (
          <p className="text-danger">Wybierz oddział z listy</p>
        )}
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="form-terms"
          name="termsOfUse"
          onChange={handleTermsOfUseChange}
        />
        <label className="form-check-label" htmlFor="form-terms">
          Akceptuję regulamin
        </label>
      </div>

      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button
          disabled={!formData.termsOfUseAccepted || isLoading}
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          {isLoading ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            <> Zapisz</>
          )}
        </button>
      </div>
      {formStatus.wasFormSentCorrectly && (
        <p className="text-success">Dane zostały poprawnie zapisane</p>
      )}
      {formStatus.errorOccured && <p className="text-danger">Wystąpił błąd</p>}
    </form>
  );
};
