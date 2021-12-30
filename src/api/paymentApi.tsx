import { Response } from "../interface/ResponseInterface";
import { userProfileInterface } from "../interface/userInterface";

export const paymentApi = {
    
    paySubscription: async (idUser: number, amount: string) : Promise<Response<void>> => {
        
        let body = {
            "senderId": idUser.toString(),
            "amountInEthers": amount
        }

        let response = await  fetch(`https://infinite-caverns-43846.herokuapp.com/deposit`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        let json = await response.json();
        let responseFinal : Response<void> = {} as Response<void>;

        if (json.message != null)
            responseFinal.message = json.message;
        else
            responseFinal.data = json[0];

        return responseFinal;
    },
}