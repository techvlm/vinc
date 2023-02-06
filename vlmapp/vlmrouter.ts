import { Router } from './deps.ts';
import { vlmauths } from './vlmauth.ts';

// import vlmauths from './vlmauth.ts';

const vlmrouter = new Router();

vlmrouter
.get('/',vlmauths.vlmhome)
.get('/list', vlmauths.vlmlist)
.get('/list/:id', vlmauths.vlmlistid)
.patch('/list/:id',vlmauths.vlmpatch)
.delete('/list/:id',vlmauths.vlmdelete)
.post('/Signin',vlmauths.vlmpostlog)
.get('/Signin',vlmauths.vlmlogin)
.get('/Signup', vlmauths.vlmregister)
.post('/Signup',vlmauths.vlmpostreg)
.get("/logout", vlmauths.vlmlogout)
.get("/protected", vlmauths.vlmprotected)
.get("/js/:file", vlmauths.vlmjs)
.get('/css/:file',vlmauths.vlmcss)
.get('/img/:file',vlmauths.vlmimg)

export { vlmrouter };