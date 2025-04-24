import ms, { StringValue } from "ms";

interface TokenEnvs {
  tokenSecretKey: string;
  refreshTokenSecretKey: string;
  tokenExprationTime: StringValue;
  refreshTokenExprationTime: StringValue;
}

export const getTokenEnvs = (): TokenEnvs => {
  const tokenSecretKey = process.env.TOKEN_SECRET_KEY;
  if (tokenSecretKey === undefined) {
    throw new Error("Token secret key not found");
  }

  const refreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET_KEY;
  if (refreshTokenSecretKey === undefined) {
    throw new Error("Refresh token secret key not found");
  }

  const tokenExprationTimeString = process.env.TOKEN_EXPIRATION_TIME;
  if (tokenExprationTimeString === undefined) {
    throw new Error("Token expiration time not found");
  }
  const tokenExprationTime = tokenExprationTimeString as StringValue;
  try {
    ms(tokenExprationTime);
  } catch {
    throw new Error("Token expiration time is not ms format");
  }

  const refreshTokenExprationTimeString =
    process.env.REFRESH_TOKEN_EXPIRATION_TIME;
  if (refreshTokenExprationTimeString === undefined) {
    throw new Error("Refresh token expiration time not found");
  }
  const refreshTokenExprationTime =
    refreshTokenExprationTimeString as StringValue;
  try {
    ms(refreshTokenExprationTime);
  } catch {
    throw new Error("Refresh token expiration time is not ms format");
  }

  return {
    tokenSecretKey,
    refreshTokenSecretKey,
    tokenExprationTime,
    refreshTokenExprationTime,
  };
};
