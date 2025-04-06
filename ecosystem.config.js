module.exports = {
  apps: [
    {
      name: 'GitStarStruck', // Next.js frontend
      cwd: './', // Change directory to the client folder
      script: process.platform === 'win32' ? 'cmd' : 'pnpm',
      args: process.platform === 'win32' ? '/c pnpm start' : 'start',
      env_file: './.env',
      out_file: './logs/next-out.log',
      error_file: './logs/next-error.log',
      log_file: './logs/next-combined.log',
      merge_logs: true,
      watch: false,
      autorestart: true,
      max_memory_restart: '2G',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
