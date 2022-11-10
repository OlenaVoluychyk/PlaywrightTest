import { BaseHttpHelper } from './baseHttphelper';
import { AxiosResponse } from 'axios';
import { ProductRequest } from '../data/interfaces';

export class ProductHelper extends BaseHttpHelper {
  protected readonly path: string;

  constructor() {
    super();
    this.path = 'products';
  }
  
  async getProducts (body: ProductRequest): Promise<AxiosResponse> {
    return this.post({ 
      url: `${this.path}`,
      data: body
    })
  }

  async getProductsId (): Promise<number[]> {
    const body = {
      category: 'vona',
      latest: 1
    }
    const newProducts = await this.getProducts(body);
    return await newProducts.data.items.filter((item: any) => {
      return item.sizes[0].variation.availability === 'IN_STOCK'
    }).map((item: any) => {
      return item.sizes[0].variation.id
    });
  };
  
  async getProductsIdByCount(count: number): Promise<number[]> {
    const prodsId = await this.getProductsId();
    return prodsId.splice(0, count);
  }
}