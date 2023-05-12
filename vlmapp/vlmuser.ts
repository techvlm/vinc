import { Context, Cookies, red, verify } from './deps.ts';
import { vlmgetToken } from './jwt.ts';
import { vlmkey } from './validate.ts';

// import { insertjson } from './mongo.ts';
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
  
  export async function auth(ctx:Context,next:Function) {
    try {
      const jwt=await vlmgetToken(ctx.request.headers);
      if (!jwt) {
        ctx.response.redirect("/Signin")
        ctx.throw(401,"there is no jwt")
      }
      const payload=await verify(jwt,vlmkey)
      if (!payload) {
        ctx.response.redirect("/Signin")
        ctx.throw(401,"there is no payaload")
      }
      await next();
    } catch (error) {
      console.log(red("vlm :( " + error))
    }
  }

export async function vlmproducts(){

  // const rop= await vlmlocal()
        
  // rop.forEach(async (item)=>{
  //     const gop= await vlmlocals(item._id)
  //     console.log(gop?.image)
  // })
  try {
    const jsonFile = await Deno.readFile(`${Deno.cwd()}/vlmapp/static/json/products.json`);
    const jsonData = new TextDecoder().decode(jsonFile);
    if (jsonData) {
      console.log(jsonData)
    }
  } catch (error) {
    console.log(red("VLM :) "+error))
  }
  // const fors =await insertjson(jsonData)
  // return fors;
  // ctx.response.body = jsonData;
}