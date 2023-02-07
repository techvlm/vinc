// deno-lint-ignore-file
import 'https:/deno.land/x/dotenv@v3.2.0/load.ts';

import { RouterContext } from './vlmapp/deps.ts';

// router.get("/auth/instagram/callback", async (ctx) => {
//   const code = ctx.request.url.searchParams.get("code");
//   if (!code) {
//     ctx.response.status = 400;
//     ctx.response.body = "Code not found in the request";
//     return;
//   }
//   const res = await fetch(
//     `https://api.instagram.com/oauth/access_token`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: `client_id=${INSTAGRAM_CLIENT_ID}&client_secret=${INSTAGRAM_CLIENT_SECRET}&grant_type=authorization_code&redirect_uri=http://localhost:3000/auth/instagram/callback&code=${code}`,
//     }
//   );
//   const data = await res.json();
//   console.log(data);
//   ctx.response.status = 200;
//   ctx.response.body = "Authenticated successfully!";
// });
// app.use(router.routes());
// app.use(router.allowedMethods());
// await app.listen({ port: 3000 });
// router.get("/", async (ctx) => {
//     const header: Jose = {
//       alg: "HS256",
//       typ: "JWT",
//     };
//     const payload: Payload = {
//       sub: "test",
//       name: "deno",
//       iat: Date.now(),
//     };
//     const secret = "secret";
//     const jwt = makeJwt({ header, payload, key: secret });
//     ctx.cookies.set("access_token", jwt, {
//       httpOnly: true,
//       maxAge: 60000,
//       path: "/",
//     });
//     ctx.response.body = "Cookie set";
//   });
// router.get("/get-cookie", async (ctx) => {
//     const jwt = ctx.cookies.get("access_token");
//     ctx.response.body = jwt;
//   });
// class User {
//     private isAdmin: boolean;
//     constructor(isAdmin: boolean) {
//       this.isAdmin = isAdmin;
//     }
//     isAdministrator(): boolean {
//       return this.isAdmin;
//     }
//   }
//   const user = new User(true);
//   if (user.isAdministrator()) {
//     console.log("User is an administrator");
//   } else {
//     console.log("User is not an administrator");
//   }
// class AdminMiddleware {
//     async checkAdmin(ctx: Context, next: Next) {
//       if (!ctx.request.headers.get("Authorization")) {
//         ctx.response.status = 401;
//         ctx.response.body = "Not authorized";
//         return;
//       }
//       const adminRole = "admin";
//       const authorization = ctx.request.headers.get("Authorization")!;
//       const role = authorization.split(" ")[1];
//       if (role !== adminRole) {
//         ctx.response.status = 401;
//         ctx.response.body = "Not authorized";
//         return;
//       }
//       await next();
//     }
//   }
// import { Router, RouterContext } from "https://deno.land/x/oak/mod.ts";
// const router = new Router();
// router.get("/", (ctx: RouterContext) => {
//   ctx.response.headers.set("X-Custom-Header", "CustomValue");
//   ctx.response.body = "Hello World!";
// });
// export default router;
// class FormValidator {
//     static validateForm(user: string, email: string, pass: string): boolean {
//       const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//       if (!user || !email || !pass) {
//         return false;
//       }
//       if (!emailRegex.test(email)) {
//         return false;
//       }
//       return true;
//     }
//   }
// import { MongoClient } from "https://deno.land/x/mongo@v0.12.0/mod.ts";
// interface Todo {
//   _id: { $oid: string };
//   task: string;
//   completed: boolean;
// }
// class TodoService {
//   client: MongoClient;
//   dbName = "todo-app";
//   collectionName = "todos";
//   constructor(client: MongoClient) {
//     this.client = client;
//   }
//   async findOne(task: string): Promise<Todo | null> {
//     const db = this.client.database(this.dbName);
//     const collection = db.collection<Todo>(this.collectionName);
//     const todo = await collection.findOne({ task });
//     return todo;
//   }
// }
// const client = new MongoClient();
// client.connectWithUri("mongodb://localhost:27017");
// const todoService = new TodoService(client);
// const todo = await todoService.findOne("Learn Deno");
// console.log(todo);
// import { SmtpClient } from 'https:/deno.land/x/smtp@v0.7.0/mod.ts';
// router.get("/auth/instagram", (ctx) => {
//   const redirectUri = "http://localhost:3000/auth/instagram/callback";
//   const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code`;
//   ctx.response.redirect(authUrl);
// // });
// class FormValidator {
//   validateEmail(email:string) {
//     // Regular expression for email validation
//     const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return emailRegex.test(String(email).toLowerCase());
//   }
//   validateUsername(username:string) {
//     // Instagram usernames must be at least 4 characters long and can only contain letters, numbers, and underscores
//     const usernameRegex = /^[a-zA-Z0-9_]{4,}$/;
//     return usernameRegex.test(username);
//   }
//   validatePassword(password:string) {
//     // Example password validation: at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
//     return passwordRegex.test(password);
//   }
// }
// // Example usage
// const formValidator = new FormValidator();
// const email = "user@example.com";
// const username = "example_user";
// const password = "P@ssword1";
// const emailIsValid = formValidator.validateEmail(email);
// const usernameIsValid = formValidator.validateUsername(username);
// const passwordIsValid = formValidator.validatePassword(password);
// console.log("Email is valid:", emailIsValid);
// console.log("Username is valid:", usernameIsValid);
// console.log("Password is valid:", passwordIsValid);
// function randomNumberPicker(min: number, max: number): number {
//     return Math.floor(Math.random() * (max - min + 1) + min);
//   }
//   const result = randomNumberPicker(1, 100);
//   console.log(result); // Output: a random number between 1 and 100
// function randomStringPicker(strings: string[]): string {
//     return strings[Math.floor(Math.random() * strings.length)];
//   }
//   const fop=["vlm","cla","gop","shep"]
//   const dop=randomStringPicker(fop)
//   console.log(dop)
// import { Application, Router, RouterContext } from "https://deno.land/x/oak@v11.1.0/mod.ts";
// import { create, validate } from "https://deno.land/x/djwt@v2.8/mod.ts";
// const key = "secret_key";
// const header = {
//   alg: "HS256",
//   typ: "JWT",
// };
// const app = new Application();
// const router = new Router();
// router.post("/register", async (ctx: RouterContext) => {
//   const body = await ctx.request.body();
//   const payload = {
//     ...body.value,
//     exp: Math.floor(Date.now() / 1000) + 60,
//   };
//   const jwt = create({ header, payload, key });
//   ctx.response.cookies.set("jwt", jwt);
//   ctx.response.body = { message: "User registered successfully" };
// });
// router.get("/protected", async (ctx: ) => {
//   const jwt = ctx.request.cookies.get("jwt");
//   if (!jwt) {
//     ctx.response.status = 401;
//     ctx.response.body = { message: "Unauthorized" };
//     return;
//   }
//   const isValid = await validate(jwt, key);
//   if (!isValid) {
//     ctx.response.status = 401;
//     ctx.response.body = { message: "Unauthorized" };
//     return;
//   }
//   ctx.response.body = { message: "Protected resource" };
// });
// app.use(router.routes());
// app.use(router.allowedMethods());
// console.log("Listening on port 8080");
// await app.listen({ port: 8080 });
// creating an instance of smtpclient
// const client = new SmtpClient(); 
// // Extracting values from .env file
// const { SEND_EMAIL, PWD, RECV_EMAIL } = Deno.env.toObject();
// const connectConfig: any = {
//   hostname: "smtp.gmail.com",
//   port: 465,
//   username: SEND_EMAIL,
//   password: PWD,
// };
// await client.connectTLS(connectConfig);
// await client.send({
//     from: SEND_EMAIL,
//     to: RECV_EMAIL,
//     subject: "Welcome!",
//     content: "Hi from vincent!",
//   });
//   await client.close(); // closing the smtpclient connection;
// const client = new SmtpClient();
// await client.connectTLS({
//     hostname: "smtp.gmail.com",
//     port: 465,
//     username: "vincentmwendwa003@gmail.com",
//     password: "kopvfirdbdqvsslb",
//   });
//   await client.close();
// const document = new DOMParser().parseFromString(
//   `<!DOCTYPE html>
//   <html lang="en">
//     <head>
//       <title>Hello from Deno</title>
//     </head>
//     <body>
//       <h1>Hello from Deno</h1>
//       <form>
//         <input name="user">
//         <button>
//           Submit
//         </button>
//       </form>
//     </body>
//   </html>`,
//   "text/html",
// );

// assert(document);
// const h1 = new XMLHttpRequest();
// assert(h1);

// console.log(h1.textContent);\\

export function look(ctx:RouterContext){
    return ctx;
}


