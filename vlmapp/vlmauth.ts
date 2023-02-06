import { bold, getQuery, hashSync, red, renderFileToString, RouterContext } from './deps.ts';
import { vlmexistemail, vlmexistuser } from './mongo.ts';
import { vlmgetgist, vlmgetgistid, vlmpatchGist, vlmremoveGist } from './User.ts';
import { vlmval } from './validate.ts';

// deno-lint-ignore-file
// deno-lint-ignore-file
// deno-lint-ignore-file
// deno-lint-ignore-file

class vlmauth{
    async vlmimg(ctx:RouterContext) {
        const fileName = ctx.params.file;
        const type = fileName?.split('.')[1];
        ctx.response.headers.set("Content-Type", `image/${type}`);
        ctx.response.body = await Deno.open(`./vlmapp/static/img/${fileName}`);
    }
   async vlmdelete(ctx:RouterContext){
    const { id } = ctx.params;
    if (!id) {
      ctx.throw(400, "Bad Request: id is missing");
    }
    const gist = await vlmgetgistid(id);
    if (!gist) {
      ctx.throw(404, "Not Found: the gist is missing");
    }
    await vlmremoveGist(id);
    ctx.response.status = 204;
   }
    async vlmpatch(ctx:RouterContext) {
        const { id } = ctx.params;
        if (!id) {
          ctx.throw(400, "Bad Request: id is missing");
        }
        const body = ctx.request.body();
        const { content } = await body.value;
        const gist = await vlmgetgistid(id);
        if (!gist) {
          ctx.throw(404, "Not Found: the gist is missing");
        }
        await vlmpatchGist(id, content);
        ctx.response.status = 200;
    }
    async vlmlist(ctx:RouterContext){
        const {skip,limit}= getQuery(ctx);

        const gists= await vlmgetgist(+skip ||0,+limit||0);
        ctx.response.body = gists;
        ctx.response.status=200;
    }
    async vlmlistid(ctx:RouterContext){
        const {id} = ctx.params;
        if (!id) {
            ctx.throw(400,bold(red("vlm :( Bad Request:body is missing")));
        }
        const gist = await vlmgetgistid(id);
        if (!gist) {
          ctx.throw(404, "Not Found: the gist is missing");
        }
        ctx.response.body = gist;
        ctx.response.status = 200;
    }
   async vlmhome(ctx:RouterContext)  {
    if(ctx.request.method !="GET"){
        ctx.throw(400,bold(red("vlm :( Bad Request:body is missing")));
    }
    ctx.response.headers.set("Content-Type", "text/html");
    ctx.response.body= await renderFileToString(`${Deno.cwd()}/vlmapp/static/vlm.ejs`
    ,{
        title:"vince",
    })
    ctx.response.status=200;
   }
   async vlmcss(ctx:RouterContext){
    const fileName = ctx.params.file;
    const file = await Deno.open(`./vlmapp/static/css/${fileName}`);
    ctx.response.headers.set("Cache-Control", "webfonts, max-age=31536000");
    ctx.response.headers.set("content-type", "text/css");
    ctx.response.body = file
   }
   async vlmjs(ctx:RouterContext){
    const fileName = ctx.params.file;
    ctx.response.headers.set("Content-Type", "application/javascript");
    ctx.response.body = await Deno.open(`./vlmapp/static/js/${fileName}`);
   }
   async vlmlogout(ctx:RouterContext){
    if(ctx.request.method !="GET"){
        ctx.throw(400,bold(red("vlm :( Bad Request:body is missing")));
    }
    ctx.response.headers.set("Content-Type", "text/html");
    ctx.response.body= await renderFileToString(`${Deno.cwd()}/vlmapp/static/logout.ejs`
    ,{
        title:"logout",
    })
    ctx.response.status=200;
   }

    async vlmlogin(ctx:RouterContext){
        if(ctx.request.method !="GET"){
            ctx.throw(400,bold(red("vlm :( Bad Request:body is missing")));
        }
        ctx.response.headers.set("Content-Type", "text/html");
        ctx.response.body= await renderFileToString(`${Deno.cwd()}/vlmapp/static/login.ejs`
        ,{
            title:"vince dev Signin",
            error:undefined||null||false
        })
        ctx.response.status=200;
    }
    async vlmpostlog(ctx:RouterContext){
        const vlmbody= ctx.request.body({type:"form"});
        const vlmvalue = await vlmbody.value;
        const user= vlmvalue.get('username');
        const pass = vlmvalue.get('password');


        ctx.response.headers.set("Content-Type", "text/html");
        ctx.response.body= await renderFileToString(`${Deno.cwd()}/vlmapp/static/login.ejs`,{
            error:"Your password is incorrect",
        })



    }
     async vlmregister(ctx:RouterContext){
        if(ctx.request.method !="GET"){
            ctx.throw(400,bold(red("vlm :( Bad Request:body is missing")));
        }
        ctx.response.headers.set("Content-Type", "text/html");
        ctx.response.body= await renderFileToString(`${Deno.cwd()}/vlmapp/static/register.ejs`
        ,{
            title:"vince dev Signup",
            error:undefined||null||false
        })
        ctx.response.status=200;
    }
    async vlmpostreg(ctx:RouterContext){
        const vlmbody= ctx.request.body({type:"form"});
        const vlmvalue = await vlmbody.value;
        const user= vlmvalue.get('vlmname');
        const email= vlmvalue.get('vlmemail');
        const pass= vlmvalue.get('vlmpass');
        if (!user||!email||!pass) {
            ctx.response.status = 422;
            ctx.response.body=await renderFileToString(`${Deno.cwd()}/vlmapp/static/register.ejs`,{error:`All inputs are empty :(`,title:"Please try again !"});
            return;
          }
        if(pass !=null){
            const vlmhash=hashSync(pass)
            const userhope:any={
                user,
                email,
                pass:vlmhash
            }
                // auth for user
                    const check = await vlmexistuser(userhope.user);
                    if (check) {
                        ctx.response.status = 422;
                        ctx.response.body=await renderFileToString(`${Deno.cwd()}/vlmapp/static/register.ejs`,{error:`The username ${user} is already taken :(`,title:"Please try again !"});
                        return;
                      }
                // auth for email
                    const checks = await vlmexistemail(userhope.email)
                    if (checks) {
                        ctx.response.status = 422;
                        ctx.response.body=await renderFileToString(`${Deno.cwd()}/vlmapp/static/register.ejs`,{error:`The email ${email} is already taken :(`,title:"Please try again !"});
                        return;
                      }
                // auth for all inputs
                const username =new vlmval();
                if(!username.validateUsername(userhope.user)){
                    ctx.response.status = 422;
                    ctx.response.body=await renderFileToString(`${Deno.cwd()}/vlmapp/static/register.ejs`,{error:`your [${user} ] should be  above 4 characters and contain letters/numbers/underscores :(`,title:"Please try again !"});
                    return;
                }
                if(!username.validateEmail(userhope.email)){
                    ctx.response.status = 422;
                    ctx.response.body=await renderFileToString(`${Deno.cwd()}/vlmapp/static/register.ejs`,{error:`your ${email} is missing @gmail.com :(`,title:"Please try again !"});
                    return;
                }
                if(!username.validatePassword(pass)){
                    ctx.response.status = 422;
                    ctx.response.body=await renderFileToString(`${Deno.cwd()}/vlmapp/static/register.ejs`,{error:`your password is missing some properties :(`,title:"Please try again !"});
                    return;
                }
                // post your contents to the database
  
                // ctx.response.redirect("/Signin")
                // const payload = {
                //     id: user,
                //     name: username
                // };
                // const jwt = await create({ alg: "HS512", typ: "JWT" }, { foo: payload }, vlmkey);
                // console.log(jwt)
                // const ascess= {
                //     asc:await vlmtoken(vlmpayload(user)) 
                // }
                
            }
        }

    async vlmprotected(ctx:RouterContext){
        if(ctx.request.method !="GET"){
            ctx.throw(400,bold(red("vlm :( Bad Request:body is missing")));
        }
        ctx.response.headers.set("Content-Type", "text/html");
        ctx.response.body= await renderFileToString(`${Deno.cwd()}/vlmapp/static/protected.ejs`
        ,{
            title:"protected",
        })
        ctx.response.status=200;
    }
}


const vlmauths= new vlmauth();

export { vlmauths };
