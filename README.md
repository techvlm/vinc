# Welcome all to my deno courses porfolio

<!-- 
// // Connecting to a Local Database
// await client.connect("mongodb://127.0.0.1:27017");

// Connecting to a Mongo Atlas Database
// await client.connect({
//   db: "<db_name>",
//   tls: true,
//   servers: [
//     {
//       host: "<db_cluster_url>",
//       port: 27017,
//     },
//   ],
//   credential: {
//     username: "<username>",
//     password: "<password>",
//     db: "<db_name>",
//     mechanism: "SCRAM-SHA-1",
//   },
// });
 -->

 <!-- exmple of oaks router context 
 
 import { Router } from "https://deno.land/x/oak/mod.ts";
import { RouterContext } from "./router_context.ts";

interface Body {
    name: string;
    age: number;
}

const router = new Router();

router.get<RouterContext>("/:name", async (ctx: RouterContext) => {
    const name = ctx.params.name;
    ctx.response.body = { message: `Hello, ${name}!` };
});

router.post<RouterContext>("/submit", async (ctx: RouterContext) => {
    const body: Body = await ctx.request.body().value;
    console.log(body);
    ctx.response.body = { message: "Data received" };
});
 -->

 <!-- use this for your respoonse
 
     async vlmregister(ctx:RouterContext){
        const vlmobj =  ctx.request.body();
        ctx.response.headers.set("Content-Type", "application/json");
        ctx.response.body = { message: "Data received", data: vlmobj.value };
        console.log(vlmobj)
    }
  -->

  <!-- working oak example
  import { Application, Router } from 'https:/deno.land/x/oak@v11.1.0/mod.ts';

const app = new Application();
const router = new Router();

router.get("/js/:file", async (context) => {
    const fileName = context.params.file;
    context.response.headers.set("Content-Type", "application/javascript");
    context.response.body = await Deno.open(`./public/js/${fileName}`);
});

router.get("/", async (context) => {
    context.response.headers.set("Content-Type", "text/html");
    context.response.body = await Deno.open(`./public/index.html`);
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });

   -->

   <!-- 
   
   what to follow

           // const vlmbody= ctx.request.body({type:"form"});
        // const vlmbody = ctx.request.body({type:"form"});
        // const value = await vlmbody.value;
  
        // // const salt = genSaltSync(8);
        // // const bop = await vlmcreategist(content);
        // // ctx.response.body=bop;
        // // ctx.response.status =201;
        // const hashed = hashSync(pass);
        // const userz= {
        //     user,
        //     email,
        //     password:hashed
        // }
        // console.log()
        // ctx.response.redirect("/Signin")
        // const formData =  ctx.request.body({ type: "form" });

const body =  ctx.request.body()
const {content} =await body.value

if (!content) {
    ctx.throw(400,"Bad request:Not content was found")
}
// const name =value.get("username");
// const email =value.get("email");
// const password =value.get("password");
// const userf={
//     name,email,password
// }
// vlmusers.push(userf)
const gist =await vlmcreategist(content);
console.log(content)
ctx.response.body = gist
ctx.response.status =201
    -->

<!-- 
follow example two

        if(!ctx.request.hasBody){
            ctx.throw(400,bold(red("vlm :( Bad Request:body is missing")));
        }
        // const vlmbody= ctx.request.body({type:"form"});
        const vlmbody = ctx.request.body();
        const {value} = await vlmbody.value;
        const user= value.get('username');
        const email= value.get('email');
        const pass= value.get('password');
        // const salt = genSaltSync(8);
        // const bop = await vlmcreategist(content);
        // ctx.response.body=bop;
        // ctx.response.status =201;
        const hashed = hashSync(pass);
        const userz= {
            user,
            email,
            password:hashed
        }
        vlmusers.push(userz)
        ctx.response.redirect("/Signin")
 -->

 <!-- 
 post user in db
             if(pass !=null){
                const vlmhash=hashSync(pass)
                const userhope={
                    user,
                    email,
                    pass:vlmhash
                }
                if(userhope.user !=null){
                    if (userhope.email != null) {
                        const gist= await vlmcreategist(userhope.user,userhope.email,userhope.pass)
                        vlmusers.push(gist)
                        ctx.response.status =201;
                        ctx.response.redirect("/Signin");
                    }
                }
            }

            
// export class vlmUser {
//     constructor(public name: string, public email: string, public password: string) {}
  
//     vlmisValid(): boolean {
//       return this.name.length > 0 &&
//         this.email.length > 0 &&
//         this.password.length >= 8;
//     }
//   }
  -->

  <!-- auth
          if(pass !=null){
            const vlmhash=hashSync(pass)
            const userhope={
                user,
                email,
                pass:vlmhash
            }
            if(userhope.user !=null){
                if (userhope.email != null) {
                    const check = await vlmexistemail(userhope.email)
                    if (check) {
                        ctx.response.status = 422;
                        ctx.response.body=await renderFileToString(`${Deno.cwd()}/vlmapp/static/register.ejs`,{error:`The email ${email} is already taken.`,title:"try again !"});
                        return;
                      }else{
                      const gist= await vlmcreategist(userhope.user,userhope.email,userhope.pass)
                      vlmusers.push(gist)
                      ctx.response.status =201;
                      ctx.response.redirect("/Signin");
                      }

                }
            }
        }

                        if (userhope.email != null) {
                    const check = await vlmexistemail(userhope.email)
                    if (check) {
                        ctx.response.status = 422;
                        ctx.response.body=await renderFileToString(`${Deno.cwd()}/vlmapp/static/register.ejs`,{error:`The email ${email} is already taken.`,title:"try again !"});
                        return;
                      }else{
                      const gist= await vlmcreategist(userhope.user,userhope.email,userhope.pass)
                      vlmusers.push(gist)
                      ctx.response.status =201;
                      ctx.response.redirect("/Signin");
                      }
                }



                create
Takes Header, Payload and CryptoKey and returns the url-safe encoded jwt.
decode
Takes a jwt and returns a 3-tuple [unknown, unknown, Uint8Array] if the jwt has a valid serialization. Otherwise it throws an Error. This function does not verify the digital signature.
getNumericDate
This helper function simplifies setting a NumericDate. It takes either a Date object or a number (in seconds) and returns the number of seconds from 1970-01-01T00:00:00Z UTC until the specified UTC date/time.
validate
It does not verify the digital signature.
verify
Takes jwt, CryptoKey and VerifyOptions and returns the Payload of the jwt if the jwt is valid. Otherwise it throws an Error.
Interfaces
Header
JWS §4.1.1: The "alg" value is a case-sensitive ASCII string containing a StringOrURI value. This Header Parameter MUST be present and MUST be understood and processed by implementations.
Payload
JWT §1: JWTs encode claims to be transmitted as a JSON [RFC7159] object [...]. JWT §4.1: The following Claim Names are registered in the IANA "JSON Web Token Claims" registry established by Section 10.1. None of the claims defined below are intended to be mandatory to use or implement in all cases, but rather they provide a starting point for a set of useful, interoperable claims. Applications using JWTs should define which specific claims they use and when they are required or optional.
Type Aliases
VerifyOptions
With expLeeway and nbfLeeway implementers may provide for some small leeway to account for clock skew (JWT §4.1.4). The default is 1 second. By passing the option audience, this application tries to identify the recipient with a value in the aud claim. If the values don't match, an Error is thrown.
   -->


   <!-- allorarithims 
   
   HS256 (HMAC SHA-256)
HS384 (HMAC SHA-384)
HS512 (HMAC SHA-512)
RS256 (RSASSA-PKCS1-v1_5 SHA-256)
RS384 (RSASSA-PKCS1-v1_5 SHA-384)
RS512 (RSASSA-PKCS1-v1_5 SHA-512)
PS256 (RSASSA-PSS SHA-256)
PS384 (RSASSA-PSS SHA-384)
PS512 (RSASSA-PSS SHA-512)
ES256 (ECDSA using P-256 and SHA-256)
ES384 (ECDSA using P-384 and SHA-384)
   
   
   -->
## vlm ADB

Go to your platformtools and open up the command propmt `C:\Users\vm\AppData\Local\Android\Sdk\platform-tools`
Accessing `ADB` shell through the cmd in Windows machine

* These are the common `ADB` commands :
  * Accessing the shell `adb shell`
  * Accessing all devices `adb devices`

After Accesing the shell you follow the following commands

* `ls` to asscess permisions set for the root cmd and folders
* `su` to asscess root options in the shell
* `ls -al` to asscess permisions set for the root cmd and folders with other file formats {write read}
* `cat build.prop` builds the file

Using Deno djwt in deno for storing the access cookie / if her goes offline store an auth key

## verify

Takes jwt, CryptoKey and VerifyOptions and returns the Payload of the jwt if the jwt is valid. Otherwise it throws an Error.

 ```ts
import {verify} from "https://deno.land/x/djwt@v2.8/mod.ts";

const payload= await verify(jwt,key) //{email:'vincent@gmail.com"}

```

## create

Takes Header, Payload and CryptoKey and returns the url-safe encoded jwt.

```ts

import { create } from "https://deno.land/x/djwt@v2.8/mod.ts";

const jwt = await create({ alg: "HS512", typ: "JWT" }, { foo: "bar" }, key);

```

Please use the native Web Crypto API to generate a secure CryptoKey.

```ts
const key = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);

```
Running my vbs scripts using deno
