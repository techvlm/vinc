// deno-lint-ignore-file
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
// deno-lint-ignore-file
// deno-lint-ignore-file
class vlmtimer{
    async logger(ctx:any,next:Function){
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        ctx.response.headers.set("X-Response-Time", `${ms}ms`);
        const rt = ctx.response.headers.get("X-Response-Time");
        console.log(gray(`[*] ${ctx.request.method} ${ctx.request.url} - `) ,brightBlue(`${rt} ${red(' Not Found :(')}`));
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
            title:"like@dev",
        })
       }
       async vlmcheck(ctx:RouterContext<string,any>)  {
        ctx.response.status=200;
        ctx.response.body= await renderFileToString
        (`${Deno.cwd()}/vlmapp/static/valid.ejs`
        ,{
            title:"like@dev",
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
            title:"like@dev Signup",
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
            const top =await vlmtoken(vlmpayload_email(email))

            if (top !=null) {
                const url = `http://127.0.0.1:6060/valid?vlm=${top}=${userhope.user}`
                try {
                    const fo=Deno.env.toObject()
                    await client.connectTLS({
                      hostname: "smtp.gmail.com",
                      port: 465,
                      username:fo.vlm_mail,
                      password:fo.vlm_password,
                    });
                    
                    await client.send({
                      from: fo.vlm_mail,
                      to: fo.SEND_EMAIL,
                      subject: ` Please confirm your email address`,// Email address of the destination
                      content:"thnaks for registering to my website i will surely not disappoint",
                      html:`
                      <!DOCTYPE html>
                      <html lang="en">
                      <head>
                          <meta charset="UTF-8">
                          <meta http-equiv="X-UA-Compatible" content="IE=edge">
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      </head>
                      <body>
                      <div id="you">
                      Welcome ${userhope.user}
                      </div>
                      <a href="${url}" class="me">Verify me</a>
                      </body>
                      </html>
                      `
                    });
                    
                    await vlmcreategist(userhope.user,userhope.email,userhope.pass,"false")
                    const userd:any= await vlmuserid(userhope.user)
                    ctx.cookies.set("vlmid",userd?._id)
                    ctx.response.status =201;
                    ctx.response.redirect("/Signin");
                    await client.close();
                  } catch (error) {
                    console.log(red("VLM :) " + error))
                  }
        

            }

               
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

            // if(yet.vlmmail==Deno.env.toObject().SEND_EMAIL){
            //     console.log("you are vlm ")
            //     ctx.response.status=200;
            //     ctx.response.body=res.access_token0


            // }else{
            //     ctx.cookies.set("vlmid",yet.vlmid)
            //     const client =res.access_token 
            //     ctx.cookies.set("client",client,{httpOnly:true});
            //     ctx.response.redirect("/dashboard")
            //         // console.log("for client auth")
            // }

              
                // ctx.response.status=200;
                // ctx.response.body=res.access_token0
                // const check= await checkvlmemails(yop.user)
                // // console.log("you are vlm")
                // if (check?.user=="vlm") {
                //     // if (check?.email==yet.vlmemail) {
                //     // }
                //     console.log(check?.email)
                // }
                


            // if (yop.user !="vlm"){
                // if (check?.user!=yop.user) {
                    ctx.cookies.set("vlmid",yet.vlmid)
                    const client =res.access_token 
                    ctx.cookies.set("client",client,{httpOnly:true});
                    console.log("client")
                    ctx.response.redirect("/dashboard")
                // }
                    // console.log("for client auth")
            // }
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
            title:"like@dev Signin",
            error:undefined||null||false
        })
        ctx.response.status=200;
    }
    async vlmadmin(ctx:RouterContext<string,any>){
    //    await vlmproducts()

        ctx.response.body= await renderFileToString(`${Deno.cwd()}/vlmapp/static/protected.ejs`
        ,{
            title:"Admin",
            click:"vlmhome",
            vlmprod:"rop?.title",
            vlmpod:"rop?.price",
            vlmimg:""
            
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
            title:"dashboard",
            user:foo
        })
        ctx.response.status=200;
    }
    async vlmadminpost(ctx:RouterContext<string,any>){
        // const vlmbody= ctx.request.body({type:"form"});
        // const vlmvalue = await vlmbody.value;
        // const title = vlmvalue.get('vlmcart');
        // const cost= vlmvalue.get('vlmcost');
        // const des = vlmvalue.get('vlmdescription');
        // // const vife:any = vlmvalue.get('myfile');
        // const call = vlmvalue.get('call');
        //  // Convert the array buffer to a base64-encoded 
  
         
        // console.log(title,cost,des,call)
//         const decodedImageData = atob(vife);
// const blob = new Blob([decodedImageData], { type: "image/jpeg" });
// console.log(blob)

try {
    const formDataReader = ctx.request.body({ type: "form-data" }).value;
    const formDataBody = await formDataReader.read({ maxSize: 10000000 }); // Max file size to handle

const y:any= formDataBody.files
y.forEach(async (item:any) =>{
    // console.log(item.content)
    const blob = new Blob([item.content], { type: "image/jpeg" });
    // Create a URL object from the Blob
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = function() {
        const dataUrl = reader.result;
        console.log(`\n\n\t${dataUrl}`);
      };

} )
    // console.log()

  } catch (error) {
    // Handle error response
    console.log(red("vlm " + error))
  }

    }
}
const {vlmpostsignup,vlmadminpost,vlmadmin,vlmpostsignin,vlmhome,vlmcss,vlmjs,vlmimg,vlmregister,vlmlogin,vlmdelete,vlmlist,vlmlistid,vlmtake,vlmtake1,vlmcssboot,vlmjsboot,vlmpatch,vlmcheck}= new vlmcotroller();
const {logger}= new vlmtimer();

export {
  logger,
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
};