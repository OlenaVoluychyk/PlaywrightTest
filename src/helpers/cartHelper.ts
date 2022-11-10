import { BaseHttpHelper } from './baseHttphelper';
import { AxiosResponse } from 'axios';
import { AddToCartRequest } from '../data/interfaces';

export class CartHelper extends BaseHttpHelper {
  protected readonly path: string;

  constructor() {
    super();
    this.path = 'cart';
  }
  
  async AddToCart (body: AddToCartRequest): Promise<AxiosResponse> {
    return this.post({ 
      url: `${this.path}/add-to-cart`,
      data: body
    })
  }

  async getCartItems (): Promise<AxiosResponse> {
    return this.get({url: `${this.path}`});
  }

  async clearCart (): Promise<void> {
    const cartItems = (await this.getCartItems()).data.cart.items;
    for(const item of cartItems){
      const body = {
        cartItem: item.id
      }
      this.post({
        url: `${this.path}/remove-from-cart`,
        data: body
      })
    }
  }
}