import { Logger } from '@nestjs/common';

export function WithLogger(contextName?: string): ClassDecorator {
  return (target) => {
    const loggerContext = contextName ?? target.name ?? ""; // Use the provided context name or default to the class name.
    const logger = new Logger(loggerContext);

    // Attach the logger instance to the class prototype.
    Object.defineProperty(target.prototype, 'logger', {
      value: logger,
      writable: false, // Prevent reassignment.
      enumerable: false, // Hide it during iteration.
      configurable: false,
    });
  };
}
