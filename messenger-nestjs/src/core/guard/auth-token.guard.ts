import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import {TokenService} from "../../user/service/token.service";
import {Actions} from "../actions/index";

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

        let apiToken = undefined;
        if (request.get) {
            apiToken = request.get(Actions.getAuthTokenHeaderName());
        } else {
            const socket = context.args[0].id;

            if (socket === undefined)
                return false;

            return await this.tokenService.findBySocket(socket) !== undefined;
        }

        if (apiToken === undefined) {
            return false;
        }

        return await this.tokenService.findByToken(apiToken) !== undefined;
    }
}