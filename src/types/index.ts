export type ErrorType = {
  data: string;
  error: string;
  originalStatus: number;
  status: string;
};

//= ============================================================================

export type IGetIds = {
  action: 'get_ids';
  params: IGetIdsParams;
};

type IGetIdsParams = {
  offset: number;
  limit: number;
};

export type IGetIdsResponse = {
  result: string[];
};

//= ============================================================================

export type IGetItems = {
  action: 'get_items';
  params: IGetItemsParams;
};

type IGetItemsParams = {
  ids: string[];
};

export type IGetItemsResponse = {
  result: IItem[];
};

export type IItem = {
  brand: string | null;
  id: string | null;
  price: number | null;
  product: string | null;
};

//= ============================================================================

export type IGetFilter = {
  action: 'filter';
  params: Partial<IGetFilterParams>;
};

type IGetFilterParamsSTRING = Record<'brand' | 'product', string>;
type IGetFilterParamsNUMBER = Record<'price', number>;
export type IGetFilterParams = IGetFilterParamsSTRING | IGetFilterParamsNUMBER;

export type IGetFilterResponse = {
  result: string[];
};

//= ============================================================================
