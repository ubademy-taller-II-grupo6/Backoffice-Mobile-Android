import { Response } from "../interface/ResponseInterface";
import { Subscription } from "../interface/SubscriptionInterface";

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
}