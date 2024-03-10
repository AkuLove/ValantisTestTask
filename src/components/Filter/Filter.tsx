import { useState } from 'react';
import { GrSearch } from 'react-icons/gr';
import FilterInput from '../UI/Inputs/FilterInput/FilterInput';
import style from './Filter.module.scss';
import DropdownInput from '../UI/Inputs/DropdownInput/DropdownInput';
import { BRANDS } from '../../constants';
import { IGetFilterParams } from '../../types';

type FilterType = {
  setFilterParams: React.Dispatch<
    React.SetStateAction<Partial<IGetFilterParams | null>>
  >;
  isLoading: boolean;
};

function Filter({ setFilterParams, isLoading }: FilterType) {
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [product, setProduct] = useState('');

  const handleSetFilter = (property: 'price' | 'product') => {
    switch (property) {
      case 'price':
        if (Number(price) > 0) {
          setFilterParams({ price: Number(price) });
        } else {
          setFilterParams(null);
        }
        break;
      case 'product':
        if (product.length > 0) {
          setFilterParams({ product });
        } else {
          setFilterParams(null);
        }
        break;
      default:
        setFilterParams({});
    }
  };

  return (
    <div className={style.filter}>
      <p className={style.filter__title}>Фильтр</p>
      <div className={style.filter__inputs}>
        <div className={style.filter__input}>
          <FilterInput
            type="text"
            value={product}
            handleChange={setProduct}
            placeholder="Название товара"
          />
          <button
            onClick={() => handleSetFilter('product')}
            className={style.filter__searchButtons}
            type="button"
            disabled={isLoading}
          >
            <GrSearch />
          </button>
        </div>
        <div className={style.filter__input}>
          <FilterInput
            type="number"
            value={price}
            handleChange={setPrice}
            placeholder="Цена"
          />
          <button
            onClick={() => handleSetFilter('price')}
            className={style.filter__searchButtons}
            type="button"
            disabled={isLoading}
          >
            <GrSearch />
          </button>
        </div>
        <DropdownInput
          options={BRANDS}
          placeHolder="Бренд"
          onChange={(value) => {
            setBrand(value);
            if (value === '') {
              setFilterParams(null);
            } else {
              setFilterParams({ brand: value });
            }
          }}
          value={brand}
        />
      </div>
    </div>
  );
}

export default Filter;
