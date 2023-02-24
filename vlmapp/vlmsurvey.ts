// deno-lint-ignore-file
import { RouterContext } from './deps.ts';

// deno-lint-ignore-file
class vlmsurvey{
    async vlmgetall(ctx:RouterContext<string,any>){}

    async vlmgetsingle(ctx:RouterContext<string,any>){}

    async vlmcreate(ctx:RouterContext<string,any>){}

    async vlmdelete(ctx:RouterContext<string,any>){}
}

const mysurvey = new vlmsurvey();
export default mysurvey;