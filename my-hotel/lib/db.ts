/*
import mysql from 'mysql2/promise';

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT
} = process.env;

if (!DB_HOST || !DB_USER || !DB_NAME) {
  throw new Error('Missing DB env vars');
}

// reuse pool during dev to avoid too many connections (HMR)
declare global {
  // eslint-disable-next-line no-var
  var __mysql_pool__: mysql.Pool | undefined;
}
const pool: mysql.Pool = global.__mysql_pool__ ?? mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT ? Number(DB_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

if (process.env.NODE_ENV !== 'production') global.__mysql_pool__ = pool;

export async function query<T = any>(sql: string, params?: any[]) {
  const [rows] = await pool.execute<T & mysql.RowDataPacket[]>(sql, params ?? []);
  return rows as unknown as T;
}
*/
import mysql from 'mysql2/promise';

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  DATABASE_URL,
} = process.env;

// Validate required environment variables
if (!DATABASE_URL && (!DB_HOST || !DB_USER || !DB_NAME)) {
  throw new Error(
    'Missing database configuration. Please provide either DATABASE_URL or DB_HOST, DB_USER, and DB_NAME'
  );
}

// Reuse pool during dev to avoid too many connections (HMR)
declare global {
  // eslint-disable-next-line no-var
  var __mysql_pool__: mysql.Pool | undefined;
}

// Create connection pool for TiDB Cloud
const createPool = (): mysql.Pool => {
  // If DATABASE_URL is provided (recommended for TiDB Cloud)
  if (DATABASE_URL) {
    console.log('✅ Using DATABASE_URL for TiDB Cloud connection');
    return mysql.createPool({
      uri: DATABASE_URL,
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10,
      idleTimeout: 60000,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
      // TiDB Cloud requires SSL
      ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true,
      },
    });
  }

  // Otherwise use individual credentials for TiDB Cloud
  return mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT ? Number(DB_PORT) : 4000, // TiDB default port is 4000
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    // TiDB Cloud requires SSL
    ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true,
    },
  });
};

const pool: mysql.Pool = global.__mysql_pool__ ?? createPool();

if (process.env.NODE_ENV !== 'production') {
  global.__mysql_pool__ = pool;
}

// Test connection function
export async function testConnection(): Promise<boolean> {
  try {
    const connection = await pool.getConnection();
    console.log('✅ TiDB Cloud connection successful');
    
    // Test a simple query
    const [rows] = await connection.execute('SELECT 1 as test');
    console.log('✅ Test query successful:', rows);
    
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ TiDB Cloud connection failed:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    return false;
  }
}

// Main query function with error handling
export async function query<T = any>(
  sql: string,
  params?: any[]
): Promise<T> {
  try {
    const [rows] = await pool.execute<T & mysql.RowDataPacket[]>(
      sql,
      params ?? []
    );
    return rows as unknown as T;
  } catch (error) {
    console.error('❌ Database query error:', error);
    console.error('SQL:', sql);
    console.error('Params:', params);
    throw error;
  }
}

// Execute function for INSERT, UPDATE, DELETE operations
export async function execute(
  sql: string,
  params?: any[]
): Promise<mysql.ResultSetHeader> {
  try {
    const [result] = await pool.execute<mysql.ResultSetHeader>(
      sql,
      params ?? []
    );
    return result;
  } catch (error) {
    console.error('❌ Database execute error:', error);
    console.error('SQL:', sql);
    console.error('Params:', params);
    throw error;
  }
}

// Transaction helper
export async function transaction<T>(
  callback: (connection: mysql.PoolConnection) => Promise<T>
): Promise<T> {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    console.error('❌ Transaction error:', error);
    throw error;
  } finally {
    connection.release();
  }
}

// Graceful shutdown
export async function closePool(): Promise<void> {
  try {
    await pool.end();
    console.log('✅ Database pool closed');
  } catch (error) {
    console.error('❌ Error closing database pool:', error);
  }
}

// Export pool for advanced usage
export { pool };
