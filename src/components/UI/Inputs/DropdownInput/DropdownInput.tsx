import { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import style from './DropdownInput.module.scss';

type DropdownInputType = {
  placeHolder: string;
  options: string[];
  onChange: (value: string) => void;
  value: string;
};

function DropdownInput({
  placeHolder,
  options,
  onChange,
  value,
}: DropdownInputType) {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handler = () => setShowMenu(false);

    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('click', handler);
    };
  }, []);

  const handleInputClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const getDisplay = () => {
    if (value) {
      return value;
    }
    return placeHolder;
  };

  const onItemClick = (option: string) => {
    if (option === value) {
      onChange('');
    } else {
      onChange(option);
    }
  };

  const isSelected = (option: string) => {
    if (!value) {
      return false;
    }

    return value === option;
  };

  return (
    <div className={style.dropdown}>
      <div
        onClick={handleInputClick}
        role="presentation"
        className={style.dropdown__input}
      >
        <div className={style.dropdown__selectedValue}>{getDisplay()}</div>
        <div className={style.dropdown__tools}>
          <div
            className={`${style.dropdown__tool} ${showMenu && style.active}`}
          >
            <FaChevronDown />
          </div>
        </div>
      </div>
      {showMenu && (
        <div className={style.dropdown__menu}>
          {options.map((option) => (
            <div
              onClick={() => onItemClick(option)}
              role="presentation"
              key={option}
              className={`${style.dropdown__item} ${isSelected(option) && style.selected}`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownInput;
