// Disable TS2393 https://github.com/Microsoft/TypeScript/issues/24925#issuecomment-414609525
export {};

function getClientInfo(): ClientInfo {
  return {
    "name": "Test Automation (Javascript)",
    "category": "Tests",
    "author": "Dreamtonics",
    "versionNumber": 0,
    "minEditorVersion": 65537,
  };
}

function main(): void {
  const mainRef = SV.getProject().getTrack(0).getGroupReference(0);
  const mainGroup = mainRef.getTarget();

  const myPitchBend = mainGroup.getParameter("PitchDelta");
  const myTension = mainGroup.getParameter("Tension");

  const numPoints = 1024;
  let y = 0, yPrev = 0;
  for (let i = 0; i < numPoints; i++) {
    const x = i * SV.QUARTER / 8;
    y = (Math.random() - 0.5) * 500;
    y = (yPrev * 0.9 + y * 0.1) * 0.99;
    yPrev = y;
    myPitchBend.add(x, y);
  }

  y = 0;
  yPrev = 0;
  for (let i = 0; i < numPoints; i++) {
    const x = i * SV.QUARTER / 8;
    y = (Math.random() - 0.5) * 5;
    y = (yPrev * 0.97 + y * 0.03) * 0.98;
    yPrev = y;
    myTension.add(x, y);
  }

  SV.finish();
}
