export class AuthResponseDto{
    id:number;
    name:string;
    email:string;
    role:string;
    bio:string;
    isActive:Boolean;
    mobile:string;
    createdAt: Date;
}

export class LoginResponseDto{
    user:AuthResponseDto;
    accessToken:string;
    tokenType:string;
    expiresIn:number;   // in seconds (86400 for 24 hours)
}