import '../styles/layout/letters.scss';

const SolutionLetters = (props) =>{

    const renderSolutionLetters = () => {
        const wordLetters = props.word.split('');
        return wordLetters.map((letter, index) => {
          const newLetter = props.userLetters.includes(letter);
          return (
            <li className="letter" key={index}>
              {newLetter ? letter : ''}
            </li>
          );
        });
      };
    
    return(
        <div className="solution">
              <h2 className="title">Solución:</h2>

              <ul className="letters">{renderSolutionLetters()}</ul>
            </div>
    )
}

export default SolutionLetters;