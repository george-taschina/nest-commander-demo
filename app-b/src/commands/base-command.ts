import { AxiosError } from "axios";
import { ApiClient } from "../api-client";

export abstract class BaseCommand {
  protected apiClient: ApiClient;

  constructor() {
    this.apiClient = ApiClient.newInstance();
  }

  protected async handleError(error: unknown): Promise<void> {
    if (error instanceof AxiosError) {
      console.error(error.response?.data);
    } else {
      console.error("Errore sconosciuto:", error);
    }
  }
}
