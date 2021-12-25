export interface Course {
    id: number,
    title: string,
    description: string,
    hashtags: string,
    category: string,
    subscription: string,
    creator: number,
    unenrollment_conditions: string,
    type: string,
    exams: number,
    location: string,
    enrollment_conditions: string
}

export interface CourseByUser {
    idstudent: number,
    idcourse: number
}

export interface CourseConditions {
    Condiciones: string
}