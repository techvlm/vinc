// import { config } from 'https:/deno.land/x/dotenv@v3.2.0/mod.ts';

import {
  MongoClient,
} from 'https:/cdn.jsdelivr.net/gh/erfanium/mongo_next/src/index.ts';
import { serve } from 'https:/deno.land/std@0.139.0/http/server.ts';

const conn = new MongoClient("mongodb://localhost:27017/deno_portfolio");

await conn.connect();
const doki = conn.db().collection("vlmusers");

const options = {
  headers: new Headers({
    "content-type": "application/json; charset=utf-8",
  }),
};

async function handler(req: Request): Promise<Response> {
  const result = await doki.find().limit(10).toArray();
  return new Response(JSON.stringify(result), options);
}

serve(handler);

// const {VLM_MONGO_API,VLM_MONGO_APP_ID,VLM_MONGO_ATLAS_PASS,VLM_USER}=config()
// client.connect(`mongodb+srv://${VLM_USER}:${VLM_MONGO_ATLAS_PASS}@vlmportfolio.8sadjb3.mongodb.net/?retryWrites=true&w=majority`);

// console.log("connected")

// const logResults = await fetch(`https://cloud.mongodb.com/api/atlas/v1.0/groups/${VLM_MONGO_APP_ID}/logs?pretty=true`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Basic ${btoa(VLM_MONGO_API)}`
//     },
//   });
//   const logs = await logResults.json();
//   console.log(logs);


