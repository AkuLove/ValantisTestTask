import { useState } from 'react';
import FilterInput from '../UI/Inputs/FilterInput/FilterInput';
import style from './Filter.module.scss';

function Filter() {
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [product, setProduct] = useState('');

  return (
    <div className={style.filter}>
      <p className={style.filter__title}>Фильтр</p>
      <div className={style.filter__inputs}>
        <FilterInput
          type="text"
          value={product}
          handleChange={setProduct}
          placeholder="Название товара"
        />
        <FilterInput
          type="number"
          value={price}
          handleChange={setPrice}
          placeholder="Цена"
        />
        <FilterInput
          type="text"
          value={brand}
          handleChange={setBrand}
          placeholder="Бренд"
        />
      </div>
    </div>
  );
}

export default Filter;
