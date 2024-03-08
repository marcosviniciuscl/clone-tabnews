import database from "infra/database.js";

async function status(resquest, response) {
  const updateAt = new Date().toISOString();
  const resultQuery = await database.query("SHOW max_connections;");
  const resultQueryConnections = await database.query(
    "SELECT COUNT(*) AS connections_count FROM pg_stat_activity;",
  );
  const resultQueryVersion = await database.query("SELECT version();");

  console.log(resultQuery.rows);
  console.log(resultQueryConnections.rows);
  response.status(200).json({
    update_at: updateAt,
    max_connections: resultQuery.rows[0].max_connections,
    connections_count: resultQueryConnections.rows[0].connections_count,
    version: resultQueryVersion.rows[0].version,
  });
}

export default status;
