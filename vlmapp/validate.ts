// deno-lint-ignore-file
import { Context, red, verify } from './deps.ts';
import { vlmpatchGist } from './User.ts';

// deno-lint-ignore-file
// deno-lint-ignore-file
export class vlmUsercheck {
    private isAdmin: boolean;
    constructor(isAdmin: boolean) {
      this.isAdmin = isAdmin;
    }
    vlmAdmin(): boolean {
      return this.isAdmin;
    }
  }

  export const vlmkey= await crypto.subtle.generateKey(
    { name: "HMAC", hash: "SHA-512" },
    true,
    ["sign", "verify"],
    );

//   const user = new vlmUsercheck(true);
//   if (user.vlmAdmin()) {
//     console.log("User is an administrator");
//   } else {
//     console.log("User is not an administrator");
//   }

export class vlmval {
  validateEmail(email:string) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(email).toLowerCase());
  }

  validateUsername(username:string) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
    return usernameRegex.test(username);
  }

  validatePassword(password:string) {
    const news=/^.{8,}$/;
    return news.test(password)
  }
}

export const vlmauthmiddleware=async(ctx:Context,next:Function)=>{
 if (!ctx.state.foo) {
   ctx.response.redirect('/Signin');
 }else{
  await next();
 }
}
export const vlmvalidate = async (ctx: Context, next:Function) => {
  try {
    const requestUrl =ctx.request.url;
    const queryString = requestUrl.search;
    const searchParams = new URLSearchParams(queryString);
    const myParamValue = searchParams.get('vlm');
    if (!myParamValue) {
        throw new Error("there is no param id")
    }
    if(myParamValue){
      await verify(myParamValue,vlmkey);
    }
    const check:any =await ctx.cookies.get("vlmid")
    const gop:any={vlm_verify:"true"}
    const rop= await vlmpatchGist(check,gop);
    console.log(rop)
    await next();
} catch (error) {
    console.log(red("VLM :) " + error))
    ctx.response.redirect("/Signin")
}
};
export const jsonMiddleware = async (ctx: Context, next: Function) => {
  if (ctx.request.url.pathname === '/products.json') {
    const jsonFile = await Deno.readFile(`${Deno.cwd()}/vlmapp/static/json/products.json`);
    const jsonData = new TextDecoder().decode(jsonFile);
    ctx.response.body = jsonData;
    ctx.response.headers.set('Content-Type', 'application/json');
  }else
  {
    await next();
  }
};

