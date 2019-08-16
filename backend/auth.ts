import { Request, Response } from 'express'
import { User, users } from './users'

import * as jwt from 'jsonwebtoken'
import { apiConfig } from './api-config'

export const handleAuthentication  = (request: Request, response: Response) => {
    const user: User = request.body

    if (!isValid(user)) {
        response.status(403).json({message: 'Dados inválidos.'})
        return
    
    }
    const dbUser = users[user.email]
    const token = jwt.sign({sub: dbUser.email, iss: 'meat-api'}, apiConfig.secret)
    response.json({name: dbUser.name, email: dbUser.email, accessToken: token})
}

function isValid(user: User): boolean {
    if (!user) return false

    const dbUser: User = users[user.email]
    return dbUser !== undefined && dbUser.matches(user)   
}