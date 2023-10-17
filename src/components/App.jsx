//imports dependencias, imagenes, de otros componentes, de estilos
//import { render } from 'node-sass';
import '../styles/index.scss';
import {useEffect, useState} from 'react';
import Header from "./Header"
import Dummy from "./Dummy"
import SolutionLetters from './SolutionLetters';
import ErrorLetters from './ErrorLetters';


function App() {
  // funciones, variables, handles...
  const [numberOfErrors, setNumberOfErrors] = useState(0);
  const [lastLetter, setLastLetter] = useState('');
  const [word, setWord] = useState('');
  const [userLetters, setUserLetters] = useState([]);

  useEffect(() => {
    fetch('https://dev.adalab.es/api/random/word')
      .then((response) => response.json())
      .then((data) => {
        setWord (data.word)
      });
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    setNumberOfErrors(numberOfErrors + 1);
  };

  const handleLastLetter = (ev) => {
    console.log(ev.target.value);
    let re = /^[a-zA-ZñÑá-úÁ-Ú´]$/;
    if (re.test(ev.target.value) || ev.target.value === '') {
      //setLastLetter(lastLetter);

      setLastLetter(ev.target.value);
      console.log(lastLetter);
      setUserLetters([...userLetters, ev.target.value]);
      console.log(userLetters);
    }
  };

  /****4. Pintando las letras falladas*** */
  const renderErrorLetters = () => {
    // Filtrar las userLetters que no existen en la palabra
    const errorLetters = userLetters.filter((letter) => !word.includes(letter));

    // Recorrer las letras erróneas y retornar un <li> para cada una
    return errorLetters.map((letter, index) => (
      <li className="letter" key={index}>
        {letter}
      </li>
    ));
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

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  //html
  return (
    <>
      <div className="page">
        <Header />
        <main className="main">
          <section>
            <SolutionLetters word={word} userLetters ={userLetters}/>
            <ErrorLetters word={word} userLetters ={userLetters}/>
            <form className="form" onSubmit={handleSubmit}>
              <label className="title" htmlFor="last-letter">
                Escribe una letra:
              </label>
              <input
                autoComplete="off"
                className="form__input"
                maxLength="1"
                type="text"
                name="last-letter"
                id="last-letter"
                value={lastLetter}
                onChange={handleLastLetter}
              />
            </form>
          </section>
          <Dummy numberOfErrors={renderDummy()}/>
        </main>
      </div>
    </>
  );
}

export default App;
