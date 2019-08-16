import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'

import { apiConfig } from './api-config'

export const handleAuthorization = (request: Request, response: Response, next) => {
    const token = extractToken(request)

    if (!token) {
        response.header('WWW-Authenticate', 'Bearer token_type="JWT"')
        response.status(401).json({message: 'Você precisa se autenticar.'})
    } else {
        jwt.verify(token, apiConfig.secret, (error, decoded) => {
            if (decoded) next()
            else response.status(403).json({message: 'Não autorizado.'})
        })
    }
        
}

 function extractToken(request: Request): string {
    let token: string = undefined

    if (request.headers && request.headers.authorization) {
        const parts: Array<string> = request.headers.authorization.split(' ')

        if (parts.length === 2 && parts[0] === 'Bearer') token = parts[1]
    }

    return token
}