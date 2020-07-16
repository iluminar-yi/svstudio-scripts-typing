// Only rename functions to test script mode compilation.

function getClientInfo1(): ClientInfo {
  return {
    "name": "Hello World (Javascript)",
    "category": "Examples",
    "author": "Dreamtonics",
    "versionNumber": 0,
    "minEditorVersion": 0,
  };
}

function main1(): void {
  SV.showMessageBoxAsync("Hello", "Hello, world!",
      function () {
        SV.showInputBoxAsync("Create Group",
            "Please tell me the group name", "FooBar Group", next1);
      });
}

function next1(groupName): void {
  if (groupName == "") {
    SV.finish();
    return;
  }

  const mainProject = SV.getProject();
  const newGroup: NoteGroup = SV.create("NoteGroup");
  newGroup.setName(groupName);
  mainProject.addNoteGroup(newGroup, 0);

  onNextFrame1();
}

function onNextFrame1(): void {
  const newGroup = SV.getProject().getNoteGroup(0);
  const lyricsOptions = ["foo", "bar"];
  const scale = [60, 62, 64, 67, 69];

  if (newGroup) {
    const i = newGroup.getNumNotes();
    if (i < 9)
      SV.setTimeout(100, onNextFrame1);
    else {
      SV.showMessageBoxAsync("Hello", "Done!", function () {
        SV.finish();
      });
    }

    const n: Note = SV.create("Note");
    const onset = i * SV.QUARTER;
    n.setTimeRange(onset, SV.QUARTER);
    n.setPitch(scale[i % 5]);
    n.setLyrics(lyricsOptions[i % 2]);
    newGroup.addNote(n);
  } else {
    SV.finish();
  }
}
