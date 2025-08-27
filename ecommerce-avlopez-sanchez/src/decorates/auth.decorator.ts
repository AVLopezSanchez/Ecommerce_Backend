import { applyDecorators, UseGuards } from '@nestjs/common';
import { Auth0Guard } from '../auth/Guards/auth0.guard';

export function RequiresAuth() {
  return applyDecorators(UseGuards(Auth0Guard));
}
