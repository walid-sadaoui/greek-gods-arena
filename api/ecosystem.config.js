module.exports = {
  apps: [
    {
      name: "gga-api",
      cwd: "/var/www/greek-gods-arena/api",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
