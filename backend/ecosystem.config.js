module.exports = {
  apps: [{
    name: "backend",
    script: "server.js",
    env: {
      NODE_ENV: "production",
      MONGO_URI: "mongodb+srv://noahy78951:w4wKHeNqEENi3T5x@aaa.cfjla.mongodb.net/your-db-name?retryWrites=true&w=majority",
      PORT: 5000 // Match your server.js port
    },
    autorestart: true,
    watch: false,
    instances: 1,
    exec_mode: "fork"
  }]
};