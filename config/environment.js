const development = {
  name: "development",
  db: "common",
};

const production = {
  name: "production",
  db: process.env.DB,
};

// module.exports =
//   eval(process.env.TASK_ENVIRONMENT) == undefined
//     ? development
//     : eval(process.env.TASK_ENVIRONMENT);
module.exports = development;
