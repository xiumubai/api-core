/*
 * @Author: 朽木白
 * @Date: 2022-06-17 21:32:53
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-06-17 21:32:56
 * @Description:虚拟dom转换成真实dom
 */

const obj = {
  tag: 'DIV',
  attrs: {
    id: 'app',
  },
  children: [
    {
      tag: 'SPAN',
      children: [{ tag: 'A', children: [] }],
    },
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] },
        { tag: 'A', children: [] },
      ],
    },
  ],
};

function render(obj) {
  // 创建一个DOM元素
  const dom = document.createElement(obj.tag);
  // 给其添加属性
  obj.attrs &&
    Object.entries(obj.attrs).forEach((item) => {
      const [key, value] = item;
      dom.setAttribute(key, value);
    });
  // 若有子节点，遍历生成子节点，并插入到该dom中
  obj.children.forEach((child) => {
    dom.appendChild(render(child));
  });
  return dom;
}
