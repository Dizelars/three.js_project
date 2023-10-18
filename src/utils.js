export const isAutoplayVideoScreenSize = () => {
  return window.innerWidth <= 835;
};

export const isElementVisible = (el) => {
  const cs = getComputedStyle(el);
  const rect = el.getBoundingClientRect();

  return (
    cs.display !== "none" && cs.visibility !== "none" && cs.opacity !== "0" && rect.width && rect.height
  );
};

export const isElementInViewport = (el) => {
  var rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight ||
        document.documentElement.clientHeight) /* or $(window).height() */ &&
    rect.right <=
      (window.innerWidth ||
        document.documentElement.clientWidth) /* or $(window).width() */
  );
};
