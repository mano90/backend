import { Request, Response } from "express";
import Container from "typedi";
import { Data } from "../Interfaces/data";
import { GoogleService } from "../Services/googleService";
let googleService: GoogleService = Container.get(GoogleService);
export class LicenseController {
  async liste(req: Request, resp: Response) {
    try {
      let quantity: number = 5;
      let key = req.params.quantity;
      if (key) {
        if (!isNaN(+key) && +key >= 0) quantity = Number(key);
      }
      const liste: any[] = await googleService.executeQuery(
        "SELECT licenses.license AS license,count(*) AS total FROM `bigquery-public-data.github_repos.sample_repos` AS repo INNER JOIN `bigquery-public-data.github_repos.licenses` AS licenses ON repo.repo_name = licenses.repo_name GROUP BY license ORDER BY total DESC LIMIT " +
          quantity
      );
      const toReturn: Data[] = liste.map((e) => {
        const t: Data = {
          label: e.license,
          quantity: e.total,
        };
        return t;
      });
      resp.status(200).send(toReturn);
    } catch (error: any) {
      resp.status(500).send((error.toString(), true));
    }
  }
}
