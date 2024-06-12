import { util } from 'com'


function getLoggedInfo() {

    const { sub: userId, role } = util.extractJwtPayload(sessionStorage.token)

    return { userId, role }
}

export default getLoggedInfo