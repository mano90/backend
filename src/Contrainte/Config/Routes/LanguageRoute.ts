import { Container } from "typedi";
import { LanguageController } from "../../../Infrastructure/LanguageController";
import { RouteFactory } from "../../Factory/RouteFactory";
const routeFactory: RouteFactory = Container.get(RouteFactory);
export const languageRoute = [
  routeFactory.createGetRoute(
    "/api/language/liste",
    "liste",
    LanguageController
  ),
];
