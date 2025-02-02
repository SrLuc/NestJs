import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./DTO/index";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signin")
  singIn(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  }

  @Post("signup")
  signUp(@Body() dto: AuthDto) {
    return this.authService.signUp(dto);
  }
}
