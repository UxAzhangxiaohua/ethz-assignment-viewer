module.exports = {
    apps: [
      {
        name: 'assignmentviewer',
        port: '3000',
        exec_mode: 'cluster',
        instances: 2,
        args: "start",
        script: './.output/server/index.mjs'
      }
    ]
  }
  