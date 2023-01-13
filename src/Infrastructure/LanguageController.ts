import { Request, Response } from "express";
import Container from "typedi";
import { Data } from "../Interfaces/data";
import { GoogleService } from "../Services/googleService";

let googleService: GoogleService = Container.get(GoogleService);
export class LanguageController {
  async liste(req: Request, resp: Response) {
    try {
      const liste: any[] = await googleService.executeQuery(
        "SELECT arr.name AS LANGUAGE, sum(arr.bytes) AS total_bytes FROM `bigquery-public-data.github_repos.languages`, UNNEST(LANGUAGE) arr GROUP BY LANGUAGE ORDER BY total_bytes DESC LIMIT 10"
      );
      const toReturn: Data[] = liste.map((e) => {
        const t: Data = {
          label: e.language,
          quantity: e.total_bytes,
        };
        return t;
      });
      resp.status(200).send(toReturn);
    } catch (error: any) {
      resp.status(500).send((error.toString(), true));
    }
  }
}
