//imports dependencias, imagenes, de otros componentes, de estilos
//import { render } from 'node-sass';
import "../styles/index.scss";
import { useEffect, useState } from "react";
import Header from "./Header";
import Dummy from "./Dummy";
import SolutionLetters from "./SolutionLetters";
import ErrorLetters from "./ErrorLetters";
import Form from "./Form";

function App() {
  // funciones, variables, handles...
  const [lastLetter, setLastLetter] = useState("");
  const [word, setWord] = useState("");
  const [userLetters, setUserLetters] = useState([]);

  useEffect(() => {
    fetch("https://dev.adalab.es/api/random/word")
      .then((response) => response.json())
      .then((data) => {
        setWord(data.word);
      });
  }, []);

  const handleLastLetter = (ev) => {
    console.log(ev.target.value);
    let re = /^[a-zA-ZñÑá-úÁ-Ú´]$/;
    if (re.test(ev.target.value) || ev.target.value === "") {
      //setLastLetter(lastLetter);
      setLastLetter(ev.target.value);
      console.log(lastLetter);
      setUserLetters([...userLetters, ev.target.value]);
      console.log(userLetters);
      setTimeout(() => {
        setLastLetter("");
      }, 2000);
    }
  };

  const calculateErrors = () => {
    const errorCount = userLetters.filter(
      (letter) => !word.includes(letter)
    ).length;
    return errorCount;
  };
  const renderDummy = () => {
    const errorCount = calculateErrors();
    return `dummy error-${errorCount}`;
  };

  //html
  return (
    <>
      <div className="page">
        <Header />
        <main className="main">
          <section>
            <SolutionLetters word={word} userLetters={userLetters} />
            <ErrorLetters word={word} userLetters={userLetters} />
            <Form lastLetter={lastLetter} handleLastLetter={handleLastLetter} />
          </section>
          <Dummy numberOfErrors={renderDummy()} />
        </main>
      </div>
    </>
  );
}

export default App;
