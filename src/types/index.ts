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

export type IGetIdsParams = {
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

export type IGetItemsParams = {
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

export type IGetFields = {
  action: 'get_fields';
  params: IGetIdsParams;
};

export type IGetFieldsParams = {
  field: 'brand' | 'id' | 'price' | 'product';
  offset: number;
  limit: number;
};

export type IGetFieldsResponseSTRING = {
  result: string[] | number[];
};

//= ============================================================================
