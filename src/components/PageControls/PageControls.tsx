import { GrNext, GrPrevious } from 'react-icons/gr';
import PaginationButton from '../UI/Buttons/PaginationButton/PaginationButton';
import style from './PageControls.module.scss';

type PageControlsType = {
  handleNextItems: () => void;
  handlePrevItems: () => void;
  offset: number;
  isLoading: boolean;
  disabled: boolean;
};

function PageControls({
  handleNextItems,
  handlePrevItems,
  offset,
  isLoading,
  disabled,
}: PageControlsType) {
  return (
    <div className={style.buttons}>
      <PaginationButton
        disabled={offset === 0 || isLoading}
        handleClick={() => handlePrevItems()}
      >
        <GrPrevious />
      </PaginationButton>
      <PaginationButton
        disabled={isLoading || disabled}
        handleClick={() => handleNextItems()}
      >
        <GrNext />
      </PaginationButton>
      <p className={style.pages}>
        Страница{' '}
        <span className={style.pages__number}>
          {Math.round(offset / 50 + 1)}
        </span>
      </p>
    </div>
  );
}

export default PageControls;
