import dayjs from "dayjs";

import { name, version } from "@/../package.json";

export default () => {
  const buildTime = dayjs().format("YYYY-M-D HH:mm:ss");
  const buildGitCommitId = __COMMITID__;

  const mainSize = 36;
  const secondarySize = 22;
  const normalSize = 13;

  const mainBaseStyle =
    'display: inline-block; font-family: "Roboto"; font-weight: bold; font-style: italic';
  const mainPaddingV = 10;
  const gapChar = " ";

  window.console?.clear();
  window.console?.log(
    [
      `%c${name}${gapChar.repeat(1)}`,
      `%cv${version}`,
      `%c
\u23F0${gapChar.repeat(2)}${buildTime}\
${gapChar.repeat(6)}\
\u26CF${gapChar.repeat(2)}${buildGitCommitId}`,
    ].join(""),
    `font-size:${mainSize}px; ${mainBaseStyle};
        color: #1b1b1b;
        text-shadow: 0px 0px 1px rgb(0, 0, 0);
        padding-top: ${mainPaddingV}px`,
    `font-size:${secondarySize}px; ${mainBaseStyle};
        color: #58ad35;
        padding-top: ${mainSize - secondarySize + mainPaddingV}px`,
    `color: #999; font-size: ${normalSize}px; font-family: "Roboto";`
  );
};
