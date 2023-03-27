import DateHelper from '@/api/utils/shortcuts/DateHelper';

/**
 * 日期范围快捷选项帮助类
 *
 * @author LCTR
 * @date 2022-06-29
 */
export default class DateRangShortcutHelper {
  /**
   * 获取后天的范围值
   */
  static 后天(): Date[] {
    const end = DateHelper.getDate(new Date());
    end.setTime(end.getTime() + 3600 * 1000 * 24 * 3);
    const start = DateHelper.getDate(new Date());
    start.setTime(start.getTime() + 3600 * 1000 * 24 * 2);
    return [start, end];
  }

  /**
   * 获取明天的范围值
   */
  static 明天(): Date[] {
    const end = DateHelper.getDate(new Date());
    end.setTime(end.getTime() + 3600 * 1000 * 24 * 2);
    const start = DateHelper.getDate(new Date());
    start.setTime(start.getTime() + 3600 * 1000 * 24);
    return [start, end];
  }

  /**
   * 获取今天的范围值
   */
  static 今天(): Date[] {
    const end = DateHelper.getDate(new Date());
    end.setTime(end.getTime() + 3600 * 1000 * 24);
    const start = DateHelper.getDate(new Date());
    return [start, end];
  }

  /**
   * 获取昨天的范围值
   */
  static 昨天(): Date[] {
    const end = DateHelper.getDate(new Date());
    const start = DateHelper.getDate(new Date());
    start.setTime(start.getTime() - 3600 * 1000 * 24);
    return [start, end];
  }

  /**
   * 获取最近三天的范围值
   */
  static 最近三天(): Date[] {
    const end = DateHelper.getDate(new Date());
    const start = DateHelper.getDate(new Date());
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
    return [start, end];
  }

  /**
   * 获取最近一周的范围值
   */
  static 最近一周(): Date[] {
    const end = DateHelper.getDate(new Date());
    const start = DateHelper.getDate(new Date());
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
    return [start, end];
  }

  /**
   * 获取最近一个月的范围值
   */
  static 最近一个月(): Date[] {
    const end = DateHelper.getDate(new Date());
    const start = DateHelper.getDate(new Date());
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
    return [start, end];
  }

  /**
   * 获取最近三个月的范围值
   */
  static 最近三个月(): Date[] {
    const end = DateHelper.getDate(new Date());
    const start = DateHelper.getDate(new Date());
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
    return [start, end];
  }
}
