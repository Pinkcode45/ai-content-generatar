/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.tsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://NeonDB_owner:T45iWbUSwMNs@ep-twilight-waterfall-a5o5fzyr.us-east-2.aws.neon.tech/AI-Content-Generator?sslmode=require',
    }
  };