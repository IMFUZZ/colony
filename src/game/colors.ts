enum Colors{
  //Sets of colors for different level layouts.

  //Background colors
  grass = 0x127c09,
  water = 0x0cc4d5,
  land = 0x712d06,
  sand = 0xd5b30c,
  ice = 0xbfe0e3,

  //Node colors
  grassNode = 0x0055ff,
  waterNode = 0xffffff,
  landNode = grass,
  sandNode = 0xb80000,
  iceNode = 0x000000,

  //Path colors
  //Inner bound
  grassInnerPath = land,
  waterInnerPath = 0x000644,
  landInnerPath = 0x858585,
  sandInnerPath = 0xfbfbfb,
  iceInnerPath = grass,

  //Outer bound
  grassOuterPath = 0x110900,
  waterOuterPath = 0x000644,
  landOuterPath = 0x000000,
  sandOuterPath = 0x000000,
  iceOuterPath = 0xffffff
}
