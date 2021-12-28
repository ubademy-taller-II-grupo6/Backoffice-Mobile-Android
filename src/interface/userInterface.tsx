export interface userProfileInterface {
    blocked: boolean;
    email: string;
    id: string;
    lastname: string;
    name: string;
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