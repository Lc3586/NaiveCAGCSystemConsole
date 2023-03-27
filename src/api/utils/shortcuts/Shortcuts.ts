import DateRangShortcut from '@/api/utils/shortcuts/DateRangShortcut';
import DateShortcut from '@/api/utils/shortcuts/DateShortcut';
import DateRangShortcutHelper from '@/api/utils/shortcuts/DateRangShortcutHelper';
import DateShortcutHelper from '@/api/utils/shortcuts/DateShortcutHelper';

/**
 * 快速选择数据
 *
 * @author LCTR
 * @date 2022-06-29
 */
export default class Shortcuts {
  /**
   * 日期快速选择数据
   */
  static data: DateShortcut[] = [
    {
      text: '今天',
      value: DateShortcutHelper.今天(),
    },
    {
      text: '明天',
      value: DateShortcutHelper.明天(),
    },
  ];

  /**
   * 日期范围快速选择数据
   */
  static dateRang: DateRangShortcut[] = [
    {
      text: '后天',
      value: DateRangShortcutHelper.后天(),
    },
    {
      text: '明天',
      value: DateRangShortcutHelper.明天(),
    },
    {
      text: '今天',
      value: DateRangShortcutHelper.今天(),
    },
    {
      text: '昨天',
      value: DateRangShortcutHelper.昨天(),
    },
    {
      text: '最近三天',
      value: DateRangShortcutHelper.最近三天(),
    },
    {
      text: '最近一周',
      value: DateRangShortcutHelper.最近一周(),
    },
    {
      text: '最近一个月',
      value: DateRangShortcutHelper.最近一个月(),
    },
    {
      text: '最近三个月',
      value: DateRangShortcutHelper.最近三个月(),
    },
  ];
}
