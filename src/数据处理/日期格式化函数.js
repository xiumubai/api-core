/*
 * @Author: 朽木白
 * @Date: 2022-06-15 16:33:03
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-06-15 16:33:14
 * @Description:
 */
const dateFormat = (dateInput, format) => {
  var day = dateInput.getDate();
  var month = dateInput.getMonth() + 1;
  var year = dateInput.getFullYear();
  format = format.replace(/yyyy/, year);
  format = format.replace(/MM/, month);
  format = format.replace(/dd/, day);
  return format;
};
dateFormat(new Date('2020-12-01'), 'yyyy/MM/dd'); // 2020/12/01
dateFormat(new Date('2020-04-01'), 'yyyy/MM/dd'); // 2020/04/01
dateFormat(new Date('2020-04-01'), 'yyyy年MM月dd日'); // 2020年04月01日
