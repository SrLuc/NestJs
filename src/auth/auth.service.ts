import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable({})
export class AuthService {
    constructor(private prismaService:PrismaService){}
    
    signIn() {
        return "Hello SignIn";
    }
    
    signUp() {
        return { message: "Hello SignUp" };
    }
}
