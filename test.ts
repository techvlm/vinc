import 'https:/deno.land/x/dotenv@v3.2.0/load.ts';

// import { v1, v4 } from 'https:/deno.land/std@0.177.0/uuid/mod.ts';
// import { SmtpClient } from './vlmapp/deps.ts';
// await client.connectTLS({
//     hostname: "smtp.gmail.com",
//     port: 465,
//     username: "vincentmwendwa003@gmail.com",
//     password: "kopvfirdbdqvsslb",
//   });
//   await client.send({
//     from: "vincentmwendwa003@gmail.com",
//     to: "vincentmendwa@gmail.com",
//     subject: "Welcome!",
//     content: "Hi from vincent!",
//   });
//   await client.close();
// const { SEND_EMAIL, PWD,RECV_EMAIL} = Deno.env.toObject();
// await client.connectTLS({
//     hostname: "smtp.gmail.com",
//     port: 465,
//     username: SEND_EMAIL,
//     password: PWD,
//   });
//   await client.send({
//     from: SEND_EMAIL,
//     to: RECV_EMAIL,
//     subject: "Welcome! by vlm corpotion",
//     content: "Hi from vincent blog !",
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
// const router = new Router();
// await client.connect(
//   "mongodb+srv://deno_portfolio:vlmlucy3256#@vlmportfolio.8sadjb3.mongodb.net?authMechanism=SCRAM-SHA-1",
//   );
//   client.database("deno_portfolio").collection("vlmusers");
//     console.log("connected")
// router.post("/", async (ctx:Context) => {
//   if (!ctx.request.hasBody) {
//     ctx.response.body = "No body was found"
//   }
//   ctx.response.body = ` <!DOCTYPE html>
//   <html>
//     <head><title>Hello oak!</title><head>
//     <body>
//       <h1>Hello oak!</h1>
//     </body>
//   </html>
// `;
// });
// const app = new Application();
// app.use(router.routes());
// app.use(router.allowedMethods());
// console.log('server is runnig')
// await app.listen({ port: 8000 });
// Defining schema interface
// these functions does not exist yet, we will create them later 
// if(pass !=null){
//     const vlmhash=hashSync(pass)
//     const userhope:any={
//         user,
//         email,
//         pass:vlmhash
//     }
//         // auth for user
//             const check = await vlmexistuser(userhope.user);
//             if (check) {
//                 ctx.response.status = 422;
//                 ctx.response.body=await renderFileToString(`${Deno.cwd()}/vlmapp/static/register.ejs`,{error:`The username ${user} is already taken :(`,title:"Please try again !"});
//                 return;
//               }
//         // auth for email
//             const checks = await vlmexistemail(userhope.email)
//             if (checks) {
//                 ctx.response.status = 422;
//                 ctx.response.body=await renderFileToString(`${Deno.cwd()}/vlmapp/static/register.ejs`,{error:`The email ${email} is already taken :(`,title:"Please try again !"});
//                 return;
//               }
//         // auth for all inputs
//         const username =new vlmval();
//         if(!username.validateUsername(userhope.user)){
//             ctx.response.status = 422;
//             ctx.response.body=await renderFileToString(`${Deno.cwd()}/vlmapp/static/register.ejs`,{error:`your [${user} ] should be  above 4 characters and contain letters/numbers/underscores :(`,title:"Please try again !"});
//             return;
//         }
//         if(!username.validateEmail(userhope.email)){
//             ctx.response.status = 422;
//             ctx.response.body=await renderFileToString(`${Deno.cwd()}/vlmapp/static/register.ejs`,{error:`your ${email} is missing @gmail.com :(`,title:"Please try again !"});
//             return;
//         }
//         if(!username.validatePassword(pass)){
//             ctx.response.status = 422;
//             ctx.response.body=await renderFileToString(`${Deno.cwd()}/vlmapp/static/register.ejs`,{error:`your password is missing some properties :(`,title:"Please try again !"});
//             return;
//         }else{
//             await vlmcreategist(userhope.user,userhope.email,userhope.pass)
//             ctx.response.status =201;
//             ctx.response.redirect("/Signin");
//         }
//         // post your contents to the database
//     }
// vlmcreategist(user,email,pass);
// ctx.response.body=201;
// ctx.response.redirect("/Signin")
// const {user,pass,cluster,host}=config()
// const client =new MongoClient();
// // const like = `mongodb+srv://${user}:${pass}@${cluster}/testdb?retryWrites=true&w=majority&authMechanism=SCRAM-SHA-1`;
// const likes = `mongodb+srv://vlmusers:BX7meDCl2WSUtYoL@vlm.7ymg1vs.mongodb.net/testdb?retryWrites=true&w=majority&authMechanism=SCRAM-SHA-1`;
// await client.connect(likes);
// console.log("connected...")
// client.database("testdb")
// const namespace = "1b671a64-40d5-491e-99b0-da01ff1f3341";
// const uuid=v5.generate({ value: "", namespace },);
// deno-lint-ignore-file
// deno-lint-ignore-file
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
//   await client.close(); // closing the smtpclient connection;
// const client = new SmtpClient();
// const uuid=v1.generate();
// //Output: f9a6bd30-7226-11eb-87c6-f509b6963f51
// console.log(uuid)
// v4.validate("f7c6-f509b6963f51");
// const myUUID = crypto.randomUUID();
// console.log("Random UUID:", myUUID);
// console.log(uuid.validate("not a UUID")); // false
// console.log(uuid.validate("6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b")); // true
// console.log(uuid.v1.generate());
// const NAMESPACE_URL = myUUID;
// const data = new TextEncoder().encode("");
// const yo= await uuid.v5.generate(NAMESPACE_URL, data);
// console.log( uuid.v5.validate(yo))
// console.log(v5.validate(yo))
// console.log(await vlminserttoken("myemail"))
// const top =sets
// const ay:any=await top.vlmgen("myemail")
// console.log(v5.validate(ay))
// console.log(ay)
// const {lop,PWD}=config()
// console.log(lop)
// console.log(PWD)
// // console.log(await validatejwt("fake jwt"))
// const vop = await compareSync("vincent123#S","$2a$10$wh2dFG4OqGKIniHzYIiL1ObhPKyJjk0ncqqFDqieXVp5jMhOorZDa")
// console.log(vop)
// const client = new MongoClient();
// client.connect("mongodb://localhost:27017/vlmdbuser");
// // mongodb://localhost:27017/vlmdbuser
// console.log("connected to local mongo...")
// await client.database("vlmdbuser").collection("vlmusers");
const dbHost = Deno.env.get("PWD");
const dbPort = Deno.env.get("SEND_EMAIL");
const dbName = Deno.env.get("RECV_EMAIL");
const dbPassword = Deno.env.get("VLM");

console.log(`Database connection info: ${dbPassword}@${dbHost}:${dbPort}/${dbName}`);
