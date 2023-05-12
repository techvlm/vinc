// deno-lint-ignore-file
export async function vlmgetToken(headers:Headers){
    const ath=headers.get("Authorization");
    if (!ath) {
        return null;
    }
    const [method,token] =ath.split(" ");
    if (method !=="Bearer") {
        return null;
    }
    if (!token) {
        return null;
    }
    return token;
}