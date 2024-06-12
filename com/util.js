function extractJwtPayload(token) {
    const [, payloadB64] = token.split('.');
    const payLoadJSON = atob(payloadB64);
    const payload = JSON.parse(payLoadJSON);
    return payload;
}
const util = {
    extractJwtPayload,
};
export default util;
