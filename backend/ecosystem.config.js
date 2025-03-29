module.exports = {
  apps: [{
    name: "backend",
    script: "server.js",
    env: {
      NODE_ENV: "production",
      MONGO_URI: "mongodb+srv://noahy78951:w4wKHeNqEENi3T5x@aaa.cfjla.mongodb.net/your-db-name?retryWrites=true&w=majority",
      PORT: 5000, // Match your server.js port
      JWT_SECRET: "15da7aebc45ee5f6da3ac4a7a0309801b639a3ed18b1095dc2073603ec26594667fd574f3db0456e79c20667f55a2caa9e68ef70016330fbedea4a88d6e104f4"
    },
    autorestart: true,
    watch: false,
    instances: 1,
    exec_mode: "fork"
  }]
};