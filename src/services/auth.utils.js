import { getData } from "./store.manager";

export async function prepareHeaderWithToken() {

    const accessToken = await getData( '@access_token' );

    if ( !accessToken ) throw new Error('Unauthorized');

    return { headers: { "Authorization": `Bearer ${accessToken}` } };
}

