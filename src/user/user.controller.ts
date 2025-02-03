import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  // Add your routes here
  @Get("me")
  getMe() {
    return "hi me";
  }
}
