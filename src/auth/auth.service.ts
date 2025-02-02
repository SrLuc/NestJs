import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./DTO/index";
import * as argon from "argon2";

@Injectable({})
export class AuthService {
  constructor(private prismaService: PrismaService) {}

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
      return user;
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
}
