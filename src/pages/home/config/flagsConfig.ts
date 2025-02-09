const flagsConfig = {
  spawnInterval: 700,
  animationDuration: {
    min: 3,
    max: 6,
  },
  widthAndHeight: [
    { width: 110, height: 70, zIndex: 3 },
    { width: 100, height: 60, zIndex: 2 },
    { width: 90, height: 50, zIndex: 1 },
  ],
  scale: {
    mobile: 0.6,
    normal: 1,
    active: 1.3,
  },
  hoverZIndex: 10,
  windowCenterOffset: 200,
  hoverOffset: -55,
};

export default flagsConfig;
