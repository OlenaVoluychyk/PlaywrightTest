import axios from 'axios';
import { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
require('dotenv').config();

export abstract class BaseHttpHelper {
  private readonly url: string | undefined;

  protected readonly headers = {
    'x-tamago-app': 'frontApp',
    'x-tamago-api-version': '2.11',
    'x-tamago-locale': 'uk_UA'
  }

  constructor(url?: string) {
    this.url = url ? url : process.env.API_URL;
  }
  
  async newRequest(requestConfig: AxiosRequestConfig): Promise<any> {
    return axios({
      method: requestConfig.method,
      url: `${this.url}/${requestConfig.url}`,
      headers: {
        ...this.headers,
        Authorization: `${process.env.TOKEN}`,
        ...requestConfig.headers
      },
      params: requestConfig.params,
      data: requestConfig.data
    })
      .then((response: AxiosResponse) => {
        return response;
      }).catch((error: AxiosError) => {
        console.error(error);
      })
  }

  async get(requestObject: AxiosRequestConfig): Promise<any> {
    return this.newRequest({...requestObject, method: 'GET'});
  };

  async post(requestObject: AxiosRequestConfig): Promise<any> {
    return this.newRequest({...requestObject, method: 'POST'});
  };
}