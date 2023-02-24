// deno-lint-ignore-file
import { bold, compareSync, getQuery, hashSync, red, renderFileToString, RouterContext, SmtpClient } from './deps.ts';
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
// deno-lint-ignore-file
// deno-lint-ignore-file
// deno-lint-ignore-file

class vlmauth{
    async vlmimg(ctx:RouterContext<string>) {
        const fileName = ctx.params.file;
        const type = fileName?.split('.')[1];
        ctx.response.headers.set("Content-Type", `image/${type}`);
        ctx.response.body = await Deno.open(`./vlmapp/static/img/${fileName}`);
    }
   async vlmdelete(ctx:RouterContext<string>){
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
    async vlmpatch(ctx:RouterContext<string>) {
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
    async vlmlist(ctx:RouterContext<string>){
        const {skip,limit}= getQuery(ctx);

        const gists= await vlmgetgist(+skip ||0,+limit||0);
        ctx.response.body = gists;
        ctx.response.status=200;
    }
    async vlmlistid(ctx:RouterContext<string>){
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
   async vlmhome(ctx:RouterContext<string>)  {
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
   async vlmcss(ctx:RouterContext<string>){
    const fileName = ctx.params.file;
    const file = await Deno.open(`./vlmapp/static/css/${fileName}`);
    ctx.response.headers.set("Cache-Control", "webfonts, max-age=31536000");
    ctx.response.headers.set("content-type", "text/css");
    ctx.response.body = file
   }
   async vlmjs(ctx:RouterContext<string>){
    const fileName = ctx.params.file;
    ctx.response.headers.set("Content-Type", "application/javascript");
    ctx.response.body = await Deno.open(`./vlmapp/static/js/${fileName}`);
   }
   async vlmlogout(ctx:RouterContext<string>){
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

    async vlmlogin(ctx:RouterContext<string>){
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
    async vlmpostlog(ctx:RouterContext<string>){
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
                // for client
                // console.log(,"for client")
                const client =res.access_token 
                ctx.cookies.set("client",client);
                ctx.response.redirect("/")

            }


        }
    }

}
     async vlmregister(ctx:RouterContext<string>){
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
    async confirm(ctx:RouterContext<string>){
        if(ctx.request.method !="GET"){
            ctx.throw(400,bold(red("vlm :( Bad Request:body is missing")));
        }
        ctx.response.headers.set("Content-Type", "text/html");
        ctx.response.status = 200;
        ctx.response.body=await renderFileToString(`${Deno.cwd()}/vlmapp/static/valid.ejs`,{title:"Email confirmed !"});
    }
    async vlmpostreg(ctx:RouterContext<string>){

        

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
            const { SEND_EMAIL, PWD} = Deno.env.toObject();
            const top =await vlmtoken(vlmpayload_email(email))
            if (top !=null) {
                ctx.response.status =201;
                const url = `http://127.0.0.1:5050/valid?vlm=${top}`
            
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
        }
    }

    async vlmprotected(ctx:RouterContext<string>){
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
