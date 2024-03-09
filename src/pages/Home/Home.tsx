/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { GrPrevious, GrNext } from 'react-icons/gr';
import { useGetIdsMutation } from '../../services/getIdsApi';
import style from './Home.module.scss';
import useLocalStorage from '../../hooks/useLocalStorage';
import { ErrorType, IItem } from '../../types';
import { useGetItemsMutation } from '../../services/getItemsApi';
import Item from '../../components/Item/Item';
import PaginationButton from '../../components/UI/Buttons/PaginationButton/PaginationButton';
import Loader from '../../components/Loader/Loader';
import Filter from '../../components/Filter/Filter';
import ScrollToTopButton from '../../components/UI/Buttons/ScrollToTopButton/ScrollToTopButton';

function Home() {
  const [items, setItems] = useState<IItem[]>([]);
  const [offset, setOffset] = useLocalStorage<number>(0, 'offset');
  const [getIds, { isLoading: isIdsLoading }] = useGetIdsMutation();
  const [getItems, { isLoading }] = useGetItemsMutation();

  const isErrorType = (err: unknown): err is ErrorType => {
    if (err && typeof err === 'object' && 'originalStatus' in err) {
      return true;
    }
    return false;
  };

  const fetchIds = async () => {
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

  const handleGetIds = async () => {
    // Обработка ошибки id товаров
    try {
      return await fetchIds();
    } catch (err) {
      if (isErrorType(err)) {
        console.log(err.originalStatus);
      } else {
        console.log(err);
      }
      return await fetchIds();
    }
  };

  const handleGetItems = async () => {
    const response = await getItems({
      action: 'get_items',
      params: { ids: await handleGetIds() },
    }).unwrap();

    setItems([
      ...new Map(response.result.map((item) => [item.id, item])).values(),
    ]);
  };

  useEffect(() => {
    // Обработка ошибки товаров
    try {
      handleGetItems();
    } catch (err) {
      if (isErrorType(err)) {
        console.log(err.originalStatus);
      } else {
        console.log(err);
      }
      handleGetItems();
    }
  }, [offset]);

  const handlePrevItems = () => {
    if (offset > 0) {
      setOffset((prev) => prev - 50);
    }
  };

  const handleNextItems = () => {
    setOffset((prev) => prev + 50);
  };

  return (
    <section className={style.homePage}>
      <Filter />
      <div className={style.body}>
        <div className={style.buttons}>
          <PaginationButton
            disabled={offset === 0}
            handleClick={() => handlePrevItems()}
          >
            <GrPrevious />
          </PaginationButton>
          <PaginationButton
            disabled={false}
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
        <div className={style.items}>
          {items.map((item) => (
            <Item item={item} key={item.id} />
          ))}
          {(isLoading || isIdsLoading) && (
            <div className={style.loader}>
              <Loader />
            </div>
          )}
        </div>
      </div>
      <ScrollToTopButton />
    </section>
  );
}

export default Home;
