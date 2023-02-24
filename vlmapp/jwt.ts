// deno-lint-ignore-file
// import { Context, verify } from './deps.ts';
// import { vlmkey } from './validate.ts';

// function getToken(headers:Headers){
//     const auth=headers.get("Authorization");

//     if (!auth) {
//         return null;
//     }
//     const [method,token]=auth.split(" ")[1];

//     if (method!=="Bearer") {
//         return null;
//     }
//     if (!token) {
//         return null;
//     }
//     return token;
// }

// export async function vlmcalladmin(ctx:Context){
//     const jwt = getToken(ctx.request.headers);
//     if(!jwt){
//         throw new Error('there is no !jwt');
//     }
//     const payload:any=await verify(jwt,vlmkey)
//     if (!payload) {
//         throw new Error("There is no payload")
//     }
// }