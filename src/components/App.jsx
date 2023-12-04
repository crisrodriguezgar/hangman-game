//imports dependencias, imagenes, de otros componentes, de estilos
//import { render } from 'node-sass';
import '../styles/index.scss';
import {useEffect, useState} from 'react';
import Header from './Header';
import Dummy from './Dummy';
import SolutionLetters from './SolutionLetters';
import ErrorLetters from './ErrorLetters';
import Form from './Form';
import Footer from './Footer';
import {Routes, Route} from 'react-router-dom';
import Instructions from './Instructions';
import Options from './Options';

function App() {
  // funciones, variables, handles...
  const [lastLetter, setLastLetter] = useState('');
  const [word, setWord] = useState('');
  const [userLetters, setUserLetters] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetch('https://dev.adalab.es/api/random/word')
      .then((response) => response.json())
      .then((data) => {
        setWord(data.word);
      });
  }, []);

  const handleLastLetter = (ev) => {
    console.log(ev.target.value);
    const inputValue = ev.target.value.toLowerCase();
    let re = /^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]$/;
    if (re.test(inputValue) || inputValue === '') {
      //setLastLetter(lastLetter);
      setLastLetter(inputValue);
      console.log(lastLetter);
      setUserLetters([...userLetters, inputValue]);
      console.log(userLetters);
      setTimeout(() => {
        setLastLetter('');
      }, 1000);
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

  const handleChange = (value) => {
    setInputValue(value);
    setWord(value);
    setLastLetter('');
    setUserLetters([]);
  };

  //html
  return (
    <>
      <div className="page">
        <Header />
        <main className="main">
          <Routes>
            <Route
              path="/"
              element={
                <section>
                  <SolutionLetters word={word} userLetters={userLetters} />
                  <ErrorLetters word={word} userLetters={userLetters} />
                  <Form
                    lastLetter={lastLetter}
                    handleLastLetter={handleLastLetter}
                  />
                </section>
              }
            />

            <Route path="/instructions" element={<Instructions />} />
            <Route
              path="/options"
              element={
                <Options handleChange={handleChange} inputValue={inputValue} />
              }
            />
          </Routes>

          <Dummy numberOfErrors={renderDummy()} />
        </main>
        <Footer/>
      </div>
    </>
  );
}

export default App;
