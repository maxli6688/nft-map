import React, { FC, useEffect, useState, useRef, CSSProperties } from "react";

type AffixProps = {
  offsetTop?: number;
  offsetBottom?: number; // back to top
  useCapture?: boolean;
  children?: React.ReactNode;
};

export function getScroll(target: Window, top?: boolean) {
  const prop = top ? "pageYOffset" : "pageXOffset";
  const method = top ? "scrollTop" : "scrollLeft";
  let ret = target[prop];
  if (typeof ret !== "number") {
    ret = window.document.documentElement[method];
  }
  return ret;
}

export function getOffset(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const scrollTop = getScroll(window, true);
  const scrollLeft = getScroll(window);
  const docEl = window.document.body;
  const clientTop = docEl.clientTop || 0;
  const clientLeft = docEl.clientLeft || 0;
  console.log(scrollTop, clientTop, rect.top);
  return {
    top: rect.top + scrollTop - clientTop,
    left: rect.left + scrollLeft - clientLeft,
  };
}

const Affix: FC<AffixProps> = function (props) {
  const prefixCls = "zz-affix";
  const fixtop = useRef<HTMLDivElement>(null);
  const fixel = useRef<HTMLDivElement>(null);
  // https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs
  const [fixStyle, setFixStyle] = useState<CSSProperties>({});
  const [boxStyle, setBoxStyle] = useState<CSSProperties>({});
  const [affix, setAffix] = useState(false);
  const [offsetType, setOffsetType] = useState<"top" | "bottom">("top");

  if (props.offsetBottom && props.offsetBottom > 0) {
    setOffsetType("bottom");
  }
  const handleScroll = () => {
    const scrollTop = getScroll(window, true);
    const elOffset = fixtop.current
      ? getOffset(fixtop.current)
      : { top: 0, left: 0 };
    // const windowHeight = window.innerHeight;
    // const elHeight = el.current.getElementsByTagName('div')[0].offsetHeight;
    // Fixed Top
    if (
      props.offsetTop &&
      elOffset?.top - props.offsetTop < scrollTop &&
      offsetType == "top" &&
      !affix
    ) {
      setBoxStyle({
        width: `${fixel.current?.clientWidth}px`,
        height: `${fixel.current?.clientHeight}px`,
      });
      setFixStyle({
        position: "fixed",
        zIndex: 10,
        top: `${props.offsetTop}px`,
        left: `${elOffset.left}px`,
        width: `${fixtop.current?.offsetWidth}px`,
      });
      setAffix(true);
      // $emit('on-change', true);
    } else if (
      props.offsetTop &&
      elOffset.top - props.offsetTop > scrollTop &&
      offsetType == "top" &&
      affix
    ) {
      setBoxStyle({});
      setAffix(false);
      setFixStyle({});
      // $emit('on-change', false);
    }
  };
  useEffect(() => {
    console.log("affix mount", props.offsetTop); // 记住了 props
    window.addEventListener("scroll", handleScroll, props.useCapture);
    window.addEventListener("resize", handleScroll, props.useCapture);
    return () => {
      window.removeEventListener("scroll", handleScroll, props.useCapture);
      window.removeEventListener("resize", handleScroll, props.useCapture);
    };
  }, [props.offsetTop]);
  /*
  affix-top 滚动的时候 elOffset跟随上级变化 top
  */
  return (
    <div
      ref={fixtop}
      data-a={props.offsetTop}
      data-af={affix}
      className="affix-top"
    >
      <div ref={fixel} style={fixStyle} className={prefixCls}>
        {props.children}
      </div>
      <div style={boxStyle} className="placeholder" />
    </div>
  );
};

Affix.defaultProps = {
  offsetTop: 0,
  offsetBottom: 0,
  useCapture: true,
};
export default Affix;
