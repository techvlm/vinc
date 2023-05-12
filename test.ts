import 'https:/deno.land/x/dotenv@v3.2.0/load.ts';

// import { parse } from 'https:/deno.land/std/path/mod.ts';
// import { Application, Router } from 'https:/deno.land/x/oak/mod.ts';

// deno-lint-ignore-file
// import { readFile } from "https://deno.land/std@0.178.0/fs/mod.ts";
// import { MongoClient } from "https://deno.land/x/mongo/mod.ts";
// import { existsSync } from "https://deno.land/std/fs/mod.ts";
// async function postJsonToMongoDB(url: string, databaseName: string, collectionName: string, jsonFilePath: string): Promise<void> {
//   const client = new MongoClient();
//   await client.connect(url);
//   const db = client.database(databaseName);
//   const collection = db.collection(collectionName);
//   if (!existsSync(jsonFilePath)) {
//     throw new Error("JSON file does not exist.");
//   }
//   const jsonData = await Deno.readTextFile(jsonFilePath);
//   const jsonObject = JSON.parse(jsonData);
//   await collection.insertOne(jsonObject);
//   console.log('JSON file inserted successfully into MongoDB.');
//   client.close();
// }
// import { MongoClient } from "https://deno.land/x/mongo/mod.ts";
// async function deleteAllRecords(url: string, databaseName: string, collectionName: string): Promise<void> {
//   const client = new MongoClient();
//   await client.connect(url);
//   const db = client.database(databaseName);
//   const collection = db.collection(collectionName);
//   await collection.deleteMany({});
//   console.log('All records deleted successfully from MongoDB.');
//   client.close();
// }
// const deleteCount = await users.deleteOne({ _id: insertId });
// const deleteCount2 = await users.deleteMany({ username: "test" });
// using cursor methods
// const cursor = users.find();
// Skip & Limit
// cursor.skip(10).limit(10);
// // iterate results
// for await (const user of cursor) {
//   console.log(user);
// }
// // or save results to array (uses more memory)
// const users = await cursor.toArray();
// interface ImageData {
//   dataUrl: string;
// }
// async function appendImageDataToFile(filePath: string, imageData: ImageData): Promise<void> {
//   let fileContents = await Deno.readFile(filePath);
//   let jsonData = JSON.parse(new TextDecoder().decode(fileContents)) as ImageData[];
//   jsonData.push(imageData);
//   await Deno.writeFile(filePath, new TextEncoder().encode(JSON.stringify(jsonData)));
//   console.log('Image data URL appended successfully to file.');
// }
// 
// import { MongoClient } from "https://deno.land/x/mongo/mod.ts";
// interface ImageData {
//   dataUrl: string;
// }
// async function appendImageDataToFileFromMongoDB(url: string, databaseName: string, collectionName: string, filePath: string): Promise<void> {
//   const client = new MongoClient();
//   await client.connect(url);
//   const db = client.database(databaseName);
//   const collection = db.collection(collectionName);
//   const result = await collection.findOne({});
//   const imageData = result.imageData as ImageData;
//   let fileContents = await fetch(filePath);
//   let jsonData = await fileContents.json() as ImageData[];
//   jsonData.push(imageData);
//   await Deno.writeFile(filePath, new TextEncoder().encode(JSON.stringify(jsonData)));
//   console.log('Image data URL appended successfully to file.');
//   client.close();
// }
// import { MongoClient } from "https://deno.land/x/mongo/mod.ts";
// interface ImageData {
//   dataUrl: string;
// }
// async function appendImageDataToJsonFile(url: string, databaseName: string, collectionName: string, filePath: string): Promise<void> {
//   const client = new MongoClient();
//   await client.connect(url);
//   const db = client.database(databaseName);
//   const collection = db.collection(collectionName);
//   const jsonData: ImageData[] = [];
//   for await (const document of collection.find()) {
//     jsonData.push(document.imageData);
//   }
//   const fileContents = await Deno.readFile(filePath);
//   const existingJsonData = JSON.parse(new TextDecoder().decode(fileContents)) as ImageData[];
//   const combinedJsonData = [...existingJsonData, ...jsonData];
//   await Deno.writeFile(filePath, new TextEncoder().encode(JSON.stringify(combinedJsonData, null, 2)));
//   console.log('Image data URLs appended successfully to JSON file.');
//   client.close();
// }
// await appendImageDataToJsonFile('mongodb://localhost:27017', 'myDatabase', 'myCollection', '/path/to/json/file.json');
// console.log('Image data URLs appended to JSON file.');
// import { MongoClient } from "https://deno.land/x/mongo/mod.ts";
// interface ImageData {
//   dataUrl: string;
// }
// async function appendImageDataToJsonFile(url: string, databaseName: string, collectionName: string, filePath: string): Promise<void> {
//   // Connect to MongoDB database
//   const client = new MongoClient();
//   try {
//     await client.connect(url);
//     console.log("Connected to MongoDB database.");
//   } catch (error) {
//     console.error(`Failed to connect to MongoDB database: ${error}`);
//     throw error;
//   }
//   // Get collection and query for image data
//   const db = client.database(databaseName);
//   const collection = db.collection<ImageData>(collectionName);
//   const cursor = collection.find({});
//   const jsonData: ImageData[] = [];
//   try {
//     for await (const document of cursor) {
//       jsonData.push(document);
//     }
//     console.log(`Retrieved ${jsonData.length} image data objects from MongoDB collection.`);
//   } catch (error) {
//     console.error(`Failed to retrieve image data from MongoDB collection: ${error}`);
//     throw error;
//   }
//   // Read existing JSON file and append image data
//   const existingJsonData: ImageData[] = [];
//   try {
//     const fileContents = await Deno.readFile(filePath);
//     const decoder = new TextDecoder();
//     const jsonString = decoder.decode(fileContents);
//     existingJsonData.push(...JSON.parse(jsonString));
//     console.log(`Read ${existingJsonData.length} image data objects from existing JSON file.`);
//   } catch (error) {
//     console.warn(`Failed to read existing JSON file: ${error}. Will create new file.`);
//   }
//   const combinedJsonData = [...existingJsonData, ...jsonData];
//   // Write combined image data to JSON file
//   try {
//     const encoder = new TextEncoder();
//     const jsonBytes = encoder.encode(JSON.stringify(combinedJsonData, null, 2));
//     await Deno.writeFile(filePath, jsonBytes);
//     console.log(`Appended ${jsonData.length} image data objects to JSON file at ${filePath}.`);
//   } catch (error) {
//     console.error(`Failed to write image data to JSON file: ${error}`);
//     throw error;
//   }
//   // Close MongoDB client
//   try {
//     await client.close();
//     console.log("Disconnected from MongoDB database.");
//   } catch (error) {
//     console.error(`Failed to disconnect from MongoDB database: ${error}`);
//     throw error;
//   }
// }
// checking image validity
// async function isValidImage(filePath: string): Promise<boolean> {
//   try {
//     const file = await Deno.open(filePath);
//     const buffer = new Uint8Array(10);
//     await file.read(buffer);
//     await file.close();
//     const validImageTypes = ["png", "jpg", "jpeg", "gif", "webp"];
//     const type = await fileType.fromBuffer(buffer);
//     return type !== undefined && validImageTypes.includes(type.ext);
//   } catch (error) {
//     console.error(`Error checking validity of image at ${filePath}: ${error}`);
//     return false;
//   }
// }
// async function isValidImageFile(filePath: string): Promise<boolean> {
//   try {
//     // Check file extension
//     const allowedExtensions = [".png", ".jpg", ".jpeg", ".gif"];
//     const extension = filePath.slice(filePath.lastIndexOf(".")).toLowerCase();
//     if (!allowedExtensions.includes(extension)) {
//       console.log(`File "${filePath}" has invalid extension "${extension}".`);
//       return false;
//     }
//     // Check file contents
//     const fileContents = await Deno.readFile(filePath);
//     const firstBytes = new Uint8Array(fileContents.slice(0, 4));
//     const pngSignature = new Uint8Array([0x89, 0x50, 0x4e, 0x47]);
//     const jpegSignature = new Uint8Array([0xff, 0xd8, 0xff]);
//     const gifSignature = new Uint8Array([0x47, 0x49, 0x46, 0x38]);
//     if (firstBytes.every((byte, i) => byte === pngSignature[i])) {
//       console.log(`File "${filePath}" is a valid PNG image.`);
//       return true;
//     } else if (firstBytes.every((byte, i) => byte === jpegSignature[i])) {
//       console.log(`File "${filePath}" is a valid JPEG image.`);
//       return true;
//     } else if (firstBytes.every((byte, i) => byte === gifSignature[i])) {
//       console.log(`File "${filePath}" is a valid GIF image.`);
//       return true;
//     } else {
//       console.log(`File "${filePath}" is not a valid image file.`);
//       return false;
//     }
//   } catch (error) {
//     console.error(`Failed to check validity of file "${filePath}": ${error}`);
//     throw error;
//   }
// }
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
// const dbHost = Deno.env.get("PWD");
// const dbPort = Deno.env.get("SEND_EMAIL");
// const dbName = Deno.env.get("RECV_EMAIL");
// const dbPassword = Deno.env.get("VLM");
// console.log(`Database connection info: ${dbPassword}@${dbHost}:${dbPort}/${dbName}`);
// const env=config();
// const envConfig = parse(`
//  DB_HOST=${env.DB_HOST}
//  DB_PORT=${env.DB_PORT}
// `);
// console.log(envConfig.env.DB_HOST); // "localhost"
// console.log(envConfig.env.DB_PORT); // "5432"
// console.log(envConfig); // "mydb"
// console.log(envConfig); // "myuser"
// console.log(envConfig); // "mypassword"
// const app = new Application();
// const router = new Router();
// router.post("/signup", async (ctx) => {
//   // Parse the request body to get the user's email address and other details
//   const body = await ctx.request.body().value;
//   const { email, name } = body;
// Configure the SMTP client with your SMTP server details
//   const smtpClient = new SmtpClient();
//   await smtpClient.connectTLS({
//     hostname: "smtp.example.com",
//     port: 587,
//     username: "your-smtp-username",
//     password: "your-smtp-password",
//   });
//   // Compose the email message
//   const message = {
//     from: "your-email@example.com",
//     to: email,
//     subject: `Welcome to our app, ${name}!`,
//     body: `Hi ${name},\n\nWelcome to our app! We're excited to have you join us.`,
//   };
//   // Send the email
//   await smtpClient.send(message);
//   // Close the SMTP connection
//   await smtpClient.close();
//   // Send a response to the client
//   ctx.response.status = 201;
//   ctx.response.body = "Signup successful!";
// });
// app.use(router.routes());
// app.use(router.allowedMethods());
// await app.listen({ port: 8000 });
// const client = new SmtpClient();
// try {
// await client.connectTLS({
//   hostname: "smtp.gmail.com",
//   port: 465,
//   username: "vincentmendwa@gmail.com",
//   password:"kebhmepvkaantgme",
// });
//   await client.send({
//     from: "vincentmendwa@gmail.com",
//     to: "vincentmwendwa003@gmail.com",
//     subject: "Mail Title",
//     content: "Mail Content",
//     html: "<a href='https://github.com'>Github</a>",
//   });
//   await client.close();
// } catch (error) {
//   console.log(red("VLM :) " + error))
// }
// await client.connectTLS({
//   hostname: "smtp.gmail.com",
//   port: 465,
//   username: "vincentmendwa@gmail.com",
//   password:"kebhmepvkaantgme",
// });
// await client.send({
//   from:"vincentmendwa@gmail.com",
//   to: "vincentmwendwa003@gmail.com",
//   subject: "Welcome  Please confirm your email address",// Email address of the destination
//   content:`
//       <html>
//       <body>
//       <a  style="padding:20px 20px 20px; background:blue;color:salmon; " href="/">click me</a>
//       </body>
//       </html>
//   `,
// });
// // const url = `http://localhost:5050/valid?vlm,`
// // const yu=url.split(",").map((item)=>`${item}=`).join("")
// // console.log(yu)
// // const inputString = "apple,banana,orange";
// // const outputString = inputString.split(",").map((item) => `${item}=`).join("");
// // console.log(outputString); // "apple=banana=orange="
// // const myString = `http://localhost:5050/valid?vlm call`;
// // const myArray = myString.split(" ");
// // const myNewString = myArray.join("=");
// // console.log(myNewString); // "hello=world"
// const delayMiddleware: Middleware = async (ctx, next) => {
//   await new Promise((resolve) => setTimeout(resolve, 10000));
//   await next();
// };
// const router = new Router();
// router.use("/delayed", delayMiddleware);
// router.get("/delayed", (ctx) => {
//   ctx.response.body = "This response was delayed by 2 seconds";
// });
// router.get("/not-delayed", (ctx) => {
//   ctx.response.body = "This response was not delayed";
// });
// const app = new Application();
// app.use(router.routes());
// app.use(router.allowedMethods());
// await app.listen({ port: 8000 });
// import { writeJson } from "std/fs/mod.ts";
// async function addObjectToJson(objectToAdd: object, filePath: string): Promise<void> {
//   try {
//     // Read existing JSON data from the file
//     const existingData = await readJson(filePath);
//     // Add the new object to the existing data
//     const newData = { ...existingData, ...objectToAdd };
//     // Write the updated JSON data to the file
//     await writeJson(filePath, newData);
//   } catch (error) {
//     console.error(`Error adding object to JSON file: ${error.message}`);
//   }
// }
// function handleButtonClick(): void {
//   console.log("Button clicked!");
// }
// const router = new Router();
// router.get("/", (ctx) => {
//   ctx.response.body = `
//     <html>
//       <head>
//         <title>Button Click Example</title>
//       </head>
//       <body>
//         <button id="my-button">Click me!</button>
//         <script>
//           const button = document.querySelector("#my-button");
//           button.addEventListener("click", () => {
//             fetch("/button-clicked");
//           });
//         </script>
//       </body>
//     </html>
//   `;
// });
// router.get("/button-clicked", (ctx) => {
//   handleButtonClick();
//   ctx.response.body = "Button clicked!";
// });
// const app = new Application();
// app.use(router.routes());
// app.use(router.allowedMethods());
// await app.listen({ port: 8000 });
// const app = new Application();
// const router = new Router();
// // Define the Data API endpoint and API key
// const DATA_API_ENDPOINT = "https://data-api.mongodb.com/v2";
// const DATA_API_KEY = "your-api-key";
// // Define the MongoDB realm, cluster, and database details
// const REALM_ID = "your-realm-id";
// const CLUSTER_NAME = "your-cluster-name";
// const DB_NAME = "your-database-name";
// // Define the login route and function
// router.post("/login", async (ctx:any) => {
//   const { username, password } = await ctx.request.body().value;
//   // Send a request to the Data API to authenticate the user
//   const response = await fetch(`${DATA_API_ENDPOINT}/auth/providers/mongodb-cloud/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${DATA_API_KEY}`,
//     },
//     body: JSON.stringify({
//       username,
//       password,
//       options: {
//         realm: REALM_ID,
//       },
//     }),
//   });
//   const { access_token } = await response.json();
//   // Send a request to the Data API to get a MongoDB connection string
//   const response2 = await fetch(`${DATA_API_ENDPOINT}/groups/${REALM_ID}/clusters/${CLUSTER_NAME}/databaseUsers/${username}/mongodbConnectionStrings?databaseName=${DB_NAME}`, {
//     headers: {
//       "Authorization": `Bearer ${access_token}`,
//     },
//   });
//   const { hosts, username: dbUsername, password: dbPassword } = await response2.json();
//   const connectionString = `mongodb+srv://${dbUsername}:${dbPassword}@${hosts.join(",")}/${DB_NAME}?retryWrites=true&w=majority`;
//   // Use the connection string to connect to MongoDB using the Deno MongoDB driver
//   const client = new MongoClient();
//   await client.connect(connectionString);
//   const db = client.database(DB_NAME);
//   // Define the user collection and schema
//   interface User {
//     _id: { $oid: string };
//     username: string;
//     password: string;
//     role: "user" | "admin";
//   }
//   const users = db.collection<User>("users");
//   // Find the user in the database
//   const user = await users.findOne({ username });
//   // Check if the user exists and the password is correct
//   if (user && user.password === password) {
//     if (user.role === "admin") {
//       // If the user is an admin, set a session variable and redirect to admin page
//       ctx.state.session = { userId: user._id.$oid };
//       ctx.response.redirect("/admin");
//     } else {
//       // If the user is not an admin, redirect to regular user page
//       ctx.response.redirect("/user");
//     }
//   } else {
//     // If the user does not exist or the password is incorrect, redirect to login page with error message
//     ctx.response.redirect("/login?error=invalid_credentials");
//   }
// });
// // Define the admin route (requires session variable to be set)
// router.get("/admin", async (ctx:any)=> {
//   if (ctx.state.session && ctx.state.session.userId) {
//     // Get the user from the session variable
//     const userId = ctx.state.session.userId;
//     const client = new MongoClient();
//     await client.connect(connectionString);
//     const { hosts, username: dbUsername, password: dbPassword } = await response2.json();
//     const connectionString = `mongodb+srv://${dbUsername}:${dbPassword}@${hosts.join(",")}/${DB_NAME}?retryWrites=true&w=majority`;
//     const db = client.database(DB_NAME);
//     const users = db.collection<User>("users");
//     const user = await users.findOne({ _id: { $oid: userId } });
//     // Check if the user is an admin
//     if (user && user.role){}
//   }
// }
// ) 
// console.log(Deno.env.toObject().SEND_EMAIL)
// console.log(Deno.env.get("SEND_EMAIL"))
// const app = new Application();
// app.use(async (context) => {
//   if (context.request.url.pathname === "/manifest.json") {
//     const manifestPath = path.join(Deno.cwd(), "manifest.json");
//     await send(context, manifestPath);
//   }
// });
// await app.listen({ port: 8000 });\\\
// const app = new Application();
// const router = new Router();
// // Define a route to handle the image upload
// router.post("/upload-image", async (context) => {
//   // Get the data URL from the request body
//   const body = await context.request.body();
//   const dataUrl = body.value;
//   // Parse the data URL to get the image data and type
//   const matches = dataUrl.match(/^data:(.+);base64,(.*)$/);
//   if (!matches) {
//     context.response.status = 400;
//     context.response.body = "Invalid data URL";
//     return;
//   }
//   const [, type, base64Data] = matches;
//   const data = atob(base64Data);
//   // Generate a unique filename for the image
//   const timestamp = new Date().getTime();
//   const filename = `${timestamp}.${type.split("/")[1]}`;
//   // Write the image data to a new file
//   const path = fromFileUrl(import.meta.url);
//   await writeFile(`${path}/uploads/${filename}`, data, { format: "base64" });
//   // Respond with the filename
//   context.response.body = filename;
// });
// app.use(router.routes());
// app.use(router.allowedMethods());
// await app.listen({ port: 8000 });
// const app = new Application();
// const router = new Router();
// router.get("/image", async (ctx) => {
//   // Read the image file as an array buffer
//   const file = await Deno.readFile("./vlmapp/static/img/product-8.jpg");
//   // Convert the array buffer to a base64-encoded string
//   const base64 = btoa(String.fromCharCode(...new Uint8Array(file)));
//   // Construct the data URL
//   const dataUrl = `data:image/jpeg;base64,${base64}`;
//   // Set the response body to the data URL
//   ctx.response.body = dataUrl;
// });
// app.use(router.routes());
// app.use(router.allowedMethods());
// await app.listen({ port: 8000 });
// const app = new Application();
// const router = new Router();
// router.get("/image-to-data-url", async (ctx) => {
//   const image = await Deno.readFile("./vlmapp/static/img/product-8.jpg");
//   const base64 = btoa(String.fromCharCode(...new Uint8Array(image)));
//   const dataUrl = `data:image/png;base64,${base64}`;
//   ctx.response.body = dataUrl;
// });
// app.use(router.routes());
// await app.listen({ port: 3000 });
// const data = {
//   name: "John",
//   age: 30,
//   address: {
//     city: "New York",
//     state: "NY",
//     zip: "10001",
//   },
//   hobbies: ["reading", "hiking", "photography"],
// };
// // Encode the data using MongoDB's BSON encoder
// const encodedData = Bson.serialize(data);
// // Decode the encoded data using MongoDB's BSON decoder
// const decodedData = Bson.deserialize(encodedData);
// console.log(decodedData);
// console.log(encodedData)
// const data = {
//   name: "John",
//   age: 30,
//   address: {
//     city: "New York",
//     state: "NY",
//     zip: "10001",
//   },
//   hobbies: ["reading", "hiking", "photography"],
// };
// // Encode the data using MongoDB's BSON encoder
// const encodedData = Bson.serialize(data);
// console.log(encodedData);
// webhook
// const app = new Application();
// const router = new Router();
// // Define a route for the webhook endpoint
// router.post("/webhook", async (ctx) => {
//   // Extract the payload from the webhook request
//   const payload = await ctx.request.body().value;
//   // Execute a command on the Windows command prompt
//   const cmd = `echo ${payload} > C:\\webhook.txt`;
//   const process = Deno.run({ cmd: ["cmd.exe", "/c", cmd] });
//   await process.status();
//   // Send a response back to the webhook
//   ctx.response.body = "Webhook received";
// });
// app.use(router.routes());
// app.use(router.allowedMethods());
// await app.listen({ port: 8000 });
// const app = new Application();
// // Get the Ngrok tunnel URLs for HTTP and HTTPS
// const httpUrl = await getNgrokUrl("http");
// const httpsUrl = await getNgrokUrl("https");
// // Set the Oak app to listen on the Ngrok tunnel URLs
// app.listen({ port: 8000, hostname: httpUrl });
// app.listen({ port: 8443, hostname: httpsUrl, secure: true });
// console.log(`Listening on ${httpUrl} (HTTP) and ${httpsUrl} (HTTPS)`);
// async function getNgrokUrl(protocol: "http" | "https") {
//   const { stdout } = await exec(`ngrok ${protocol} 8000 --log=stdout`);
//   return stdout.trim().split("\n").pop().split(" ")[1];
// }
// import { Application } from "https://deno.land/x/oak/mod.ts";
// import { exec } from "https://deno.land/x/exec/mod.ts";
// const app = new Application();
// // Get the Ngrok tunnel URL
// const { stdout } = await exec("ngrok http 8000 --log=stdout");
// const tunnelUrl = stdout.trim().split("\n").pop().split(" ")[1];
// // Set the Oak app to listen on the Ngrok tunnel URL
// app.listen({ port: 8000, hostname: tunnelUrl });
// console.log(`Listening on ${tunnelUrl}`);
// import * as exec from "https://deno.land/x/exec@0.0.5/mod.ts";
// import axios from 'axios';
// const OPENAI_API_KEY = 'YOUR_API_KEY';
// async function generateText(prompt: string): Promise<string> {
//   const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-002/completions', {
//     prompt,
//     max_tokens: 1024,
//     n: 1,
//     temperature: 0.5,
//   }, {
//     headers: {
//       Authorization: `Bearer ${OPENAI_API_KEY}`,
//       'Content-Type': 'application/json',
//     },
//   });
//   return response.data.choices[0].text.trim();
// }
// const prompt = 'Hello, can you please tell me about the weather today?';
// generateText(prompt)
//   .then(response => console.log(response))
//   .catch(error => console.error(error));
// const app = new Application();
// const router = new Router();
// router.post("/api/upload", async (context) => {
//   const formData = await context.request.body({ type: "form" }).value;
//   const images:any = formData.get('images');
//   if (images && images.length) {
//     for (const image of images) {
//       const reader = new FileReader();
//       reader.readAsDataURL(image);
//       reader.onload = function() {
//         const dataUrl = reader.result;
//         console.log(dataUrl);
//       };
//     }
//   }
//   context.response.body = { message: "Images uploaded" };
// });
// app.use(router.routes());
// app.use(router.allowedMethods());
// await app.listen({ port: 8000 });
// const app = new Application();
// const router = new Router();
// router.get("/", async (ctx) => {
//   const body = await renderFileToString(join(Deno.cwd(), "vlm.ejs"), { imageDataUrl: null });
//   ctx.response.body = body;
// });
// router.post("/", async (ctx) => {
//   const formData = await ctx.request.body().value;
//   const imageFile = formData.files && formData.files.image;
//   if (imageFile) {
//     const dirPath = "./vlmapp/static/images";
//     await ensureDir(dirPath);
//     const filePath = `${dirPath}/${imageFile.name}`;
//     const reader = await Deno.open(imageFile.path);
//     const writer = await Deno.open(filePath, { write: true, create: true });
//     await Deno.copy(reader, writer);
//     reader.close();
//     writer.close();
//     const imageDataUrl = `data:${imageFile.type};base64,${btoa(String.fromCharCode(...await Deno.readFile(filePath)))}`;
//     const body = await renderFileToString(join(Deno.cwd(), "vlm.ejs"), { imageDataUrl });
//     ctx.response.body = body;
//   } else {
//     ctx.response.redirect("/");
//   }
// });
// app.use(router.routes());
// await app.listen({ port: 8000 });
// const server = new Server({
//   addr: ":8000", handler: async (req) => {
//     const parsed = await multiParser(req)
//     console.log(parsed);
//     return new Response(`
//     <h3>Deno http module</h3>
//     <form action="/upload" enctype="multipart/form-data" method="post">
//       <div>singleStr: <input type="text" name="singleStr" /></div>
//       <div>singleImg: <input type="file" name="singleImg"/></div>
//       <input type="submit" value="Upload" />
//     </form>
//   `, {
//       headers: {
//         "Content-Type": "text/html; charset=utf-8"
//       }
//     })
//   }
// });
// await server.listenAndServe()
// import { decode as base64Decode, encode as base64Encode } from 'https://deno.land/std@0.82.0/encoding/base64.ts';
//     // Read the FormData in Oak server:
//     const body = await request.body({ type: 'form-data'});
//     const form = await body.value.read();
//      // Get the Image from the FormData (wich comes encoded in a base64 string)
//      let Image = form.fields.Canvas_Image;
//      // Replace characters so the decoding has no problems.
//      Image = Image.replace("data:image/png;base64,", "");
//      Image = Image.replace(" ", "+");
//      // Use this method from the std library to decode it:
//      let DecodedImage = base64Decode(Image);
//    // Import required modules
// const app = new Application();
// const router = new Router();

// router.get("/", (ctx) => {
//   ctx.response.body = `
//     <html>
//       <body>
//         <form action="/upload" method="post" enctype="multipart/form-data">
//           <label for="image-input">Select an image file:</label>
//           <input type="file" id="image-input" name="image">
//           <button type="submit">Submit</button>
//         </form>
//       </body>
//     </html>
//   `;
// });

// router.post("/upload", async (ctx) => {
//   const formData = await ctx.request.body({ type: "form-data" }).value;
//   const imageFile = formData.stream()
//   if (!imageFile) {
//     ctx.response.status = 400;
//     ctx.response.body = "Image file not found";
//     return;
//   }

//   const { path } = imageFile;
//   const { dir, name, ext } = parse(path);

//   // Do something with the parsed path properties
//   console.log(dir); // "/path/to/images"
//   console.log(name); // "filename"
//   console.log(ext); // ".jpg"

//   ctx.response.body = "Image uploaded successfully";
// });

// app.use(router.routes());
// app.use(router.allowedMethods());

// await app.listen({ port: 8000 });
const fo=Deno.env.toObject()
console.log(fo.pwd)
//     const files = formDataBody.files; //Return array of files
//     if (files) {
//       files.map((file) => {
//         console.log(file.content); // "undefined" or "Uint8Array"
//       });
//     }
    // console.log(formDataBody.fields)
    // console.log(formDataBody.files)
    // const files = formDataBody.files; //Return array of files
    // if (files) {
    //   files.map((file) => {
    //     file.content; // "undefined" or "Uint8Array"
    //   });
    // }
    // const blob = new Blob([decodedImageData], { type: "image/jpeg" });
// console.log(blob)
