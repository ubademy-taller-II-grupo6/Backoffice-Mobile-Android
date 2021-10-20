import React, { useState } from 'react'

export const loginApi =async  () => {
    let response = await  fetch('https://reactnative.dev/movies.json', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
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