import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService {
    
    signIn() {
        return "Hello SignIn";
    }
    
    signUp() {
        return { message: "Hello SignUp" };
    }
}
