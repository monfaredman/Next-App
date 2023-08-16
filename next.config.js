const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "moslemhosseinpour1998",
        mongodb_password: "moslemhosseinpour1998",
        mongodb_clustorname: "cluster1",
      },
    };
  } else {
    return {
      env: {
        mongodb_username: "moslemhosseinpour1998",
        mongodb_password: "moslemhosseinpour1998",
        mongodb_clustorname: "cluster2",
      },
    };
  }
};
