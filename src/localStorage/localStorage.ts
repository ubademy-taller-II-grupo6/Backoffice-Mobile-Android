import AsyncStorage from '@react-native-async-storage/async-storage';
import { userProfileInterface } from '../interface/userInterface';

class LocalStorage {
    keyStorage = "userMobileUbademyStorage";

    save = async (id: number, name: string, lastname: string, email: string, blocked: boolean, subscription: string) => {
        let user : userProfileInterface = {
            email: email,
            id: id,
            lastname: lastname,
            name: name,
            blocked: blocked,
            subscription: subscription,
            latitude: "",
            longitude: "",
        }
        const jsonValue = JSON.stringify(user)

        try {
            let value = await AsyncStorage.getItem(this.keyStorage);
            if (value != null) await this.remove();            
            await  AsyncStorage.setItem(this.keyStorage, jsonValue);
        } catch (e) {
            alert("Ha ocurrido un error inesperado")
        }
    }

    get = async () => {
        try {
            let value = await AsyncStorage.getItem(this.keyStorage);
            if(value != null) {
                return JSON.parse(value) as userProfileInterface;
            }
        } catch(e) {
            alert("Ha ocurrido un error inesperado")
        }
    }

    remove = async() => {
        await AsyncStorage.setItem(this.keyStorage, "")
    }

    isLoged = async() => {
        return (AsyncStorage.getItem(this.keyStorage) !== null);
    }

}

export const localStorage = new LocalStorage();