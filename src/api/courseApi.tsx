import { Course, CourseByUser } from "../interface/CourseInterface";
import { Response } from "../interface/ResponseInterface";

export const courseApi = {
    getCourseById: async (idCourse: number) : Promise<Response<Course>> => {
          let response = await  fetch('http://secret-ocean-67843.herokuapp.com/courses/' + idCourse, {
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

    getListCourses: async () : Promise<Response<Course[]>> => {
        let response = await  fetch('http://secret-ocean-67843.herokuapp.com/courses/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        let json = await response.json();
        let responseFinal : Response<Course[]> = {} as Response<Course[]>;

        if (json.message != null)
            responseFinal.message = json;
        else
            responseFinal.data = json;

        return responseFinal;
    },

    getListCoursesByUser: async (idUser: number) : Promise<Response<Course[]>> => {
          let response = await  fetch(`http://secret-ocean-67843.herokuapp.com/courses/favorites/${idUser}`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          });
          let json = await response.json();
          let responseFinal : Response<Course[]> = {} as Response<Course[]>;
  
          if (json.message != null)
              responseFinal.message = json;
          else
              responseFinal.data = json;
              
          return responseFinal;
    },

    setFavorite: async (idStudent: number, idCourse: number) : Promise<void> => {
        let body = {
            "course_id": idCourse,
            "student_id": idStudent
        };
        
        let response = await  fetch(`http://secret-ocean-67843.herokuapp.com/courses/favorites`, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });

        let json = await response.json();
        return json;
    },

    deleteFavorite: async (idStudent: number, idCourse: number) : Promise<void> => {
        let body = {
            "course_id": idCourse,
            "student_id": idStudent
        };

        let response = await  fetch(`http://secret-ocean-67843.herokuapp.com/courses/favorites`, {
          method: 'DELETE',
          body: JSON.stringify(body),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
        let json = await response.json();
        return json;
    }
}