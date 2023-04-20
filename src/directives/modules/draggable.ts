/*
 * @file: draggable - 拖拽指令
 * @Description: 基于mousedown & mousemove & mouseup事件
 * @Author: Wang
 * @Date: 2023-02-01 13:21:37
 * @LastEditTime: 2023-02-01 13:21:37
 * @LastEditors: Wang
 */

import { isBoolean } from "lodash";
import { Directive, DirectiveBinding } from "vue";

import { freezeCallbackParams } from "@/utils";

/** 拖拽方式 */
export enum DraggbleMode {
  Move = "move",
  Drag = "drag",
}

/** 拖拽指令配置 */
export interface DraggableValue {
  /** 指定拖拽子元素 */
  el?: string;
  /**
   * 指定父元素 默认 html
   * 确保document.querySelector(parentEl) 能获取到指定父元素
   */
  parentEl?: string;
  /** 能否超出指定父元素 默认 false */
  isExceed?: boolean;
  /** 拖拽方式 "move" | "drag" 默认 "move" */
  mode?: EnumToUnion<DraggbleMode>;
  /** 拖拽中class 默认 dragging */
  draggingClassName?: string;
  /** 拖拽开始事件 */
  dragstart?: (e: DragMapValue) => void | Promise<unknown>;
  /** 拖拽变化事件 */
  dragmove?: (e: DragMapValue) => void | Promise<unknown>;
  /** 拖拽结束事件 */
  dragend?: (e: DragMapValue) => void | Promise<unknown>;
}
/** 拖拽指令参数 */
export type DraggableParams = boolean | DraggableValue;

/** 拖拽集合值 */
export interface DragMapValue {
  /** 拖拽元素 */
  dragEl: HTMLElement;
  /** 拖拽配置 */
  dragConfig: DraggableValue;
  /** 指定父元素dom */
  parentDom: HTMLElement;
  /** 鼠标相对拖拽元素位置信息 */
  disPosition: {
    X: number;
    Y: number;
  };
  /** 临时存储指定父元素样式 */
  originDocStyles: CSSStyleDeclaration;
  /** 临时存储当前拖拽元素样式 */
  originElStyles: CSSStyleDeclaration;
  /** 原始属性 */
  originElAttributes: HTMLElement;
}

/** 拖拽事件集成 */
export type DragEventType = MouseEvent | DragEvent | TouchEvent;

/** 拖拽集合 */
const dragMap = new WeakMap<HTMLElement, DragMapValue>();

/** 拖拽过程中临时存储拖拽集合值 */
const tempDragMapValue = ref<DragMapValue>();

/** 处理基础配置项 */
const baseConfigHandler = (
  el: HTMLElement,
  binding: DirectiveBinding<DraggableParams>
) => {
  let dragEl = el;
  const dragConfig: DraggableValue = {
    isExceed: binding.modifiers.exceed,
    mode: "move",
  };
  try {
    Object.assign(dragConfig, binding.value);
    if (dragConfig.el) {
      dragEl = el.querySelector(dragConfig.el) as HTMLElement;
    }

    const dragMapValue = dragMap.get(dragEl);
    if (dragMapValue) {
      const {
        draggable,
        style: { cursor },
      } = dragMapValue.originElAttributes;
      el.draggable = draggable;
      el.style.cursor = cursor;
      el.removeEventListener("mousedown", dragstartHandler);
      el.removeEventListener("touchstart", dragstartHandler);
    }
    if (isBoolean(binding.value) && !binding.value) return Promise.resolve();

    dragMap.set(dragEl, {
      dragEl,
      dragConfig,
      parentDom: document.documentElement,
      disPosition: {
        X: 0,
        Y: 0,
      },
      originDocStyles: {
        /** 鼠标选中 */
        userSelect: "",
      } as CSSStyleDeclaration,

      originElStyles: {
        /** 阴影 */
        boxShadow: "",
      } as CSSStyleDeclaration,

      originElAttributes: {
        draggable: dragEl.draggable,
        style: {
          /** 鼠标样式 */
          cursor: dragEl.style.cursor,
        },
      } as HTMLElement,
    });

    dragEl.draggable = dragConfig.mode === DraggbleMode.Drag;
    dragEl.style.cursor = "move";

    if (dragEl !== el && dragEl.draggable) {
      dragEl.addEventListener("dragstart", dragstartHandler);
    } else {
      dragEl.addEventListener("mousedown", dragstartHandler);
    }
    /** 兼容移动端touch拖拽 */
    dragEl.addEventListener("touchstart", dragstartHandler);

    return Promise.resolve({ dragEl, dragConfig });
  } catch (error) {
    if (!dragEl) console.error("拖拽元素未获取到！");
    else console.error(error);
    return Promise.reject(error);
  }
};

/** 计算元素位置 */
const computePositionHandler = async (targetEvent: DragEventType) => {
  if (!tempDragMapValue.value) return Promise.reject();
  const { dragEl, dragConfig, disPosition, parentDom } = tempDragMapValue.value;
  let clientX = 0;
  let clientY = 0;
  if ((targetEvent as TouchEvent).changedTouches) {
    clientX = (targetEvent as TouchEvent).changedTouches[0].pageX;
    clientY = (targetEvent as TouchEvent).changedTouches[0].pageY;
  } else {
    clientX = (targetEvent as MouseEvent).clientX;
    clientY = (targetEvent as MouseEvent).clientY;
  }
  // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
  let left = clientX - disPosition.X;
  let top = clientY - disPosition.Y;
  // 临界判断
  if (!dragConfig.isExceed) {
    // 拖拽上左边界限制
    if (left < parentDom.offsetLeft) left = parentDom.offsetLeft;
    if (top < parentDom.offsetTop) top = parentDom.offsetTop;
    if (
      parentDom.clientWidth - dragEl.offsetWidth + parentDom.offsetLeft <
      left
    ) {
      left = parentDom.clientWidth - dragEl.offsetWidth + parentDom.offsetLeft;
    }
    if (
      parentDom.clientHeight - dragEl.offsetHeight + parentDom.offsetTop <
      top
    ) {
      top = parentDom.clientHeight - dragEl.offsetHeight + parentDom.offsetTop;
    }
  }

  return Promise.resolve({ left, top });
};

/** 鼠标按下 */
const dragstartHandler = async (targetEvent: DragEventType) => {
  const dragEl = targetEvent.target as HTMLElement;
  const dragMapValue = dragMap.get(dragEl);
  if (!dragMapValue) return;
  tempDragMapValue.value = dragMapValue;
  const {
    dragConfig,
    disPosition,
    parentDom,
    originDocStyles,
    originElStyles,
  } = dragMapValue;

  await freezeCallbackParams(tempDragMapValue.value, dragConfig.dragstart);

  try {
    let clientX = 0;
    let clientY = 0;
    if ((targetEvent as TouchEvent).changedTouches) {
      clientX = (targetEvent as TouchEvent).changedTouches[0].pageX;
      clientY = (targetEvent as TouchEvent).changedTouches[0].pageY;
    } else {
      clientX = (targetEvent as MouseEvent).clientX;
      clientY = (targetEvent as MouseEvent).clientY;
    }
    // 获取拖拽指定父元素
    dragMapValue.parentDom = document.querySelector(
      dragConfig.parentEl || "html"
    ) as HTMLElement;
    // 添加拖拽中className
    dragEl.classList.add(dragConfig.draggingClassName || "dragging");

    const { x, y } = dragEl.getBoundingClientRect();
    // 算出鼠标相对元素的位置
    disPosition.X = clientX - x;
    disPosition.Y = clientY - y;
    const dragEl_W = dragEl.offsetWidth;
    const dragEl_H = dragEl.offsetHeight;
    // 不能超出
    if (!dragConfig.isExceed) {
      if (dragEl_W > parentDom.clientWidth || dragEl_H > parentDom.clientHeight)
        return;
    }
    // 禁止文本选中样式
    originDocStyles.userSelect = document.documentElement.style.userSelect;
    document.documentElement.style.userSelect = "none";

    // 拖拽元素样式
    originElStyles.boxShadow = dragEl.style.boxShadow;
    dragEl.style.boxShadow = "var(--td-shadow-1)";

    dragEl.style.position = "fixed";
    // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
    const left = clientX - disPosition.X;
    const top = clientY - disPosition.Y;
    dragEl.style.left = `${left}px`;
    dragEl.style.top = `${top}px`;

    // 移动过程实时更新位置
    if (dragConfig.mode === DraggbleMode.Move) {
      document.addEventListener("mousemove", dragmoveHandler);
      /** 兼容移动端touch拖拽 */
      document.addEventListener("touchmove", dragmoveHandler);
    } else {
      // 移动结束才更新位置
      dragEl.addEventListener("dragend", mouseupHandler);
    }
    document.addEventListener("mouseup", mouseupHandler);
    /** 兼容移动端touch拖拽 */
    document.addEventListener("touchend", mouseupHandler);
    document.addEventListener("touchcancel", mouseupHandler);
  } catch (error) {
    if (!parentDom) console.error("指定父元素未获取到！");
    else console.error(error);
  }
};

/** 鼠标移动 */
const dragmoveHandler = async (targetEvent: DragEventType) => {
  if (!tempDragMapValue.value) return;
  const { dragEl, dragConfig } = tempDragMapValue.value;

  await freezeCallbackParams(tempDragMapValue.value, dragConfig.dragmove);

  const { left, top } = await computePositionHandler(targetEvent);

  dragEl.style.left = `${left}px`;
  dragEl.style.top = `${top}px`;
};

/** 鼠标抬起 */
const mouseupHandler = async (targetEvent: DragEventType) => {
  if (!tempDragMapValue.value) return;
  const { dragEl, dragConfig, originDocStyles, originElStyles } =
    tempDragMapValue.value;
  await freezeCallbackParams(tempDragMapValue.value, dragConfig.dragend);

  /** 移动结束更新位置 */
  if (dragConfig.mode === DraggbleMode.Drag) {
    const { left, top } = await computePositionHandler(targetEvent);
    dragEl.style.left = `${left}px`;
    dragEl.style.top = `${top}px`;
  }

  // 还原当前根节点样式
  for (const key in originDocStyles) {
    document.documentElement.style[key] = originDocStyles[key];
    delete originDocStyles[key];
  }
  // 还原当前元素样式
  for (const key in originElStyles) {
    dragEl.style[key] = originElStyles[key];
    delete originElStyles[key];
  }
  // 清除拖拽中class
  dragEl.classList.remove(dragConfig.draggingClassName || "dragging");

  // 无需判断 - 拖拽监听事件全部清除
  document.removeEventListener("mousemove", dragmoveHandler);
  document.removeEventListener("mouseup", mouseupHandler);
  document.removeEventListener("dragend", mouseupHandler);

  document.removeEventListener("touchmove", dragmoveHandler);
  document.removeEventListener("touchend", mouseupHandler);
  document.removeEventListener("touchcancel", mouseupHandler);

  tempDragMapValue.value = undefined;
};

const draggable: Directive<HTMLElement, DraggableParams> = {
  // 在元素被插入到 DOM 前调用
  async beforeMount(el, binding) {
    await baseConfigHandler(el, binding);
  },
  async updated(el, binding) {
    await baseConfigHandler(el, binding);
  },
};

export default draggable;
