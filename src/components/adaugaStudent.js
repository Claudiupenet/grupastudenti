import React from "react";
import "../App.css";

const adaugaStudent = props => {
  return (
    <form className={"adauga-student"} onSubmit={props.adaugaStudent}>
      <input type="int" id="inputNume" />
      <input type="text" id="inputPrenume" />
      <input type="text" id="inputVarsta" />
      <input type="text" id="inputMedia" />
      <button type="submit">Adauga elev in lista</button>
    </form>
  );
};
export default adaugaStudent;
