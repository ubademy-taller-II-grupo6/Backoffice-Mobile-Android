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
        let json = await response.json();
        let responseFinal : Response<userProfileInterface[]> = {} as Response<userProfileInterface[]>;

        if (json.message != null)
            responseFinal.message = json;
        else
            responseFinal.data = json;

        return responseFinal.data?.find(x => x.email === email) ?? {} as userProfileInterface;
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
}