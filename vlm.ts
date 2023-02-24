// deno-lint-ignore-file
import { logger } from './vlmapp/api.ts';
import { Application, bold, brightGreen, cyan, magenta, oakCors } from './vlmapp/deps.ts';
import { jsonMiddleware } from './vlmapp/validate.ts';
import vlmrouter from './vlmapp/vlmrouter.ts';
import { vlmauth } from './vlmapp/vlmuser.ts';

// deno-lint-ignore-file
const vlmapp= new Application();
vlmapp.use(vlmauth)
// vlmapp.use(vlmvalidate)
vlmapp.use(jsonMiddleware)
vlmapp.use(vlmrouter.routes());
vlmapp.use(vlmrouter.allowedMethods());
vlmapp.use(oakCors({
    credentials:true,
    origin: async () => {
         // Simulate asynchronous task
        return ["https://vince.den+o.dev/", /^.*localhost:(3000,9090,9700)$/];
       },
}));

// const controller = new AbortController();
// const { signal,abort } = controller;

// controller.abort();
vlmapp.addEventListener('listen',({
    hostname,port,secure
})=>{
    console.log(bold(magenta('[*] VLM ')),
    cyan('server is listening on port '),
    brightGreen(`${secure ? 'https://':'http://'}${"127.0.0.1"??hostname}:${port}  :) `));
    vlmapp.use(logger)
    return;
})
await vlmapp.listen({port:5050})



