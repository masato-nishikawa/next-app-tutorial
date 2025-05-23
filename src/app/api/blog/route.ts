import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("DB接続に失敗しました。");
  }
}

// ブログ取得用API
export const GET = async (req: Request, res: NextResponse) => {
  console.log("GETしたよ!");
  try {
    await main();
    const posts = await prisma.post.findMany();
    return NextResponse.json({ message: "Success", posts }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// ブログ投稿用API
export const POST = async (req: Request, res: NextResponse) => {
  console.log("POSTしたよ!");
  try {
    const { title, description } = await req.json();

    await main();
    const posts = await prisma.post.create({ data: { title, description } });
    return NextResponse.json({ message: "Success", posts }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
