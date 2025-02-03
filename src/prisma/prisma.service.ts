import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(prisma: ConfigService) {
    super({
      datasources: {
        db: {
          url: prisma.get("DATABASE_URL"),
        },
      },
    });
  }
}
