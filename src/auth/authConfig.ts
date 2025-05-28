const cognitoAuthConfig = {
  authority: import.meta.env.VITE_COGNITO_AUTHORITY,
  client_id: import.meta.env.VITE_COGNITO_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_COGNITO_REDIRECT_URI,
  response_type: "code",
  scope: "email openid",
  loadUserInfo: true,
};

Object.entries(cognitoAuthConfig).forEach(([key, value]) => {
  if (!value) throw new Error(`Missing env: ${key}`);
});

export default cognitoAuthConfig;