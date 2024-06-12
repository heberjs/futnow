import { validate, errors } from 'com'

import { UserType, User, UserRole } from '../data/index.ts'

const { SystemError, DuplicityError } = errors

function registerManager(fullname: string, email: string, password: string): Promise<void> {
    validate.text(fullname, 'fullname')
    validate.email(email)
    validate.password(password)

    return User.findOne({ email })
        .catch(error => { throw new SystemError(error.message) })
        .then((user: UserType) => {
            if (user) throw new DuplicityError('user already exists')

            user = {
                fullname: fullname.trim(),
                email: email,
                password: password,
                role: UserRole.Manager,
                status: 1
            }

            return User.create(user)
                .catch(error => { throw new SystemError(error.message) })
                .then(user => { })
        })

}

export default registerManager