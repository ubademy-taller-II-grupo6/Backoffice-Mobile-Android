export interface Exam {
    title: string,
    id_exam: number,
    description: string,
    id_creator: number,
    id_course: number,
    published: boolean
}

export interface Question {
    num_question: number,
    description: string,
    answer: boolean,
    id_exam: number,
    id_creator: number
}

export interface StatusExamStudent {
    status: string,
    score: string
}

export interface QuestionAnswerStudent {
    id_exam: number,
    id_student: number
    num_question: number,
    answer: boolean
}

export interface StatusExamStudentWithExam {
    id_exam: number,
    status: StatusExamStudent | undefined 
}


export interface AnswerStudent {
    id_exam: number,
    num_question: number,
    answer: boolean | null,
    id_student: number
}
