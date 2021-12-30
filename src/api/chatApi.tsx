import React from 'react'
import { Response } from "../interface/ResponseInterface";

export const chatApi = () => {
    let getAllUsers = async() => {
        let user:any = await  fetch('https://obscure-wildwood-00771.herokuapp.com/users', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
        let json:[any] =  user.json();
        return json
      }
    return { 
        getAllUsers
    }
}


export const chatApi2 = {
    /*let getAllUsers = async() => {
        let user:any = await  fetch('https://obscure-wildwood-00771.herokuapp.com/users', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
        let json:[any] =  user;
        return json
      }
    return { 
        getAllUsers
    }*/
    getAllUsers: async () : Promise<Response<any>> => {
        let response = await  fetch('https://obscure-wildwood-00771.herokuapp.com/users', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
        let json = await response.json();

        return json;
  },
}

