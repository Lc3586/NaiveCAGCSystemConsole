import DateHelper from '@/api/utils/shortcuts/DateHelper';

/**
 * 日期快捷选项帮助类
 *
 * @author LCTR
 * @date 2022-06-29
 */
export default class DateShortcutHelper {
  /**
   * 获取今天的范围值
   */
  static 今天(): Date {
    return DateHelper.getDate(new Date());
  }

  /**
   * 获取明天的范围值
   */
  static 明天(): Date {
    const date = DateHelper.getDate(new Date());
    date.setTime(date.getTime() + 3600 * 1000 * 24);
    return date;
  }
}
