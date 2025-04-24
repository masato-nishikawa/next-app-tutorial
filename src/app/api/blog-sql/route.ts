import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool();

const createTableQuery = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
`;

export async function GET() {
  try {
    await pool.query(createTableQuery);
    return NextResponse.json({ message: "テーブル作成成功" });
  } catch (error) {
    // エラー詳細を返す（開発時限定）
    console.error("テーブル作成エラー:", error);
    return NextResponse.json(
      {
        error: "テーブル作成に失敗しました",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
