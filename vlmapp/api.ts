// deno-lint-ignore-file
import { config } from 'https:/deno.land/x/dotenv@v3.2.0/mod.ts';

import {
    bold,
    brightBlue,
    compareSync,
    getQuery,
    gray,
    hashSync,
    red,
    renderFileToString,
    RouterContext,
    send,
    SmtpClient,
} from './deps.ts';
import {
    vlmexistemail,
    vlmexistuser,
    vlmpayload,
    vlmpayload_admin,
    vlmpayload_email,
    vlmtoken,
    vlmuserid,
} from './mongo.ts';
import { vlmcreategist, vlmgetgist, vlmgetgistid, vlmpatchGist, vlmremoveGist } from './User.ts';
import { vlmval } from './validate.ts';

// deno-lint-ignore-file
class vlmtimer{
    async logger(ctx:any,next:Function){
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        ctx.response.headers.set("X-Response-Time", `${ms}ms`);
        const rt = ctx.response.headers.get("X-Response-Time");
        console.log(gray(`[*] ${ctx.request.method} ${ctx.request.url} - `) ,brightBlue(`${rt}`));
    }
}

class vlmcotroller{
    async vlmimg(ctx:RouterContext<string,any>) {
        const fileName = ctx.params.file;
        const type = fileName?.split('.')[1];
        ctx.response.headers.set("Content-Type", `image/${type}`);
        ctx.response.body = await Deno.open(`./vlmapp/static/img/${fileName}`);
    }
    async vlmhome(ctx:RouterContext<string,any>)  {
    
        ctx.response.status=200;
        ctx.response.body= await renderFileToString
        (`${Deno.cwd()}/vlmapp/static/vlm.ejs`
        ,{
            title:"vince",
        })
       }
       async vlmcheck(ctx:RouterContext<string,any>)  {
        ctx.response.status=200;
        ctx.response.body= await renderFileToString
        (`${Deno.cwd()}/vlmapp/static/valid.ejs`
        ,{
            title:"vince",
        })
       }
    async vlmcss(ctx:RouterContext<string,any>){
        const fileName = ctx.params.file;
        const file = await Deno.open(`./vlmapp/static/css/${fileName}`);
        ctx.response.headers.set("Cache-Control", "webfonts, max-age=31536000");
        ctx.response.headers.set("content-type", "text/css");
        ctx.response.body = file
       }
       async vlmjsboot(ctx:RouterContext<string,any>){
        const fileName = ctx.params.file;
        ctx.response.headers.set("Content-Type", "application/javascript");
        ctx.response.body = await Deno.open(`./vlmapp/static/js/boot/${fileName}`);
       }
       async vlmcssboot(ctx:RouterContext<string,any>){
        const fileName = ctx.params.file;
        const file = await Deno.open(`./vlmapp/static/css/boot/${fileName}`);
        ctx.response.headers.set("Cache-Control", "webfonts, max-age=31536000");
        ctx.response.headers.set("content-type", "text/css");
        ctx.response.body = file
       }
       async vlmjs(ctx:RouterContext<string,any>){
        const hop =ctx.params.file
        await send(ctx, ctx.request.url.pathname, {
            root: `${Deno.cwd()}/vlmapp/static/`,
            index: hop,
          });
       }
       async vlmregister(ctx:RouterContext<string,any>){
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
    async vlmdelete(ctx:RouterContext<string,any>){
        const { id } = ctx.params;
        if (!id) {
          ctx.throw(400, "the vlmdb id is missing");
        }
        const gist = await vlmgetgistid(id);
        if (!gist) {
          ctx.throw(404, "the vlmdb id is missing");
        }
        await vlmremoveGist(id);
       }
       async vlmpatch(ctx:RouterContext<string>) {
        const { id } = ctx.params;
        if (!id) {
          ctx.throw(400, "Bad Request: id is missing");
        }
        const body=await ctx.request.body();
        const gist = await vlmgetgistid(id);
        if (!gist) {
          ctx.throw(404, "the vlmdb id is missing");
        }
        const rop =await vlmpatchGist(id,await body.value);
        ctx.response.status = 200;
        console.log(rop)

    }
    async vlmlist(ctx:RouterContext<string,any>){
        const {skip,limit}= getQuery(ctx);

        const gists= await vlmgetgist(+skip ||0,+limit||0);
        ctx.response.body = gists;
        ctx.response.status=200;
    }
    async vlmlistid(ctx:RouterContext<string,any>){
        try {
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
        } catch (error) {
            console.log(red("VLM :( "+error))
        }
    }
    // vlmpost
    async vlmpostsignup(ctx:RouterContext<string,any>){

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
        }else{
            
            const client = new SmtpClient(); 
            const { SEND_EMAIL, PWD} =await config();
            const top =await vlmtoken(vlmpayload_email(email))
            if (top !=null) {
                ctx.response.status =201;
                const url = `https://vince.deno.dev/valid?vlm=${top}`
            
                await client.connectTLS({
                    hostname: "smtp.gmail.com",
                    port: 465,
                    username: SEND_EMAIL,
                    password: PWD,
                  });
                  await client.send({
                    from: SEND_EMAIL,
                    to: userhope.email,
                    subject: `Welcome ${userhope.user} Please confirm your email address`,
                    content: `
                    Hi from vincent, your link will expire after 1 minute
                    <br/>
                    <span>here is your link ... </span><a href=${url}>${url}</a>

                    `
                  });

            }
            await vlmcreategist(userhope.user,userhope.email,userhope.pass,"false")
            const userd:any= await vlmuserid(userhope.user)
            ctx.cookies.set("vlmid",userd?._id)
            ctx.response.redirect("/Signin");
               
        }
        // post your contents to the database
    }

    }
    // vlm post 
    async vlmpostsignin(ctx:RouterContext<string,any>){
        const vlmbody= ctx.request.body({type:"form"});
        const vlmvalue = await vlmbody.value;
        const user= vlmvalue.get('vlmname');
        const pass = vlmvalue.get('vlmpass');

        const yop:any={
            user,
            pass
        }
        const userd= await vlmuserid(yop.user)
        const yet:any ={
            password:userd?.password,
            username:userd?.user,
            vlmid:userd?._id,
            vlmfinds:userd?.vlm_verify,
            vlmmail:userd?.email
        }
        
        const check = await vlmexistuser(yop.user);
        if (!check) {
            ctx.response.status = 422;
            ctx.response.body=await renderFileToString(`${Deno.cwd()}/vlmapp/static/login.ejs`,{error:`your username ${user} does not exist :(`,title:"Please try again !"});
            return;
          }
        const look= compareSync(yop.pass,yet.password);
        if (!look) {
            ctx.response.status = 422;
            ctx.response.body=await renderFileToString(`${Deno.cwd()}/vlmapp/static/login.ejs`,{error:"your password is incorrect :(",title:"Please try again !"});
            return;
        } 
    if(yet.vlmfinds== "false"){
        ctx.response.status = 422;
        ctx.response.body=await renderFileToString(`${Deno.cwd()}/vlmapp/static/login.ejs`,{error:"Please confirm your email :(",title:"Please confirm email Address !"});
        return;
    }else{
        if (yet.vlmfinds=="true") {
            // set client and admin auth here
            const res={
                access_token0:await vlmtoken(vlmpayload_admin(yop.user)),
                access_token:await vlmtoken(vlmpayload(yop.user))
            }
            if(yet.vlmmail == Deno.env.get("SEND_EMAIL")){
                // for admin
                console.log(res.access_token0,"for admin")
                
            }else{
                ctx.cookies.set("vlmid",yet.vlmid)
                const client =res.access_token 
                ctx.cookies.set("client",client,{httpOnly:true});
                ctx.response.redirect("/dashboard")
                // ctx.response.body=await renderFileToString(`${Deno.cwd()}/vlmapp/static/dashboard.ejs`,{title:"Dashboard!"});
            }


        }
    }


    }
    
    async vlmlogin(ctx:RouterContext<string,any>){
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
    async vlmtake(ctx:RouterContext<string,any>){
        ctx.cookies.delete("client");
        ctx.response.redirect("/");
    }
    async vlmtake1(ctx:RouterContext<string,any>){
        const foo = ctx.state.foo;
        ctx.response.headers.set("Content-Type", "text/html");
        ctx.response.body= await renderFileToString(`${Deno.cwd()}/vlmapp/static/dashboard.ejs`
        ,{
            title:"vince dev Signin",
            user:foo
        })
        ctx.response.status=200;
    }
}
const {vlmpostsignup,vlmpostsignin,vlmhome,vlmcss,vlmjs,vlmimg,vlmregister,vlmlogin,vlmdelete,vlmlist,vlmlistid,vlmtake,vlmtake1,vlmcssboot,vlmjsboot,vlmpatch,vlmcheck}= new vlmcotroller();
const {logger}= new vlmtimer();

export {
  logger,
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
};