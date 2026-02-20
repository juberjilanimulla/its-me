export class AuthResponseDto{
    id:number;
    firstName:string;
    middleName?:string;
    lastName:string;
    email:string;
    isActive:Boolean;
    mobile?:string;
    createdAt: Date;
}

export class LoginResponseDto{
    user:AuthResponseDto;
    accessToken:string;
    tokenType:string;
    expiresIn:number;   // in seconds (86400 for 24 hours)
}