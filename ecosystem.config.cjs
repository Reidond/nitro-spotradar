module.exports = {
	apps: [
		{
			name: 'ssr2',
			port: '3000',
			exec_mode: 'cluster',
			instances: 'max',
			script: './.output/server/index.mjs',
			watch: 'false',
			max_memory_restart: '475M',
			env_production: {
				NODE_ENV: 'production',
				CI_ENV: 'production',
			},
			env_development: {
				NODE_ENV: 'development',
				CI_ENV: 'development',
			},
		},
	],
};
