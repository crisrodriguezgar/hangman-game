const Options = ({inputValue}) => {

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  const handleChange= ()=>{
    setInputValue (ev.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="title" htmlFor="word">
        Escribe aquí la palabra que hay que adivinar:
      </label>
      <input
        autofocus
        autocomplete="off"
        className="form__input"
        maxlength="15"
        type="text"
        id="word"
        name="word"
        value={inputValue}
        onChange={handleChange}
      />
    </form>
  );
};

export default Options;
