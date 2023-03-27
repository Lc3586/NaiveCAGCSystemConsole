import { AuthMethod } from '../utils/response/AuthMethod';

/**
 * 身份验证信息
 *
 * @author LCTR
 * @date 2023-03-09
 */
export default interface AuthenticationInfo {
  /**
   * 用户标识
   */
  key: string;

  /**
   * 用户类型
   */
  userType: string;

  /**
   * 角色类型
   */
  roleTypes: string[];

  /**
   * 角色名称
   */
  roleNames: string[];

  /**
   * 账号/用户名
   */
  account: string;

  /**
   * 昵称
   */
  nickname: string;

  /**
   * 性别
   */
  sex: string;

  /**
   * 头像
   */
  face: string;

  /**
   * 姓名
   */
  name: string;

  /**
   * 身份验证时间
   */
  authTime: Date;

  /**
   * 身份验证方法
   */
  authMethod: AuthMethod;

  /**
   * 过期时间
   */
  expireTime: Date;

  /**
   * 主机地址
   */
  ip: string;

  /**
   * 定位地址
   */
  location: string;
}
