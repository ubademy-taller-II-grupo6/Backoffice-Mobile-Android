import { Exam } from "../interface/ExamInterface";
import { Response } from "../interface/ResponseInterface";
import { Subscription } from "../interface/SubscriptionInterface";
import { userProfileInterface } from "../interface/userInterface";

export const examApi = {
    getExamsByCourse: async (idCourse: number) : Promise<Response<Exam[]>> => {
        
        let response = await  fetch(`https://ubademy-exams.herokuapp.com/exams/courses/${idCourse}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        let json = await response.json();
        let responseFinal : Response<Exam[]> = {} as Response<Exam[]>;

        let stringCourseWithoutExam : string = `No existen examenes para el curso con id ${idCourse}`;

        if (json.detail == null)
            responseFinal.data = json;
        else
            if (json.detail.error == stringCourseWithoutExam)
                responseFinal.data = [];
            else
                responseFinal.message = json.detail?.error ?? "Ha ocurrido un error inexperado";

        return responseFinal;
    },

    getExamsPublishedByCourse: async (idCourse: number) : Promise<Response<Exam[]>> => {
        
        let responseFinal : Response<Exam[]> = await examApi.getExamsByCourse(idCourse);

        if ((responseFinal.data != null))
            responseFinal.data = responseFinal.data.filter(x => x.ispublished);

        return responseFinal;
    },

    createCourse: async (exam: Exam) : Promise<Response<string>> => {        
        let response = await  fetch(`https://ubademy-exams.herokuapp.com/exams`, {
          method: 'POST',
          body: JSON.stringify(exam),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
        let json = await response.json();
        let responseFinal : Response<string> = {} as Response<string>;

        if (json.detail == null)
            responseFinal.data = "Examen creado con éxito";
        else
            responseFinal.message = "Ha ocurrido un error inexperado al crear el exámen";
        
        return responseFinal;
    },
}