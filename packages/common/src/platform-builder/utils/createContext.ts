import {InjectorService} from "@tsed/di";
import {PlatformContext} from "../../platform/domain/PlatformContext";
import {PlatformRequest} from "../../platform/services/PlatformRequest";
import {PlatformResponse} from "../../platform/services/PlatformResponse";

const uuidv4 = require("uuid/v4");
const defaultReqIdBuilder = () => uuidv4().replace(/-/gi, "");

/**
 * Create the TsED context to wrap request, response, injector, etc...
 * @param injector
 * @param req
 * @param res
 */
export async function createContext(injector: InjectorService, req: any, res: any): Promise<PlatformContext> {
  const {level, ignoreUrlPatterns, maxStackSize, reqIdBuilder = defaultReqIdBuilder} = injector.settings.logger;

  const id = reqIdBuilder();
  const request = PlatformRequest.create(injector, req);
  const response = PlatformResponse.create(injector, res);

  const ctx = new PlatformContext({
    id,
    logger: injector.logger,
    url: request.url,
    ignoreUrlPatterns,
    level,
    maxStackSize,
    injector,
    response,
    request
  });

  req.$ctx = ctx;

  response.onEnd(async () => {
    await ctx.emit("$onResponse", ctx);
    await ctx.destroy();
    delete req.$ctx;
  });

  await ctx.emit("$onRequest", ctx);

  return ctx;
}
