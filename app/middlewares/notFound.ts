import { RouteController } from '../lib/types/general';

class HttpError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }
}

export const notFound: RouteController = (req, res, next) => {
  const error = new HttpError('Not Found', 404);
  next(error);
};
