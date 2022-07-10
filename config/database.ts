/**
 * Config source: https://git.io/JesV9
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Env from '@ioc:Adonis/Core/Env'
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'

const postgresConfig: any = {
	host: Env.get('PG_HOST'),
	port: Env.get('PG_PORT'),
	user: Env.get('PG_USER'),
	password: Env.get('PG_PASSWORD', ''),
	database: Env.get('PG_DB_NAME'),
}

const postgresConfigWithSSL: any = {
	...postgresConfig,
	ssl: {
		rejectUnauthorized: false,
	},
}

console.log({ VARIABLE: Env.get('DB_SSL') })

console.log(Env.get('DB_SSL') === 'true')
const connections = Env.get('DB_SSL') === 'true'
	? postgresConfigWithSSL
	: postgresConfig

console.log({ connections })

const databaseConfig: DatabaseConfig = {
	connection: Env.get('DB_CONNECTION'),
	connections: {
		pg: {
			client: 'pg',
			connection: connections,
			migrations: {
				naturalSort: true,
			},
			healthCheck: false,
			debug: false,
		},
	},
}

export default databaseConfig
