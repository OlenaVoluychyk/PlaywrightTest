require('dotenv').config();

export const CREDS = {
  username: process.env.USERNAME,
  password: process.env.PASSWORD
};

export const INVALID_CREDS = {
  username: 'test@test.com',
  password: '111111'
};