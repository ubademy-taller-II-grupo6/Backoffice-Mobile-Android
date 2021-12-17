import { Course, CourseByUser } from "../interface/CourseInterface";

export const courseApi = {
    getCourseById: async (idCourse: number) : Promise<Course> => {
          let response = await  fetch('https://ubademy-course.herokuapp.com/courses/' + idCourse, {
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

    getListCourses: async () : Promise<Course[]> => {
          let response = await  fetch('https://ubademy-course.herokuapp.com/courses/', {
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

    getListCoursesByUser: async (idUser: number) : Promise<CourseByUser[]> => {
          let response = await  fetch(`https://ubademy-course.herokuapp.com/courses/favorites/${idUser}`, {
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

    setFavorite: async (idStudent: number, idCourse: number) : Promise<void> => {
        let body = {
            "idcourse": idCourse,
            "idstudent": idStudent
        };

        let response = await  fetch(`https://ubademy-course.herokuapp.com/courses/favorites`, {
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
            "idcourse": idCourse,
            "idstudent": idStudent
        };

        let response = await  fetch(`https://ubademy-course.herokuapp.com/courses/favorites`, {
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