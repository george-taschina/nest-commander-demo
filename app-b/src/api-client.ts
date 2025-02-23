import axios from "axios";
import { Document } from "@shared/prisma-client";
import fs from "fs";
import path from "path";

const CONFIG_PATH = path.join(__dirname, "../.cli-config.json");

export class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.loadToken();
  }

  static newInstance() {
    return new this(process.env.APP_A_URL || "http://localhost:3000");
  }

  private loadToken(): void {
    if (fs.existsSync(CONFIG_PATH)) {
      const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
      this.token = config.token || null;
    }
  }

  private saveToken(token: string): void {
    this.token = token;
    const config = { token };
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), "utf-8");
  }

  async login(username: string, password: string): Promise<string> {
    const response = await axios.post<{ access_token: string }>(
      `${this.baseUrl}/auth/login`,
      {
        username,
        password,
      }
    );
    const token = response.data.access_token;
    this.saveToken(token);
    return token;
  }

  async getDocuments(): Promise<Document[]> {
    const response = await axios.get<Document[]>(`${this.baseUrl}/documents`);
    return response.data;
  }

  async getDocument(id: number): Promise<Document> {
    const response = await axios.get<Document>(
      `${this.baseUrl}/documents/${id}`
    );
    return response.data;
  }

  async saveDocument({
    content,
    owner,
  }: Omit<Document, "id" | "createdAt">): Promise<Document> {
    if (!this.token) throw new Error("Not authenticated");

    const response = await axios.post<Document>(
      `${this.baseUrl}/documents`,
      { content, owner },
      { headers: { Authorization: `Bearer ${this.token}` } }
    );

    return response.data;
  }

  async updateDocument(
    id: number,
    { content, owner }: Partial<Omit<Document, "createdAt" | "id">>
  ): Promise<Document> {
    if (!this.token) throw new Error("Not authenticated");

    const response = await axios.patch<Document>(
      `${this.baseUrl}/documents/${id}`,
      { content, owner },
      { headers: { Authorization: `Bearer ${this.token}` } }
    );

    return response.data;
  }

  async deleteDocument(id: number): Promise<void> {
    if (!this.token) throw new Error("Not authenticated");
    await axios.delete(`${this.baseUrl}/documents/${id}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }
}
