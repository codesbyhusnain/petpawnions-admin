import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "ap-south-1_laNRncKhd",
  ClientId: "hd1ls0cm7qr9r6vaimtnvv4l0",
};

export default new CognitoUserPool(poolData);
