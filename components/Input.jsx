function Input({ name, type, value, method, error, setError }) {
  const handleChange = (e) => {
    method(e.target.value)
    if(setError) setError(false)
  }
  return (
    <div className="input-wrapper">
      <span className={error? "red":""}>{name}</span>
      {type != "textarea" ? (
        <input
          type={type}
          value={value}
          onChange={handleChange}
          className={error ? "input-error" : ""}
        />
      ) : (
        <textarea
          rows="10"
          value={value}
          onChange={handleChange}
          className={error ? "input-error" : ""}></textarea>
      )}
    </div>
  );
}

export default Input;
