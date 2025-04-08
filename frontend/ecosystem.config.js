module.exports = {
    apps: [
      {
        name: 'frontend',
        script: 'prod-server.js',
        cwd: '/home/ubuntu/aa-granite/frontend',
        instances: 1,
        exec_mode: 'fork',
        env: {
          NODE_ENV: 'production',
          PORT: 3000,
          NEXT_PUBLIC_BACKEND_URL: 'http://44.206.111.90:5000'
        },
        error_file: '/home/ubuntu/logs/aa-granite-frontend-error.log',
        out_file: '/home/ubuntu/logs/aa-granite-frontend-out.log',
        combine_logs: true,
        time: true,
        node_args: ' --enable-source-maps'
      }
    ]
  };