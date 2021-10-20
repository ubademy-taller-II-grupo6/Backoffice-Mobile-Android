export interface userProfile {
    user_name: string;
    user_lastname: string;
    user_email: string;
    user_profile: string;
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