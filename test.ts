// const getUsers = async (ctx: RouterContext<string,any,{id: string,type:AppState}>) => {
//   const { id } = ctx.params;
//   const user = ctx.state.type.users.find((u) => u.id === id)
//   console.log(user)
//   if (!user) {
//     ctx.response.status = 404;
//     ctx.response.body = { message: `User with id ${id} not found` };
//     return;
//   }
//   ctx.response.body = user;
// };
import { Application, Router } from 'https:/deno.land/x/oak@v11.1.0/mod.ts';

import { vlmconnect } from './vlmapp/mongo.ts';


// const getUsers = async (ctx: RouterContext<string, any, { id: string ,type: AppState}>) => {
//   const { id } = ctx.params;
//   const user = ctx.state.type.users.find((u) => u.id === id)
//   console.log(user)
//   if (!user) {
//     ctx.response.status = 404;
//     ctx.response.body = { message: `User with id ${id} not found` };
//     return;
//   }
//   ctx.response.body = user;
// };
// // 

// const appState: AppState = { users: [{ id: "1", name: "Alice" }, { id: "2", name: "Bob" }] };

// const router = new Router();
// router.get("/users/:id", getUsers);

// const app = new Application();
// app.use(router.routes());
// app.use(router.allowedMethods());

// app.listen({ port: 8000 });

// interface User{
//     id: string;
//     name: string;
//   }
  
//   interface AppState{
//     users: User[];
//   }
// // export const reg = async({request,response}:RouterContext<string,any,{}>)=>{
// //     response.body="welcome to vlm using types"
// // }
// const appState: AppState = { users: [{ id: "1", name: "Alice" }, { id: "2", name: "Bob" }] };

// const id=ctx.params.id;
// const tip=appState.users.find((u) => u.id === id)

// if (!tip) {
//     ctx.response.status=402
//     ctx.response.body="not found 404..."
//     return
// }
// ctx.response.body=tip

// define my types


// const app = new Application();

// // Create a router instance
// const router = new Router();

// // Define a route that uses ctx.state as middleware
// router.get("/protected", async (ctx) => {
//   // Access the value set in ctx.state
//   const isAuthenticated = ctx.state.isAuthenticated;

//   if (isAuthenticated) {
//     ctx.response.body = "You are authorized to access this page";
//   } else {
//     ctx.response.status = 401;
//     ctx.response.body = "You are not authorized to access this page";
//   }
// });

// // Pass ctx.state as middleware to the router's handle() method
// app.use(router.routes(), router.allowedMethods(), async (ctx, next) => {
//   // Set a value in ctx.state
//   ctx.state.isAuthenticated = true;

//   // Call the next middleware function
//   await next();
// });

// await app.listen({ port: 8000 });

// const app = new Application();
// const router = new Router();

// const myMiddleware = async (ctx:Context, next:Function) => {
//   ctx.state.foo = "bar";
//   ctx.state.baz = 123;

//   await next();
// };

// router.get("/my-route", async (ctx) => {
//   const foo = ctx.state.foo;
//   // const baz = ctx.state.baz;
//   console.log(foo)
//   // ctx.response.body = { foo};
// });

// // router.use(myMiddleware);
// app.use(myMiddleware)
// app.use(router.routes());
// app.use(router.allowedMethods());

// // Use the router middleware in the app
// app.use(router.routes());
// app.use(router.allowedMethods());

// await app.listen({ port: 8000 });

// const app = new Application();

// app.use(async (ctx) => {
//   ctx.response.headers.set("Content-Type", "application/json");
//   ctx.response.body = {
//     message: "Hello, world!",
//   };
// });

// await app.listen({ port: 8000 });
// Define a function to hold the authentication cookie
// const holdAuthCookie = async (ctx: Context, next: () => Promise<void>) => {
//   const cookies = new Cookies(ctx.request, ctx.response);

//   // Check if the authentication cookie is set
//   const authCookie = cookies.get("auth");

//   if (authCookie) {
//     try {
//       // Validate the authentication cookie here
//       const isValid = await validateAuthCookie(authCookie);

//       if (!isValid) {
//         // If the authentication cookie is invalid, delete it
//         cookies.delete("auth");
//       }
//     } catch (err) {
//       // If an error occurs, delete the authentication cookie
//       cookies.delete("auth");
//     }
//   }

//   // Call the next middleware
//   await next();
// };

// // Define a function to validate the authentication cookie
// const validateAuthCookie = async (authCookie: string): Promise<boolean> => {
//   // Add your authentication cookie validation logic here
//   return true;
// };
const app = new Application();
const router = new Router();


router.post("/valid/:id", async (ctx) => {
  const id = ctx.params.id;
  const body = await ctx.request.body();
 const check= await vlmconnect()
 check.updateOne(
    { _id: { $oid: id } },
    { $push: { vlm_verify: body.value } }
  );

  ctx.response.status = 200;
  ctx.response.body = { message: "User added successfully" };
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
