// Disable TS2393 https://github.com/Microsoft/TypeScript/issues/24925#issuecomment-414609525
export {};

const SCRIPT_TITLE = "Test Message Boxes";

function getClientInfo(): ClientInfo {
  return {
    "name": "Test Message Boxes (Javascript)",
    "category": "Tests",
    "author": "Dreamtonics",
    "versionNumber": 0,
    "minEditorVersion": 65537,
  };
}

function main(): void {
  SV.showMessageBox(SCRIPT_TITLE, "An example of a sync message box.");
  const result = SV.showOkCancelBox(SCRIPT_TITLE,
      "An example of a sync okay-cancel box.");
  SV.showMessageBox("Okay-cancel box", "Result: " + result);
  const result1 = SV.showInputBox(SCRIPT_TITLE,
      "An example of a sync input box.", "default text");
  SV.showMessageBox("Input box", "Result: " + result1);

  SV.showMessageBoxAsync(SCRIPT_TITLE,
      "An example of an async message box.", next);
}

let step = 0;

function next(result?: unknown): void {
  if (step == 0) {
    SV.showOkCancelBoxAsync(SCRIPT_TITLE,
        "An example of an async okay-cancel box.", next);
  } else if (step == 1) {
    SV.showInputBoxAsync(SCRIPT_TITLE,
        "An example of an async input box.",
        "Previous result: " + result, next);
  } else if (step == 2) {
    SV.showMessageBoxAsync(SCRIPT_TITLE,
        "Previous result: " + result, finish);
  }
  step += 1;
}

function finish(): void {
  SV.finish();
}
