import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storeData( key, value ) {

    const jsonValue = JSON.stringify( value );

    await AsyncStorage.setItem( key, jsonValue );
}

export async function getData( key ) {

    const jsonValue = await AsyncStorage.getItem( key );

    return jsonValue != null ? JSON.parse( jsonValue ) : null;
}

export async function removeData( key ) {
    await AsyncStorage.removeItem( key );
}