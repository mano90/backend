const express = require("express");
const bodyParser = require("body-parser");
import { AppConfig } from "./Contrainte/Config/AppConfig/AppConfig";

const app = express();
app.use(AppConfig.allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(3000);
