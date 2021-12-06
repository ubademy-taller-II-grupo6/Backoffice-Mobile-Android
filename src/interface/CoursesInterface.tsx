export interface Course {
    id: number,
    title: string,
    description: string,
    idtype:	string,
    location: string,
    price:	number,
    link: string,
    idcreator: number
}

export interface CourseByUser {
    idstudent: number,
    idcourse: number
}