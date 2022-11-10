import { AxiosRequestConfig } from 'axios';

export interface AddToCartRequest extends AxiosRequestConfig {
  productVariationId: number;
}