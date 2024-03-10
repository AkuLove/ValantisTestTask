import { IItem } from '../../types';
import Item from '../Item/Item';
import Loader from '../Loader/Loader';
import style from './ItemsList.module.scss';

type ItemsListType = {
  isLoading: boolean;
  items: IItem[];
};

function ItemsList({ isLoading, items }: ItemsListType) {
  return (
    <div className={style.items}>
      {items.map((item) => (
        <Item item={item} key={item.id} />
      ))}
      {isLoading && (
        <div className={style.loader}>
          <Loader />
        </div>
      )}
    </div>
  );
}

export default ItemsList;
