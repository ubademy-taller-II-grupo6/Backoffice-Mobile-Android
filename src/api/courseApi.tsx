import { Course, CourseByUser, CourseConditions } from "../interface/CourseInterface";
import { Response } from "../interface/ResponseInterface";

export const courseApi = {
    getCourseById: async (idCourse: number) : Promise<Response<Course>> => {
          let response = await  fetch('http://secret-ocean-67843.herokuapp.com/courses?id=' + idCourse, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          });
          let json = await response.json();
          let responseFinal : Response<Course> = {} as Response<Course>;
  
          if (json.message != null)
              responseFinal.message = json;
          else
              responseFinal.data = json[0];
  
          return responseFinal;
    },

    getListCourses: async (idCategory: string | undefined = undefined, idSubscription: string | undefined = undefined) : Promise<Response<Course[]>> => {
        
        let urlString : string = 'http://secret-ocean-67843.herokuapp.com/courses';

        if (idCategory && idSubscription) {
            urlString = `${urlString}?category=${idCategory}&subscription=${idSubscription}`;
        } else if (idCategory && !idSubscription) {
            urlString = `${urlString}?category=${idCategory}`;
        } else if (!idCategory && idSubscription) {
            urlString = `${urlString}?subscription=${idSubscription}`;
        }
        
        let response = await  fetch(urlString, {
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
    },

    getInscriptionsByStudent: async (idStudent: number) : Promise<Response<number[]>> => {
        let response = await  fetch('https://morning-atoll-94461.herokuapp.com/inscriptions/student/' + idStudent, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
        let json = await response.json();
        let responseFinal : Response<number[]> = {} as Response<number[]>;

        if (json.message != null)
            responseFinal.message = json;
        else
            responseFinal.data = Object.keys(json).map(x => parseInt(x));

        return responseFinal;
  },

    enrollStudent: async (idStudent: number, idCourse: number) : Promise<Response<void>> => {
        let body = {
            "idcourse": idCourse,
            "idstudent": idStudent
        };

        let response = await  fetch('https://morning-atoll-94461.herokuapp.com/inscriptions', {
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
            responseFinal.message = json;

        return responseFinal;
    },

    unenrollStudent: async (idStudent: number, idCourse: number) : Promise<Response<void>> => {
        let body = {
            "idcourse": idCourse,
            "idstudent": idStudent
        };

        let response = await  fetch(`https://morning-atoll-94461.herokuapp.com/inscriptions`, {
          method: 'DELETE',
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
            responseFinal.message = json;

        return responseFinal;
    },

    getEnrollConditionsByCourse: async (idCourse: number) : Promise<Response<CourseConditions>> => {
        
        let response = await  fetch(`https://morning-atoll-94461.herokuapp.com/inscriptions/conditions/enrollment/${idCourse}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        let json = await response.json();
        let responseFinal : Response<CourseConditions> = {} as Response<CourseConditions>;

        if (json.message != null)
            responseFinal.message = json;
        else
            responseFinal.data = json;

        return responseFinal;
    },

    getUnenrollConditionsByCourse: async (idCourse: number) : Promise<Response<CourseConditions>> => {
        
        let response = await  fetch(`https://morning-atoll-94461.herokuapp.com/inscriptions/conditions/unenrollment/${idCourse}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        let json = await response.json();
        let responseFinal : Response<CourseConditions> = {} as Response<CourseConditions>;

        if (json.message != null)
            responseFinal.message = json;
        else
            responseFinal.data = json;

        return responseFinal;
    },

    getCacheCategories: async () : Promise<Response<string[]>> => {
        
        let response = await  fetch('http://secret-ocean-67843.herokuapp.com/courses/categories', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        let json = await response.json();
        let responseFinal : Response<string[]> = {} as Response<string[]>;

        if (json.message != null)
            responseFinal.message = json;
        else
            responseFinal.data = json;

        return responseFinal;
    },
}