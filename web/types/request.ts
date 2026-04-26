export type RequestParams = {
  url: string;
  method?: string;
  data?: any;
  customHeaders?: HeadersInit;
};

export type GetParams = {
  endpoint: string;
  params?: Record<string, any>;
  customHeaders?: HeadersInit;
};

export type PostParams = {
  endpoint: string;
  data: any;
  customHeaders?: HeadersInit;
};

export interface IFetchData {
  request({ url, method, data, customHeaders }: RequestParams): Promise<any>;
  get({ endpoint, params, customHeaders }: GetParams): Promise<any>;
  post({ endpoint, data, customHeaders }: PostParams): Promise<any>;
}
