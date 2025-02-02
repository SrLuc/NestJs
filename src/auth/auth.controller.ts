import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./DTO/index";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signin")
  singIn(@Body() dto: AuthDto) {
    console.log(dto);
    return this.authService.signIn();
  }

  @Post("signup")
  signUp() {
    return this.authService.signUp();
  }
}
