import logic from '../../logic/index.ts'
import { errors } from 'com'
import logger from '../../logger.ts'
import jwt from 'jsonwebtoken'

const { TokenExpiredError } = jwt

const {
    ContentError,
    SystemError,
    NotFoundError,
    TypeError,
    UnauthorizedError,
    AuthError

} = errors



//edit match

export default (req, res) => {
    try {
        const { authorization } = req.headers

        const token = authorization.slice(7)

        const { JWT_SECRET } = process.env

        const { sub: userId } = jwt.verify(token, JWT_SECRET)

        const { matchId } = req.params

        const { title, description, date } = req.body

        logic.editMatch(userId as string, matchId as string, title, description, date)
            .then(() => res.status(200).send())
            .catch(error => {
                if (error instanceof SystemError) {
                    logger.error(error.message)

                    res.status(500).json({ error: error.constructor.name, message: error.message })
                } else if (error instanceof NotFoundError) {
                    logger.warn(error.message)

                    res.status(404).json({ error: error.constructor.name, message: error.message })
                } else if (error instanceof AuthError) {
                    logger.warn(error.message)

                    res.status(401).json({ error: error.constructor.name, message: error.message })
                }
            })

    } catch (error) {
        if (error instanceof TypeError || error instanceof ContentError) {
            logger.warn(error.message)

            res.status(406).json({ error: error.constructor.name, message: error.message })
        } else if (error instanceof TokenExpiredError) {
            logger.warn(error.message)

            res.status(498).json({ error: UnauthorizedError.name, message: 'session expired' })
        } else {
            logger.warn(error.message)

            res.status(500).json({ error: SystemError.name, message: error.message })
        }
    }
}