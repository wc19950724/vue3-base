export const mockLogin = async (
  userInfo: LoginInfo
): Promise<ApiReturn<UserInfo>> => ({
  code: 200,
  message: "登录成功",
  data: {
    token: "mock token",
    userName: userInfo.userName,
  },
});
