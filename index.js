const exec = require('child_process').exec;

exports.handler = function(event, context, callback) {
  data = JSON.stringify(event);

  const child = exec("./app '" +  data + "'", (error) => {
    // Resolve with result of process
    context.done(error, "Process completed");
  });

  // Log process stdout and stderr
  child.stdout.on('data', console.log);
  child.stderr.on('data', console.error);
}
