import { AxiosRequestConfig } from 'axios';

export interface ProductRequest extends AxiosRequestConfig {
  category?: string;
  categoryTreeRequired?: boolean;
  filters?: Filters;
  latest?: number;
  page?: number;
  productsPerPage?: number;
  sort?: string;
  urlParams?: string;
}

interface Filters {
  attribute: number[];
}