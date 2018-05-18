import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import {TokenService} from "../../user/service/token.service";

@Injectable()
export class AuthTokenGuard implements CanActivate {

    constructor(private tokenService: TokenService){}

    async canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        if (request.originalUrl === '/users/login') {
            return true;
        }
        const apiToken = request.get('api-token');
        if (apiToken === undefined) {
            return false;
        }
        const token = await this.tokenService.findByToken(apiToken);
        if (token === undefined) {
            return false;
        }
        return true;
    }
}