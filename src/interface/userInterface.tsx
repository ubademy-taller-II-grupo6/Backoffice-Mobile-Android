export interface userProfileInterface {
    id: number,
    name: string,
    lastname: string,
    email: string,
    latitude: string,
    longitude: string,
    blocked: boolean,
    subscription: string
}
 
export interface profileUsers {
    profiles:profileUser[]
}

interface profileUser {
  profile_id: number;
  profile_name: string;
}

export interface responseError {
  message: string;
}

export enum TypesUser {
    Estudiante = 'estudiante',
    Colaborador = 'colaborador',
    Profesor = 'profesor'
}