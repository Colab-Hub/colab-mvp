import dotenv from "dotenv";
import { Pool, type PoolClient, type QueryResult } from "pg";

dotenv.config();

export class DatabaseHandler {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: process.env.DB_USER || "",
      password: process.env.DB_PASSWORD || "",
      host: process.env.DB_HOST || "",
      port: Number.parseInt(process.env.DB_PORT || "0", 10),
      database: process.env.DATABASE || "",
    });
    console.log("Connected to database");
  }

  async runQuery(query: string, values: any[]): Promise<QueryResult> {
    const client: PoolClient = await this.pool.connect();
    try {
      const result: QueryResult = await client.query(query, values);
      return result;
    } finally {
      client.release();
    }
  }
}

export const databaseHandler = new DatabaseHandler();
