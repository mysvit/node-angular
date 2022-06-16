import { CorsOptions } from 'cors'

const allowedOrigins = [
  'http://localhost:3000',
  'https://yourapp.com'
];

type StaticOrigin = boolean | string | RegExp | (boolean | string | RegExp)[];

export const corsOptions: CorsOptions = {
  origin: (requestOrigin: string | undefined, callback: (err: Error | null, origin?: StaticOrigin) => void) => {
    // allow requests with no origin like mobile apps or curl requests
    if (!requestOrigin) return callback(null, true);
    if (allowedOrigins.indexOf(requestOrigin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.'
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  credentials: true,
}
