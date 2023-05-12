import {
  vlmadmin,
  vlmadminpost,
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
import { auth, vlmauth } from './vlmuser.ts';

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
.get('/list',auth, vlmlist)
.get('/list/:id',auth, vlmlistid)
.patch('/list/:id', auth,vlmpatch)
.delete('/list/:id',auth, vlmdelete)
.post('/signup',vlmpostsignup)
.post('/signin',vlmpostsignin)
.get("/js/:file",vlmjs)
.get('/vlmadmin',vlmadmin)
.post("/vlmadmin",vlmadminpost)
.get('/css/:file',vlmcss)
.get("/js/boot/:file", vlmjsboot)
.get('/css/boot/:file',vlmcssboot)
.get('/img/:file',vlmimg)

export default vlmrouter;