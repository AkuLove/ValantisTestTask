import { CiImageOff } from 'react-icons/ci';
import { IItem } from '../../types';
import style from './Item.module.scss';

function Item({ item }: { item: IItem }) {
  return (
    <div className={style.item}>
      <div className={style.item__image}>
        <CiImageOff />
      </div>
      <div className={style.item__info}>
        <div className={style.description}>
          <span className={style.description__product}>
            {item.product || '-'}
          </span>
        </div>
        <div className={style.description}>
          <span className={style.description__price}>
            {`${item.price} ₽` || '-'}
          </span>
        </div>
        <div className={style.description}>
          <span className={style.description__name}>Бренд:</span>
          <span className={style.description__brand}>{item.brand || '-'}</span>
        </div>
        <div className={style.id}>
          <span className={style.id__name}>ID:</span>
          <span className={style.id__info}>{item.id}</span>
        </div>
      </div>
    </div>
  );
}

export default Item;
