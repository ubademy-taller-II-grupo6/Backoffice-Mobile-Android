export interface userProfileInterface {
    id: number;
    blocked: boolean;
    email: string;
    lastname: string;
    name: string;
    subscription: string;
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