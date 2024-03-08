import database from "infra/database.js";

async function status(resquest, response) {
  const updateAt = new Date().toISOString();

  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult.rows[0].max_connections;

  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT COUNT(*)::int AS opened_connections FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName]
  });
  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult.rows[0].opened_connections;

  const resultQueryVersion = response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        max_connections: parseInt(databaseMaxConnectionsValue),
        opened_connections: databaseOpenedConnectionsValue,
        version: databaseVersionValue,
      },
    },
  });
}

export default status;
