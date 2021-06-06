module.exports = (message) => {
  console.log(`FATAL: ${message}`);
  process.exit(1);
};
