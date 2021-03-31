import { Connection, createConnection, getConnectionOptions,  } from "typeorm";

export default async(): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: "12.0.0.3"
    })
  )
}