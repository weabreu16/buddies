import HTTPClient from "./HTTPClient";
import { storeData } from './store.manager';

export async function login( username, password ) {

    let response = await HTTPClient.post('http://localhost:3000/auth/login', { username, password });

    await storeData( '@access_token', response.data.access_token );
}

export async function signup( username, password ) {

    let response = await HTTPClient.post('http://localhost:3000/users', { username, password });

    return response.statusCode === 201;
}

const UserService = { login, signup };

export default UserService;