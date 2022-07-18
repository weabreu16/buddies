import HTTPClient from "./HTTPClient";
import { prepareHeaderWithToken } from "./auth.utils";

export async function getContacts() {

    const requestOptions = await prepareHeaderWithToken();
    
    const response = await HTTPClient.get('http://localhost:3000/contacts/user', requestOptions);

    return response.data;
}

export async function getContact( id ) {
    
    const requestOptions = await prepareHeaderWithToken();
    
    const response = await HTTPClient.get(`http://localhost:3000/contacts/${id}`, requestOptions);

    return response.data;
}

export async function addContact( contact ) {

    const requestOptions = await prepareHeaderWithToken();

    const response = await HTTPClient.post('http://localhost:3000/contacts', contact, requestOptions);

    return response.data;
}

export async function updateContact( contact ) {

    const requestOptions = await prepareHeaderWithToken();

    let { _id, ...updateContact } = contact;

    const response = await HTTPClient.patch(`http://localhost:3000/contacts/${_id}`, updateContact, requestOptions);

    return response === 200;
}

export async function removeContact( id ) {

    const requestOptions = await prepareHeaderWithToken();

    const response = await HTTPClient.delete(`http://localhost:3000/contacts/${id}`, requestOptions);

    return response === 200;
}

const ContactsService = {
    getContacts, getContact, addContact, updateContact, removeContact
}

export default ContactsService;