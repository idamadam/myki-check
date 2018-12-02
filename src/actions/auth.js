import * as Keychain from 'react-native-keychain'

export async function storeLogin(username, password) {
    await Keychain.setGenericPassword(username, password)
}