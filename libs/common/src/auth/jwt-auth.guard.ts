import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Observable, tap, map, catchError, of } from 'rxjs';
import { AUTH_SERVICE } from '../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { UserDto } from '../dtos';
import { MP_AUTHENTICATE } from '../constants';
import { Reflector } from '@nestjs/core';
@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);
  constructor(
    @Inject(AUTH_SERVICE) private readonly authClient: ClientProxy,
    private readonly reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): Promise<boolean> | Observable<boolean> | boolean {
    const jwt =
      context.switchToHttp().getRequest().cookies?.Authentication ||
      context.switchToHttp().getRequest().headers?.authorization;
    if (!jwt) return false;

    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    return this.authClient
      .send<UserDto>(MP_AUTHENTICATE, {
        Authentication: jwt,
      })
      .pipe(
        tap((res) => {
          if (roles) {
            const hasRole = roles.some((role) => res.roles.includes(role));
            if (!hasRole) {
              this.logger.error("The user doesn't have the right role");
              throw new ForbiddenException(
                "The user doesn't have the right role",
              );
            }
          }
          context.switchToHttp().getRequest().user = res;
        }),
        map(() => true),
        catchError((err) => {
          this.logger.error(err.message);
          return of(false);
        }),
      );
  }
}
