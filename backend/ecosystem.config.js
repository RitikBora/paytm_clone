module.exports = {
    apps: [
      {
        name: 'Paytm backend',
        exec_mode: 'cluster',
        instances: 1, // Or a number of instances
        script: './dist/index.js',
      }
    ]
  }
