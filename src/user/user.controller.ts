import { Controller, Delete, Get, Put, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard("jwt"))
  @Get("me")
  getMe(@Req() req) {
    return req.user;
  }

  @Get()
  async getAll() {
    return this.userService.getAll();
  }

  @Get()
  async getOne(@Req() req) {
    return this.userService.getOne(req.user.id);
  }

  @Put()
  async update(@Req() req) {
    return this.userService.update(req.user.id);
  }

  @Delete()
  async delete(@Req() req) {
    return this.userService.delete(req.user.id);
  }
}
