import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.user.findMany();
  }

  async getOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: number) {
    return this.prisma.user.update({ where: { id }, data: {} });
  }

  async delete(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
