import axios from 'axios';

const HTTPClient = {

    async get( url, requestOptions = undefined ) {
        const requestResponse = await axios.get( url, requestOptions );

        return { data: requestResponse.data, statusCode: requestResponse.status };
    },

    async post( url, body = {}, requestOptions = undefined ) {
        const requestResponse = await axios.post( url, body, requestOptions );

        return { data: requestResponse.data, statusCode: requestResponse.status };
    },

    async patch( url, body = {}, requestOptions = undefined ) {
        const requestResponse = await axios.patch( url, body, requestOptions );

        return { data: requestResponse.data, statusCode: requestResponse.status };
    },

    async delete( url, requestOptions = undefined ) {
        const requestResponse = await axios.delete( url, requestOptions );

        return { data: requestResponse.data, statusCode: requestResponse.status };
    }
}

export default HTTPClient;