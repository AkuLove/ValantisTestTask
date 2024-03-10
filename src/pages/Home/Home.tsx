/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { useGetIdsMutation } from '../../services/getIdsApi';
import style from './Home.module.scss';
import { ErrorType, IGetFilterParams, IItem } from '../../types';
import { useGetItemsMutation } from '../../services/getItemsApi';
import Filter from '../../components/Filter/Filter';
import ScrollToTopButton from '../../components/UI/Buttons/ScrollToTopButton/ScrollToTopButton';
import PageControls from '../../components/PageControls/PageControls';
import ItemsList from '../../components/ItemsList/ItemsList';
import { useGetFilterMutation } from '../../services/getFilterApi';

function Home() {
  const [items, setItems] = useState<IItem[]>([]);
  const [filter, setFilter] = useState<Partial<IGetFilterParams> | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [getIds, { isLoading: isIdsLoading }] = useGetIdsMutation();
  const [getItems, { isLoading }] = useGetItemsMutation();
  const [getFilterIds, { isLoading: isFilterLoading }] = useGetFilterMutation();

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

  const fetchFilterIds = async () => {
    const response = await getFilterIds({
      action: 'filter',
      params: { ...filter },
    }).unwrap();

    // Если попадаются одинаковые ID выравниваем чтобы было ровно 50 товаров
    const uniqIds = [...new Set(response.result)];
    if (uniqIds.length !== response.result.length) {
      const uniqResponse = await getFilterIds({
        action: 'filter',
        params: { ...filter },
      }).unwrap();
      return [...new Set(uniqResponse.result)];
    }
    return response.result;
  };

  const handleGetFilterIds = async () => {
    // Обработка ошибки id товаров
    try {
      return await fetchFilterIds();
    } catch (err) {
      if (isErrorType(err)) {
        console.log(err.originalStatus);
      } else {
        console.log(err);
      }
      return await fetchFilterIds();
    }
  };

  const handleGetFIlterItems = async () => {
    const response = await getItems({
      action: 'get_items',
      params: { ids: await handleGetFilterIds() },
    }).unwrap();

    setItems([
      ...new Map(response.result.map((item) => [item.id, item])).values(),
    ]);
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
    if (filter === null) {
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
    } else {
      try {
        handleGetFIlterItems();
      } catch (err) {
        if (isErrorType(err)) {
          console.log(err.originalStatus);
        } else {
          console.log(err);
        }
        handleGetFIlterItems();
      }
    }
  }, [offset, filter]);

  useEffect(() => {
    setOffset(0);
  }, [filter]);

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
      <Filter
        isLoading={isLoading || isIdsLoading || isFilterLoading}
        setFilterParams={setFilter}
      />
      <div className={style.body}>
        <PageControls
          offset={offset}
          disabled={items.length < 50 || filter !== null}
          handleNextItems={handleNextItems}
          handlePrevItems={handlePrevItems}
          isLoading={isLoading || isIdsLoading || isFilterLoading}
        />
        {filter !== null && (
          <p className={style.searchResult}>
            Результат поиска:{' '}
            <span className={style.searchResult__value}>
              {Object.values(filter)[0]}
            </span>
          </p>
        )}
        <ItemsList
          items={items}
          isLoading={isLoading || isIdsLoading || isFilterLoading}
        />
        {!isLoading &&
          !isIdsLoading &&
          !isFilterLoading &&
          items.length === 0 && (
            <p className={style.noResult}>Нет результатов</p>
          )}
      </div>
      <ScrollToTopButton />
    </section>
  );
}

export default Home;
