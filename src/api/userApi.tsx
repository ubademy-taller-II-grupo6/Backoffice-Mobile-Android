import { Response } from "../interface/ResponseInterface";
import { Subscription } from "../interface/SubscriptionInterface";
import { userProfileInterface } from "../interface/userInterface";

export const userApi = {
    getCacheSubscriptions: async () : Promise<Response<Subscription[]>> => {
        
        let response = await  fetch('https://obscure-wildwood-00771.herokuapp.com/subscriptions', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        let json = await response.json();
        let responseFinal : Response<Subscription[]> = {} as Response<Subscription[]>;

        if (json.message != null)
            responseFinal.message = json;
        else
            responseFinal.data = json;

        return responseFinal;
    },
    
    getUserByMail: async (email: string) : Promise<userProfileInterface> => {
        
        let response = await  fetch('https://obscure-wildwood-00771.herokuapp.com/users', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        //console.log("https://obscure-wildwood-00771.herokuapp.com/users")
        
        let json = await response.json();
        //console.log(json)
        let responseFinal : Response<userProfileInterface[]> = {} as Response<userProfileInterface[]>;

        if (json.message != null)
            responseFinal.message = json;
        else
            responseFinal.data = json;

        return responseFinal.data?.find(x => x.email.toLowerCase() === email.toLowerCase()) ?? {} as userProfileInterface;
    },
    
    getUserById: async (id: number) : Promise<userProfileInterface> => {
        
        let response = await  fetch(`https://obscure-wildwood-00771.herokuapp.com/users?user_id=${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        let json = await response.json();
        let responseFinal : Response<userProfileInterface> = {} as Response<userProfileInterface>;

        if (json.message != null)
            responseFinal.message = json;
        else
            responseFinal.data = json[0];

        return (responseFinal.data !== null) ? responseFinal.data : {} as userProfileInterface;
    },

    getAllUser: async () : Promise<any> => {
        
        let response = await  fetch(`https://obscure-wildwood-00771.herokuapp.com/users`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        let json = await response.json();
        let responseFinal : Response<any> = {} as Response<any>;

        if (json.message != null)
            responseFinal.message = json;
        else
            responseFinal.data = json;

        return (responseFinal.data !== null) ? responseFinal.data : {} as any;
    },

    getNewId: async (users:any) : Promise<any> => {
        let encontrado = false
        let userEncontrado = null
        let newId = 0
        while (!encontrado) {
            newId = Math.floor(Math.random() * (1000 - 0)) + 0
            userEncontrado = users.find((x:any) => {
                return x.id == newId
            })
            if(!userEncontrado) encontrado = true
        }
        return newId
    },

    updateUser: async (user: userProfileInterface) : Promise<Response<void>> => {
        
        let response = await  fetch(`https://obscure-wildwood-00771.herokuapp.com/users/${user.id}`, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        let json = await response.json();
        let responseFinal : Response<void> = {} as Response<void>;
        
        if ((json.message != null) && (json.message != "El usuario fue actualizado con éxito"))
            responseFinal.message = json.message;
        else
            responseFinal.data = json[0];

        return responseFinal;
    },

    registerUser: async (user: any) : Promise<any> => {
        
        let response = await  fetch(`https://obscure-wildwood-00771.herokuapp.com/users`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        let json = await response.json();
        let responseFinal : Response<any> = {} as Response<any>;
        
        if ((json.message != null) && (json.message != "El usuario fue registrado con éxito"))
            responseFinal.message = json.message;
        else
            responseFinal.data = json;

        return responseFinal;
    },
}