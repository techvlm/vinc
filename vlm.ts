// deno-lint-ignore-file
import { Application, bold, cyan, green, magenta, oakCors } from './vlmapp/deps.ts';
import { vlmrouter } from './vlmapp/vlmrouter.ts';

// deno-lint-ignore-file

const vlmapp = new Application();

vlmapp.use(vlmrouter.routes());
vlmapp.use(vlmrouter.allowedMethods());
vlmapp.use(oakCors())
vlmapp.addEventListener('listen',({
    hostname,port,secure
})=>{
    console.log(bold(magenta('[x] VLM :)')),
    cyan('server is listening on port '),
    green(`${secure ? 'https://':'http://'}${hostname || "127.0.0.1"}:${port}`));
})
await vlmapp.listen({port:5050})
