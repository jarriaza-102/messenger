import {Injectable, NestMiddleware, MiddlewareFunction, HttpStatus} from '@nestjs/common';
import {HttpException} from "@nestjs/core/exceptions/http-exception";

@Injectable()
export class LoggedUserMiddleware implements NestMiddleware {
    resolve(name: string): MiddlewareFunction {
        return (req, res, next) => {
            next();
        };
    }
}