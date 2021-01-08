const authConfig = {
  jwt: {
    secret: process.env.TOKEN_SECRET,
    expiresIn: process.env.TOKEN_EXPIRATION,
  },
};

export default authConfig;
