import { useEffect, useState } from 'react';
import { useGetIdsMutation } from '../../services/getIdsApi';
import style from './Home.module.scss';
import useLocalStorage from '../../hooks/useLocalStorage';
import { IItem } from '../../types';
import { useGetItemsMutation } from '../../services/getItemsApi';
import Item from '../../components/Item/Item';

function Home() {
  const [items, setItems] = useState<IItem[]>([]);
  const [offset, setOffset] = useLocalStorage<number>(0, 'offset');
  const [getIds] = useGetIdsMutation();
  const [getItems, { isLoading }] = useGetItemsMutation();

  const handleGetIds = async () => {
    const response = await getIds({
      action: 'get_ids',
      params: { limit: 50, offset },
    }).unwrap();

    // Если попадаются одинаковые ID выравниваем чтобы было ровно 50 товаров
    const uniqIds = [...new Set(response.result)];
    if (uniqIds.length !== response.result.length) {
      const difference = 50 - uniqIds.length;
      const uniqResponse = await getIds({
        action: 'get_ids',
        params: { limit: 50 + difference, offset },
      }).unwrap();
      return [...new Set(uniqResponse.result)];
    }
    return response.result;
  };

  const handlePrevItems = () => {
    if (offset > 0) {
      return () => {
        setOffset((prev) => prev - 50);
      };
    }
  };

  const handleNextItems = () => {
    return () => {
      setOffset((prev) => prev + 50);
    };
  };

  const handleGetItems = async () => {
    const ids = await handleGetIds();
    const response = await getItems({
      action: 'get_items',
      params: { ids },
    }).unwrap();
    setItems([
      ...new Map(response.result.map((item) => [item.id, item])).values(),
    ]);
  };

  useEffect(() => {
    handleGetItems();
  }, [offset]);

  return (
    <section className={style.homePage}>
      <div className={style.buttons}>
        <button onClick={handlePrevItems()} type="button">
          Prev
        </button>
        <button onClick={handleNextItems()} type="button">
          Next
        </button>
      </div>
      <div className={style.items}>
        {items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
        {isLoading && <div className={style.loader} />}
      </div>
    </section>
  );
}

export default Home;
