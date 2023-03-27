/**
 * 日期帮助类
 *
 * @author LCTR
 * @date 2022-06-29
 */
export default class DateHelper {
  /**
   * 获取日期部分
   * @param date
   */
  static getDate(date: Date): Date {
    return new Date(
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    );
  }
}
