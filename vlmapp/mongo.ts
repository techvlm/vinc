import 'https:/deno.land/x/dotenv@v3.2.0/load.ts';

import { Bson, Collection, create, getNumericDate, MongoClient } from './deps.ts';
import { vlmkey } from './validate.ts';

// deno-lint-ignore-file
// deno-lint-ignore-file
export async function vlmconnect():Promise<Collection<vlmUserSchema>>{
  const client = new MongoClient();
  // await client.connect(
  //   "mongodb+srv://deno_portfolio:vlmlucy3256#@vlmportfolio.8sadjb3.mongodb.net?authMechanism=SCRAM-SHA-1",
  //   );
  
// Connecting to a Local Database
await client.connect("mongodb://127.0.0.1:27017")
return client.database("deno_portfolio").collection<vlmUserSchema>("vlmusers");
}
export function vlmtoken(payload:any):Promise<string>{
  // const { VLM_JWT_SECRET } = Deno.env.toObject();
  // const key = Deno.env.get("VLM_JWT_SECRET") as string;
  return create({alg:"HS512",typ:"JWT"},payload,vlmkey);
}

export function vlmpayload(username:string){
  return {
    username,
    role:"admin",
    exp:getNumericDate(60*60)

  }
}
export const vlmexistemail = async (email:string) => {
  const result = await vlmconnect()
  const res = await result.findOne( {email} );
  return !!res;
};
export const vlmexistuser = async (user:string) => {
  const result = await vlmconnect()
  const res = await result.findOne( {user} );
  return !!res;
};
export async function vlminsert(vlmgist:any):Promise<string>{
  const collection= await vlmconnect(); 
    return (await collection.insertOne(vlmgist)).toString();
}
export async function vlmfindemail(vlm:string){
  const collection= await vlmconnect(); 
  collection.findOne({ email: vlm })
}

export async function vlmfetch(skip:number,limit:number):Promise<any> {
  const collection= await vlmconnect(); 
  return (collection.find().skip(skip).limit(limit)).toArray();

}

export async function vlmfetchs(id:string):Promise<any> {
  const collection= await vlmconnect(); 
  return await collection.findOne(
    { _id: new Bson.ObjectId(id) },
    { noCursorTimeout: false } as any,
  );
}


export async function vlmdeleteGist(id: string): Promise<any> {
  const collection = await vlmconnect();
  return await collection.deleteOne({ _id: new Bson.ObjectId(id) });
}

export async function vlmupdateGist(gist: any): Promise<any> {
  const collection = await vlmconnect();
  const filter = { _id: new Bson.ObjectId(gist.id) };
  const update = { $set: { content: gist.content } };
  return await collection.updateOne(filter, update);
}


// Defining schema interface
interface vlmUserSchema {
  _id: {$oid:string};
  user:string;
  email:string;
  password:string;
  created_at:string;
}