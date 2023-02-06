import {
  vlmdeleteGist,
  vlmfetch,
  vlmfetchs,
  vlminsert,
  vlmupdateGist,
} from './mongo.ts';

// deno-lint-ignore-file
// Defining schema interface
interface vlmgist {
    _id: string;
    user: string;
    email:string;
    password:string;
    created_at:string;
  }
export async function vlmcreategist(user:string,email:string,password:string):Promise<vlmgist> {
    const vlmdate = new Date();
    const day = vlmdate.getDate();
    const month = vlmdate.getMonth();
    const year = vlmdate.getFullYear();
    const hour = vlmdate.getHours();
    const minute = vlmdate.getMinutes();
    const vlmtime = "VlmDate :) => " + day + "/" + month + "/" + year +
  "   VlmTIME :) => " + hour + ":" + minute;
    const values={
        user,
        email,
        password,
        created_at:vlmtime
    };
    // vlmusers.push(values)
   const _id= await vlminsert(values);

    return {
        _id,
        ...values
    }
}

export async  function vlmgetgist(skip:number,limit:number):Promise<vlmgist[]>{
    return await vlmfetch(skip, limit);
}

export async function vlmgetgistid(id:string):Promise<vlmgist[]>{
    return await vlmfetchs(id);
}


export function vlmremoveGist(id: string): Promise<number> {
    return vlmdeleteGist(id);
}
  
  export function vlmpatchGist(id: string, content: string): Promise<{ modifiedCount: number }> {
    return vlmupdateGist({ id, content });
  }
  