import md5 from 'md5';

const PASSWORD = 'Valantis';
export const BASE_URL = 'http://api.valantis.store:40000/';

const TIMESTAMP = `${new Date().toISOString().slice(0, 10).split('-').join('')}`;
export const HASH_PASSWORD = md5(`${PASSWORD}_${TIMESTAMP}`);
