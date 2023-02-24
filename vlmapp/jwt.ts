export async function vlmgetToken(headers:Headers){
    const ath=headers.get("Authorization");
    if (!ath) {
        return null;
    }
    const [method,token] =ath.split(" ");
    if (method !=="Bearor") {
        return null;
    }
    if (!token) {
        return null;
    }
    return token;
}