import {
    vlmcheck,
    vlmcss,
    vlmcssboot,
    vlmdelete,
    vlmhome,
    vlmimg,
    vlmjs,
    vlmjsboot,
    vlmlist,
    vlmlistid,
    vlmlogin,
    vlmpatch,
    vlmpostsignin,
    vlmpostsignup,
    vlmregister,
    vlmtake,
    vlmtake1,
} from './api.ts';
import { Router } from './deps.ts';
import { vlmauthmiddleware, vlmvalidate } from './validate.ts';
import { vlmauth } from './vlmuser.ts';

// deno-lint-ignore-file
// deno-lint-ignore-file require-await
const vlmrouter =new Router();


vlmrouter
.get("/",vlmhome)
.get('/valid',vlmvalidate ,vlmcheck)
.patch('/valid',vlmvalidate)
.get("/logout",vlmtake)

.get("/dashboard",vlmauthmiddleware,vlmtake1)
.use("/dashboard",vlmauth)
.get("/signup",vlmregister)
.get("/signin",vlmlogin)
.get('/list', vlmlist)
.get('/list/:id', vlmlistid)
.patch('/list/:id', vlmpatch)
.delete('/list/:id', vlmdelete)
.post('/signup',vlmpostsignup)
.post('/signin',vlmpostsignin)
.get("/js/:file",vlmjs)

.get('/css/:file',vlmcss)
.get("/js/boot/:file", vlmjsboot)
.get('/css/boot/:file',vlmcssboot)
.get('/img/:file',vlmimg)

export default vlmrouter;