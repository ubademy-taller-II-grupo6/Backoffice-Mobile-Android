import { userProfileInterface } from "./userInterface";

export interface AuthState{
    isLoggedIn:boolean;
    provider:string;
    emailVerified:boolean;
    username?:string;
    email:string;
    potho:string;
    stsTokenManager:StsTokenManager,
    typeUser:string,
    userProfile:userProfileInterface
}

export interface AuthContextProps{
    authState: AuthState;
    signIn: (payload: AuthState)=>void;
    lognOut:()=>void;
    changeAuthState:(payload:any)=>void;
}
export interface StsTokenManager{
    accessToken:string,
    apiKey:string,
    expirationTime:number,
    refreshToken:string,
    uid:string
}

export interface ResponseRegisterEmailFirebase {
    additionalUserInfo: AdditionalUserInfoFirebase;
    credential?: any;
    operationType: string;
    user: UserFirebase;
  }
  
 export interface UserFirebase {
    apiKey: string;
    appName: string;
    authDomain: string;
    createdAt: string;
    displayName?: any;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    lastLoginAt: string;
    multiFactor: MultiFactorFirebase;
    phoneNumber?: any;
    photoURL?: any;
    providerData: ProviderDatumFirebase[];
    redirectEventId?: any;
    stsTokenManager: StsTokenManagerFirebase;
    tenantId?: any;
    uid: string;
  }
  
  interface StsTokenManagerFirebase {
    accessToken: string;
    apiKey: string;
    expirationTime: number;
    refreshToken: string;
  }
  
  interface ProviderDatumFirebase {
    displayName?: any;
    email: string;
    phoneNumber?: any;
    photoURL?: any;
    providerId: string;
    uid: string;
  }
  
  interface MultiFactorFirebase {
    enrolledFactors: any[];
  }
  
  interface AdditionalUserInfoFirebase {
    isNewUser: boolean;
    providerId: string;
  }

  export interface FirebaseResponseCode{
    codes: ResponseDiccionary[];
  }

  export interface ResponseDiccionary{
    code:string,
    response:string
  }