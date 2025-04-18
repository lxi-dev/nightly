// src/server/utils/logActivity.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const logActivity = async ({
  userId,
  type,
  targetType,
  targetId,
  description,
}: {
  userId: string;
  type: string;
  targetType: string;
  targetId?: string;
  description?: string;
}) => {
  try {
    await prisma.activity.create({
      data: {
        userId,
        type,
        targetType,
        targetId,
        description,
      },
    });
  } catch (error) {
    console.error("Failed to log activity:", error);
  }
};