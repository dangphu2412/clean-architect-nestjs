import { NotFoundException } from '@nestjs/common';
import { createUserClientCode } from './create-user-client.code';

export class NotFoundUserException extends NotFoundException {
  constructor(message = '') {
    super(
      createUserClientCode({
        errorCode: 'NOT_FOUND',
        message: 'No user(s) found ' + message,
      }),
    );
  }
}
