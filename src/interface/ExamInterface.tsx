export interface Exam {
    title: string,
    idexam: number,
    description: string,
    idcreator: number,
    idcourse: number,
    ispublished: boolean
}

export interface Question {
    num_question: number,
    description: string,
    answer: boolean,
    idexam: number
}
