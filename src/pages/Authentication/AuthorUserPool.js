import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "ap-south-1_zu42PvPDR",
  ClientId: "4j9k3l64ua4u00fa6rs6ra1mao",
};

export default new CognitoUserPool(poolData);
