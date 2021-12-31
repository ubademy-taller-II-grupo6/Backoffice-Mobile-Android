import { Exam, Question, QuestionAnswerStudent, StatusExamStudent } from "../interface/ExamInterface";
import { Response } from "../interface/ResponseInterface";
import { Subscription } from "../interface/SubscriptionInterface";
import { userProfileInterface } from "../interface/userInterface";

export const examApi = {
    getExamsByCourse: async (idCourse: number) : Promise<Response<Exam[]>> => {
        
        let response = await  fetch(`http://desolate-bastion-59697.herokuapp.com/exams?id_course=${idCourse}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        let json = await response.json();
        let responseFinal : Response<Exam[]> = {} as Response<Exam[]>;

        let stringCourseWithoutExam : string = "No se encontraron examenes";

        if (json.message == null)
            responseFinal.data = json;
        else
            if (json.message == stringCourseWithoutExam)
                responseFinal.data = [];
            else
                responseFinal.message = json.detail?.error ?? "Ha ocurrido un error inexperado";

        return responseFinal;
    },

    getExamsPublishedByCourse: async (idCourse: number) : Promise<Response<Exam[]>> => {
        
        let responseFinal : Response<Exam[]> = await examApi.getExamsByCourse(idCourse);

        if ((responseFinal.data != null))
            responseFinal.data = responseFinal.data.filter(x => x.published);

        return responseFinal;
    },

    createExam: async (exam: Exam) : Promise<Response<number>> => {    
        
        var body = {
            "id_creator": exam.id_creator,
            "id_course": exam.id_course,
            "title": exam.title,
            "description": exam.description,
            "published": exam.published
        };
        
        let response = await  fetch(`http://desolate-bastion-59697.herokuapp.com/exams/`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        
        let json = await response.json();
        let responseFinal : Response<number> = {} as Response<number>;
        
        if (json.id_exam != null)
            responseFinal.data = json.id_exam;
        else
            responseFinal.message = "Ha ocurrido un error inexperado al crear el exámen";
        
        return responseFinal;
    },

    createQuestion: async (question: Question, idExam: number) : Promise<Response<number>> => {       
        var body = {
            "idexam": idExam,
            "num_question": question.num_question,
            "description": question.description,
            "answer": question.answer
        };

        let response = await  fetch(`https://ubademy-exams.herokuapp.com/exams/questions/`, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
        let json = await response.json();
        let responseFinal : Response<number> = {} as Response<number>;

        if (json.idquestion != null)
            responseFinal.data = json.idquestion;
        else
            responseFinal.message = "Ha ocurrido un error inexperado al crear el exámen";
        
        return responseFinal;
    },

    getExamsScoreByStudent: async (idExam: number, idStudent: number) : Promise<Response<StatusExamStudent>> => {
        
        let response = await  fetch(`http://desolate-bastion-59697.herokuapp.com/exams/${idExam}/${idStudent}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        let json = await response.json();
        let responseFinal : Response<StatusExamStudent> = {} as Response<StatusExamStudent>;

        responseFinal.data = json;

        return responseFinal;
    },

    sendAnswer: async (answerStudent: QuestionAnswerStudent) : Promise<Response<string>> => {

        let response = await  fetch(`http://desolate-bastion-59697.herokuapp.com/exams/questions/answers`, {
          method: 'POST',
          body: JSON.stringify(answerStudent),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
        let json = await response.json();
        let responseFinal : Response<string> = {} as Response<string>;

        if (json.detail != null)
            responseFinal.message = "Ha ocurrido un error inexperado al crear el exámen";
        else
            responseFinal.data = "Respuesta enviada exitosamente";
        
        return responseFinal;
    }, 
}