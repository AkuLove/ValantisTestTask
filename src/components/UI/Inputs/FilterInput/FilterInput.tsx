import style from './FilterInput.module.scss';

type FilterType = {
  type: string;
  placeholder: string;
  value: string | number;
  handleChange: React.Dispatch<React.SetStateAction<string>>;
};

function FilterInput({ type, placeholder, handleChange, value }: FilterType) {
  return (
    <input
      className={style.input}
      min="0"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
}

export default FilterInput;
