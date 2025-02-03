import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./DTO/index";
import * as argon from "argon2";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable({})
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}

  //create new user
  async signIn(dto: AuthDto) {
    //create new hash to password
    const hash = await argon.hash(dto.password);

    try {
      //save user in database
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          password: hash,
        },
      });

      //return user
      return this.signToken(user.id, user.email);
    } catch (e) {
      if (e.code === "P2002") {
        throw new BadRequestException("Email already exists");
      }
    }
  }

  //login an user that already exists
  async signUp(dto: AuthDto) {
    try {
      //find user by email
      const user = await this.prismaService.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      //if user not found
      if (!user) throw new ForbiddenException("Credentials Incorrect");

      //compare password
      const isValid = await argon.verify(user.password, dto.password);

      //if password is invalid
      if (!isValid) throw new BadRequestException("Invalid password");

      //return user
      return user;
    } catch (e) {
      throw new BadRequestException("User not found");
    }
  }

  async signToken(
    useId: number,
    email: string
  ): Promise<{ acess_token: string }> {
    // payload to token
    const payload = {
      userId: useId, // Inclui o ID do usuário no payload do token
      email: email, // Inclui o email do usuário no payload do token
    };

    // secret key
    const secret = this.config.get("JWT_SECRET"); // Obtém a chave secreta do arquivo .env

    // generate token
    const token = this.jwt.sign(payload, {
      secret, // Usa a chave secreta para assinar o token
      expiresIn: "15m", // Define o tempo de expiração do token (15 minutos)
    });

    return {
      acess_token: token,
    };
  }
}
