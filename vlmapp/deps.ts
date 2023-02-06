import 'https:/deno.land/x/dotenv@v3.2.0/load.ts';

import axios from 'npm:axios@^1.2.1';
import inquirer from 'npm:inquirer@^9.1.4';
import methodOverride from 'npm:method-override@^3.0.0';
import otpGenerator from 'npm:otp-generator@^4.0.0';
import slugify from 'npm:slugify@^1.6.5';

export { Bot } from 'https:/deno.land/x/telegram@v0.1.1/mod.ts';

export {
  blue,
  bold,
  cyan,
  green,
  magenta,
  red,
  white,
} from 'https:/deno.land/std@0.175.0/fmt/colors.ts';
export { renderFileToString } from 'https:/deno.land/x/dejs@0.10.3/mod.ts';
export { Application } from 'https:/deno.land/x/oak@v7.7.0/application.ts';
export { Router } from 'https:/deno.land/x/oak@v7.7.0/router.ts';
export { getQuery } from 'https:/deno.land/x/oak@v7.7.0/helpers.ts';
export type { RouterContext } from 'https:/deno.land/x/oak@v7.7.0/router.ts';
export { oakCors } from 'https:/deno.land/x/cors@v1.2.2/mod.ts';
export {
  Bson,
  Collection,
  MongoClient,
} from 'https:/deno.land/x/mongo@v0.31.1/mod.ts';
export { SmtpClient } from 'https:/deno.land/x/smtp@v0.7.0/mod.ts';
export {
  create,
  decode,
  getNumericDate,
  validate,
  verify,
} from 'https:/deno.land/x/djwt@v2.8/mod.ts';

export type { Payload } from 'https:/deno.land/x/djwt@v2.3/mod.ts';
export const vlmslug=slugify;
export const vlmoverride=methodOverride;
export const vlmopt=otpGenerator
export const vlmaxios=axios;
export const vlminquire=inquirer;

export { dirname, join } from 'https:/deno.land/std@0.175.0/path/mod.ts';
export {
  compareSync,
  genSaltSync,
  hash,
  hashSync,
} from 'https:/deno.land/x/bcrypt@v0.4.1/mod.ts';
