import React, { useState } from "react";
import { isDateValid } from "../partials/isDateValid";
import { isEmailValid } from "../partials/isEmailValid";
import { isStringNotEmpty } from "../partials/isStringNotEmpty";

export const Form = () => {
  const [userName, setUserName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [isTermsOfUseAccepted, setIsTermsOfUseAccepted] = useState(false);

  const handleSubmit = () => {
    console.log("---");
    console.log(userName);
    console.log(isStringNotEmpty(userName));
    console.log(birthDate);
    console.log(isDateValid(birthDate));
    console.log(email);
    console.log(isEmailValid(birthDate));
    console.log(isTermsOfUseAccepted);
    // TODO: Wyślij dane
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
          onChange={(e) => setUserName(e.target.value)}
        />
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
          onChange={(e) => setBirthDate(e.target.value)}
        />
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
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {/* <div className="mb-3">
        <label htmlFor="user-department" className="form-label">
          Wydział
        </label>
        <select className="form-select" name="department" id="user-department">
          <option disabled selected hidden>
            Wybierz oddział
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div> */}
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="form-terms"
          name="termsOfUse"
          onChange={() => setIsTermsOfUseAccepted(!isTermsOfUseAccepted)}
        />
        <label className="form-check-label" htmlFor="form-terms">
          Akceptuję regulamin
        </label>
      </div>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Zapisz
        </button>
      </div>
    </form>
  );
};
