import React from "react";
import AdaugaStudent from "./components/adaugaStudent";

import "./App.css";

var ID = function() {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

class Grupa extends React.Component {
  state = {
    studenti: [],
    sortatDupa: null
  };

  componentDidMount() {
    fetch("https://demo3305866.mockable.io/tema_studenti_react")
      .then(response => response.json())
      .then(data => {
        const studenti = [...data.students].map(student => {
          student.key = ID();
          return student;
        });
        this.setState({ studenti });
      });
  }

  adaugaStudent = e => {
    e.preventDefault();
    const student = {};
    const notValid = [];
    if (this.state.studenti.length < 9) {
      if (
        e.target.inputNume.value === "" ||
        !e.target.inputNume.value.match(/^[a-zA-Z]+$/)
      ) {
        notValid.push("Nume incorect sau lipsa.");
      } else {
        student.nume = e.target.inputNume.value;
      }
      if (
        e.target.inputPrenume.value === "" ||
        !e.target.inputNume.value.match(/^[a-zA-Z]+$/)
      ) {
        notValid.push("Prenume incorect sau lipsa.");
      } else {
        student.prenume = e.target.inputPrenume.value;
      }
      if (
        e.target.inputVarsta.value === "" ||
        isNaN(e.target.inputVarsta.value) ||
        e.target.inputVarsta.value % 1 !== 0 ||
        e.target.inputVarsta.value <= 0
      ) {
        notValid.push("Varsta introdusa incorect sau lipsa.");
      } else {
        student.varsta = e.target.inputVarsta.value;
      }
      if (
        e.target.inputMedia.value === "" ||
        isNaN(e.target.inputMedia.value) ||
        e.target.inputMedia.value > 10 ||
        e.target.inputMedia.value <= 0
      ) {
        notValid.push("Media introdusa incorect sau lipsa.");
      } else {
        student.media = e.target.inputMedia.value;
      }

      if (notValid.length === 0) {
        const studenti = [...this.state.studenti];
        student.key = ID();
        studenti.push(student);
        this.setState({ studenti });
      } else alert(notValid[0]);
    } else alert("Numarul maxim de studenti a fost atins!");
  };

  stergeStudent = index => {
    const studenti = [...this.state.studenti];
    studenti.splice(index, 1);
    this.setState({ studenti });
  };
  sorteazaStudenti = criteriu => {
    if (this.state.sortatDupa !== criteriu) {
      const studenti = [...this.state.studenti];
      function compare(a, b) {
        let comparison = null;
        if (criteriu === "nume" || criteriu === "prenume") {
          const A = a[criteriu].toUpperCase();
          const B = b[criteriu].toUpperCase();
          comparison = A.toString().localeCompare(B.toString());
        } else {
          const A = a[criteriu];
          const B = b[criteriu];
          comparison = A > B ? 1 : -1;
        }
        return comparison;
      }
      this.setState({
        studenti: studenti.sort(compare),
        sortatDupa: criteriu
      });
    } else
      this.setState(prevState => ({
        studenti: prevState.studenti.reverse()
      }));
  };

  render() {
    return (
      <div className="App">
        <table>
          <thead>
            <tr>
              <th
                className="coloanaNume"
                onClick={() => this.sorteazaStudenti("nume")}
              >
                Nume
              </th>
              <th
                className="coloanaPrenume"
                onClick={() => this.sorteazaStudenti("prenume")}
              >
                Prenume
              </th>
              <th
                className="coloanaVarsta"
                onClick={() => this.sorteazaStudenti("varsta")}
              >
                Varsta
              </th>
              <th onClick={() => this.sorteazaStudenti("media")}>Media</th>
              <th id="sterge" />
            </tr>
          </thead>
          <tbody>
            {this.state.studenti.map((student, index) => {
              return (
                <tr key={student.key}>
                  <td className="coloanaNume">{student.nume}</td>
                  <td className="coloanaPrenume">{student.prenume}</td>
                  <td>{student.varsta}</td>
                  <td>{student.media}</td>
                  <td>
                    <button onClick={() => this.stergeStudent(index)}>
                      Sterge
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <AdaugaStudent adaugaStudent={this.adaugaStudent} />
      </div>
    );
  }
}


export default Grupa;
