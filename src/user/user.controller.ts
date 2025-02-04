import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("users")
export class UserController {
  @UseGuards(AuthGuard("jwt"))
  @Get("me")
  getMe(@Req() req) {
    return req.user;
  }
}
