// deno-lint-ignore-file
import { Context, red, verify } from './deps.ts';
import { vlmuserid } from './mongo.ts';
import { vlmpatchGist } from './User.ts';

// deno-lint-ignore-file
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
   const yi= await ctx.cookies.get("vlmid")
    if (!yi) {
      const parts = queryString.split("=");
      const lastPart = parts[parts.length - 1];
      const sop:any=await vlmuserid(lastPart)
      await ctx.cookies.set('vlmid',sop?._id);
    }
// const parts = queryString.split("=");
// const lastPart = parts[parts.length - 1];
// const lastPart1 = parts[parts.length - 2];
    if (yi) {
      if(myParamValue){
        const parts = queryString.split("=");
        const lastPart1 = parts[parts.length - 2];
        await verify(lastPart1,vlmkey);
      }

    }
    const check:any = await ctx.cookies.get("vlmid")
    const gop:any={vlm_verify:"true"}
    const rop= await vlmpatchGist(check,gop);
    console.log(rop)
// const parts = queryString.split("=");
// const lastPart = parts[parts.length - 1];
// const sop:any=await vlmuserid(lastPart)
// await ctx.cookies.set('vlmid',sop?._id);

// lastPart.concat("/")
// console.log(lastPart,lastPart1)

// console.log(lastPart);



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
export async function generateNewName(name: string): Promise<string> {
  // Split the name into an array of words
  const words = name.split(" ");

  // Get the last name from the array
  const lastName = words[words.length - 1];

  // Generate a new name by concatenating the last name with a random number
  const randomNumber = Math.floor(Math.random() * 1000) + 1;
  const newLastName = `${lastName}-${randomNumber}`;

  // Replace the last name in the array with the new last name
  words[words.length - 1] = newLastName;

  // Join the array back into a string
  const newName = words.join(" ");

  return newName;
}
