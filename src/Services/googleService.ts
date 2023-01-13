import { Service } from "typedi";
const { BigQuery } = require("@google-cloud/bigquery");

@Service()
export class GoogleService {
  private bigQuery = new BigQuery({
    projectId: "micro-elysium-374513",
    keyFilename: "./key.json",
  });
  async executeQuery(query: string) {
    try {
      const [rows] = await this.bigQuery.query({ query: query });
      return rows;
    } catch (err) {
      console.error(`Erreur lors de l'exécution de la requête: ${err}`);
    }
  }
}
