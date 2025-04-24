import { PrismaClient } from "@/generated/prisma"; 
import { NextResponse } from "next/server";
import { main } from "../route";

const prisma = new PrismaClient();

// ブログ記事詳細取得用API
export const GET = async (req: Request, res: NextResponse) =>{
    try{
        const id:number = parseInt(req.url.split("/blog/")[1]);
        await main();
        // http://localhost:3000/api/blog/3
        const posts = await prisma.post.findFirst({where: { id }});
        return NextResponse.json({message: 'Success', posts}, {status: 200});
    }   catch(err) {
        return NextResponse.json({message: 'Error'}, {status: 500});
    }   finally{
        await prisma.$disconnect();
    }
};

// ブログ編集用API
export const PUT = async (req: Request, res: NextResponse) =>{
    try{
        const id:number = parseInt(req.url.split("/blog/")[1]);

        const  { title, description } = await req.json();

        await main();
        // http://localhost:3000/api/blog/3
        const posts = await prisma.post.update({
            data: { title, description},
            where: { id },
        });
        return NextResponse.json({message: 'Success', posts}, {status: 200});
    }   catch(err) {
        return NextResponse.json({message: 'Error'}, {status: 500});
    }   finally{
        await prisma.$disconnect();
    }
};

// 削除集用API
export const DELETE = async (req: Request, res: NextResponse) =>{
    try{
        const id:number = parseInt(req.url.split("/blog/")[1]);

        await main();
        // http://localhost:3000/api/blog/3
        const posts = await prisma.post.delete({ 
            where: { id } 
        });
        return NextResponse.json({message: 'Success', posts}, {status: 200});
    }   catch(err) {
        return NextResponse.json({message: 'Error'}, {status: 500});
    }   finally{
        await prisma.$disconnect();
    }
};