import style from './PaginationButton.module.scss';

type IPaginationButton = {
  handleClick: () => void;
  children: React.ReactNode;
  disabled: boolean;
};

function PaginationButton({
  handleClick,
  disabled,
  children,
}: IPaginationButton) {
  return (
    <button
      disabled={disabled}
      className={style.button}
      onClick={() => handleClick()}
      type="button"
    >
      {children}
    </button>
  );
}

export default PaginationButton;
