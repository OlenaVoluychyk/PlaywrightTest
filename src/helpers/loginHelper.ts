import { BaseHttpHelper } from './baseHttphelper';
import { PostLoginResponse, Credentials } from '../data/interfaces'

export class LoginHelper extends BaseHttpHelper {
  protected readonly path: string;

  constructor() {
    super();
    this.path = 'login';
  }

  async getToken(creds: Credentials): Promise<string> {
    let response: PostLoginResponse;
    response = await this.post({url: this.path,
      data: {
        _username: creds.username,
        _password: creds.password
      }
    });
    return response.data.token;
  }
}