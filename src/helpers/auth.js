import { SecureStore } from 'expo';

export async function storeLogin(username, password) {
    await SecureStore.setItemAsync('MYKI_USERNAME', username);
    await SecureStore.setItemAsync('MYKI_PASSWORD', password);
}