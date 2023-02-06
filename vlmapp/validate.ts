import { RouterContext } from './deps.ts';

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
class vlmAdminset {
    async checkAdmin(ctx: RouterContext, ) {
      if (!ctx.request.headers.get("vlmAdmin")) {
        ctx.response.status = 401;
        ctx.response.body = "Not authorized";
        return;
      }
      const adminRole = "vlmAdmin";
      const authorization = ctx.request.headers.get("vlmAdmin")!;
      const role = authorization.split(" ")[1];
      if (role !== adminRole) {
        ctx.response.status = 401;
        ctx.response.body = "Not authorized";
        return;
      }
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
    // Regular expression for email validation
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(email).toLowerCase());
  }

  validateUsername(username:string) {
    // Instagram usernames must be at least 4 characters long and can only contain letters, numbers, and underscores
    const usernameRegex = /^[a-zA-Z0-9_]{4,}$/;
    return usernameRegex.test(username);
  }

  validatePassword(password:string) {
    // Example password validation: at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    // return passwordRegex.test(password);
    const news=/^.{8,}$/;
    return news.test(password)
  }
}