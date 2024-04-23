import { config } from 'dotenv';
import { Pool, types } from 'pg';

config();

types.setTypeParser(1114, function (stringValue: string) {
  return stringValue;
});

const isProduction: boolean = process.env.NODE_ENV === 'production';
const typeConnection: string | undefined = process.env.DB_TYPE_CONNECT;

let pool: Pool | null = null;

const env: string = isProduction ? 'PRODUCTION' : '';
const getEnv = (key: string): string => process.env[`${key}_${env}`] || process.env[key] || '';

const connectionString: string = `postgresql://${getEnv('DB_USER')}:${getEnv('DB_PASSWORD')}@${getEnv('DB_HOST')}:${getEnv('DB_PORT')}/${getEnv('DB_DATABASE')}`;

if (typeConnection === 'url') {
  pool = new Pool({
    connectionString,
    ssl: getEnv('DB_SSL') === 'true',
    connectionTimeoutMillis: 15000,
    idleTimeoutMillis: 30000,
  });
} else if (typeConnection === 'connector') {
  pool = new Pool({
    user: getEnv('DB_USER'),
    host: getEnv('DB_HOST'),
    database: getEnv('DB_DATABASE'),
    password: getEnv('DB_PASSWORD'),
    port: parseInt(getEnv('DB_PORT')),
    ssl: getEnv('DB_SSL') === 'true',
    connectionTimeoutMillis: 15000,
    idleTimeoutMillis: 30000,
  });
}

pool?.connect(function (err: Error | undefined) {
  if (err) throw err;
});

export default pool;
