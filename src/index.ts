const express = require("express");
const bodyParser = require("body-parser");
import { Request, Response } from "express";
import { AppConfig } from "./Contrainte/Config/AppConfig/AppConfig";
import { routes } from "./Contrainte/Config/Routes/AppRoute";
const app = express();
app.use(AppConfig.allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes.forEach((route) => {
  (app as any)[route["method"]](
    route["route"],
    (req: Request, res: Response, next: Function) => {
      const result = new (route["controller"] as any)()
        [route["action"]](req, res, next)
        .then(() => next)
        .catch((err: any) => next(err));
    }
  );
});

app.listen(3000);
