// Disable TS2393 https://github.com/Microsoft/TypeScript/issues/24925#issuecomment-414609525
export {};

function getClientInfo(): ClientInfo {
  return {
    "name": "Test Navigation (Javascript)",
    "category": "Tests",
    "author": "Dreamtonics",
    "versionNumber": 0,
    "minEditorVersion": 65537,
  };
}

function main(): void {
  const navMain = SV.getMainEditor().getNavigation();

  navMain.setTimeScale(50 / SV.QUARTER);

  intervalCallback();
}

let count = 0;

function intervalCallback(): void {
  count += 1;

  const navMain = SV.getMainEditor().getNavigation();
  const tLeft = navMain.getTimeViewRange()[0];
  navMain.setTimeScale(navMain.getTimePxPerUnit() *
      (1 + 0.02 * Math.sin(count * 0.1)));
  navMain.setTimeLeft(tLeft + SV.QUARTER / count);

  if (count < 100)
    SV.setTimeout(50, intervalCallback);
  else
    SV.finish();
}
