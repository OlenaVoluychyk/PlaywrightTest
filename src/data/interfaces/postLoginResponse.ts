import { AxiosResponse } from 'axios';

export interface PostLoginResponse extends AxiosResponse {
  data: {
    token: string;
  };
}