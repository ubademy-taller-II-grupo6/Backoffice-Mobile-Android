import React, { useState } from 'react'

export const loginApi =async  () => {
    let response = await  fetch('https://ddf29908-ec42-4f78-9e68-e880d130ec20.mock.pstmn.io/Ubademy', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    let json = await response.json();
    return json.movies;
}
/*return fetch('https://reactnative.dev/movies.json',{
        method:'GET',
        headers:{
            'Accept':'application/json',
            'Content-type':'application/json'
        }
    }).then((res)=>res.json())
    .then((json) => {
        return (json);
      })
      .catch((error) => {
        console.error(error);
      });
      const [isLoading, setLoading] = useState(true);
        const [data, setData] = useState([]);


        const getMoviesFromApi = () => {
            console.log("ddd")

            return fetch('https://reactnative.dev/movies.json')
              .then((response) => response.json())
              .then((json) => {
                return json.movies;
              })
              .catch((error) => {
                console.error(error);
              });
          };

     return {
         isLoading,
         data,
         getMoviesFromApi
     }*/