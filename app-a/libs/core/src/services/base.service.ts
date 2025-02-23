import { GeorgeLogger } from '../logger/george.logger';

export class BaseService {
  private readonly _logger: GeorgeLogger;

  constructor() {
    this._logger = new GeorgeLogger(this.constructor.name);
  }

  protected get logger(): GeorgeLogger {
    return this._logger;
  }
}
