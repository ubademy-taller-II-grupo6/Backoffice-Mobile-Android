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
}