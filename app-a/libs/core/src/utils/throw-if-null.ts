import { NotFoundException } from '@nestjs/common';

export function throwIfNull<T>(
  value: T | null | undefined,
  message: string,
): T {
  if (value === null || value === undefined) {
    throw new NotFoundException(message);
  }
  return value;
}
