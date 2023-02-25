import { Context, Cookies, red, RouterContext, SmtpClient, verify } from './deps.ts';
import { vlmpayload_email, vlmtoken } from './mongo.ts';
import { vlmkey } from './validate.ts';

// deno-lint-ignore-file
type vlmjobtype={
    name:string;
    start:()=>void;
    state:"queued"| "running"|"incomplete";
}
type vlmjob<T extends vlmjobtype>={
    job: T;
    state:"queued"| "running"|"compeleted";
    vlmcompelete:(vlm:(job:T)=>void)=>void;
}
type vlmsendMail=vlmjobtype&{
    recipient:string;
    subject:string
}

function vlmqueuejob<T extends vlmjobtype>(job:T):vlmjob<T>{
    job.start()
    return {
        job,
        state:"queued",
        vlmcompelete:(vlm:(job:T)=>void)=>vlm(job)
    }
}

const vlmj:vlmsendMail= {
recipient: "vincent@gmail.com",
subject: "hi can you cornfirm your link",
name:"vincent",
start:()=>null,
state:"incomplete"
}

export const  vlmrun = vlmqueuejob(vlmj)
export const vlmauth = async (ctx: Context, next:Function) => {
    const cookies = new Cookies(ctx.request, ctx.response);
    // Check if the authentication cookie is set
    const authCookie:any = cookies.get("client");
  
    if (authCookie) {
      try {
        // Validate the authentication cookie here
        const isValid = await validateAuthCookie(ctx,authCookie);
  
        if (!isValid) {
          // If the authentication cookie is invalid, delete it
          cookies.delete("client");
        }
      } catch (err) {
        // If an error occurs, delete the authentication cookie
        console.log(red("VLM :) " + err))
        cookies.delete("vlmid")
        cookies.delete("client");
      }
    }
    await next();
  };

  
// Define a function to validate the authentication cookie
const validateAuthCookie = async (ctx:Context,authCookie: string): Promise<boolean> => {
    // Add your authentication cookie validation logic here
    const jwt =await ctx.cookies.get("client");
    if(jwt){
        const payload:any = await verify(jwt,vlmkey);
        if (payload) {
           ctx.state.foo=payload.iss;
        }    
    }
    return true;
  };
  
  export async function vlmsend(ctx:RouterContext<string>,email:string,user:string){
    const client = new SmtpClient(); 
    const env =Deno.env.toObject();
    const top =await vlmtoken(vlmpayload_email(email))
    if (top !=null) {
        ctx.response.status =201;
        const url = `https://vince.deno.dev/valid?vlm=${top}`
    
        await client.connectTLS({
            hostname: "smtp.gmail.com",
            port: 465,
            username: env.SEND_EMAIL,
            password: env.PWD,
          });
          await client.send({
            from: env.SEND_EMAIL,
            to: email,
            subject: `Welcome ${user} Please confirm your email address`,
            content: `
            Hi from vincent, your link will expire after 1 minute
            <br/>
            <span>here is your link ... </span><a href=${url}>${url}</a>

            `
          });


    }
  }