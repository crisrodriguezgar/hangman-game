import '../styles/layout/letters.scss';

const ErrorLetters = ({userLetters, word}) => {
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
    
    return (
    <div className="error">
      <h2 className="title">Letras falladas:</h2>
      <ul className="letters">{renderErrorLetters()}</ul>
    </div>
  );
};

export default ErrorLetters;