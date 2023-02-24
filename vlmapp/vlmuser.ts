import { Context, Cookies, red, verify } from './deps.ts';
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
  