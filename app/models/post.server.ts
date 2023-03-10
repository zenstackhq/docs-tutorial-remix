import type { Post, User } from "@prisma/client";
import { getEnhancedPrisma } from "~/db.server";

export function getPosts({ userId }: { userId: User["id"] }) {
  return getEnhancedPrisma(userId).post.findMany({
    orderBy: { updatedAt: "desc" },
  });
}

export function createPost({
  body,
  title,
  userId,
}: Pick<Post, "body" | "title"> & {
  userId: User["id"];
}) {
  return getEnhancedPrisma(userId).post.create({
    data: {
      title,
      body,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function getPost({
  id,
  userId,
}: Pick<Post, "id"> & {
  userId: User["id"];
}) {
  return getEnhancedPrisma(userId).post.findUnique({
    where: { id },
  });
}

export function deletePost({
  id,
  userId,
}: Pick<Post, "id"> & { userId: User["id"] }) {
  return getEnhancedPrisma(userId).post.delete({
    where: { id },
  });
}

export function publishPost({
  id,
  userId,
}: Pick<Post, "id"> & { userId: User["id"] }) {
  return getEnhancedPrisma(userId).post.update({
    where: { id },
    data: { published: true },
  });
}

export function unpublishPost({
  id,
  userId,
}: Pick<Post, "id"> & { userId: User["id"] }) {
  return getEnhancedPrisma(userId).post.update({
    where: { id },
    data: { published: false },
  });
}
