import { Request, Response } from "express";
import { Data } from "../Interfaces/data";

export class LanguageController {
  liste(req: Request, resp: Response) {
    try {
      const liste: Data[] = [];
      resp.status(200).send(liste);
    } catch (error: any) {
      resp.status(500).send((error.toString(), true));
    }
  }
}
