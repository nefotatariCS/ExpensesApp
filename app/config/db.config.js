module.exports = {
  HOST: "clhtb6lu92mj2.cluster-czz5s0kz4scl.eu-west-1.rds.amazonaws.com",
  USER: "uciaj6hg079haf",
  PASSWORD: "pb0a2daafddc5f5190e2938dbe015b45c432b6b5f7ede431497b8c05060e67a07",
  DB: "dbna93utrlpmlk",
  PORT: 5432,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
