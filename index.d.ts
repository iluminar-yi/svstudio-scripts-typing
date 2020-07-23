// Type definitions for svstudio-scripts
// Project: svstudio-scripts-typing
// Definitions by: Iluminar

/**
 * The selection state of the track arrangement area.
 * <br>
 * To access the ArrangementSelectionState object,
 * <ul>
 *   <li>use SV.getArrangement().getSelection() in JavaScript</li>
 *   <li>use SV:getArrangement():getSelection() in Lua</li>
 * </ul>
 */
export interface ArrangementSelectionState extends NestedObject, SelectionStateBase, GroupSelection {}

/**
 * The UI state object for arrangement view.
 */
export interface ArrangementView extends NestedObject {
  /**
   * Get the coordinate system for the track arrangement area.
   */
  getNavigation(): CoordinateSystem;

  /**
   * Get the selection state object for arrangement view.
   */
  getSelection(): ArrangementSelectionState;
}

/**
 * <ul>
 *   <li>"Linear" - linear interpolation</li>
 *   <li>"Cosine" - cosine interpolation</li>
 *   <li>"Cubic" - modified Catmull-Rom spline interpolation</li>
 * </ul>
 */
export type InterpolationMethod = 'Linear' | 'Cosine' | 'Cubic';

/**
 * A set of points controlling a particular parameter type (e.g. Pitch Deviation) inside a {@link NoteGroup}.
 * <br>
 * The name "Automation" comes from DAW software where for each track there usually is a volume envelope defined by
 * draggable control points; in some more advanced cases, the envelope may also control properties of plugins (e.g. filter cutoff, reverb length, ...).
 * One notable difference is that in Synthesizer V Studio, Automation is defined for each {@link NoteGroup} as opposed to {@link Track}.
 */
export interface Automation extends Cloneable, NestedObject {
  /**
   * Add a control point with position b (blicks) and parameter value v.
   * If there is already a point on b, the parameter value will get updated to v.
   * <br>
   * Return true if a new point has been created.
   * @param b
   * @param v
   */
  add(b: number, v: number): boolean;

  /**
   * Get the interpolated parameter value at position b (blicks).
   * If a point exists at b, the interpolation is guaranteed to return the value for the point,
   * regardless of the interpolation method.
   * @param b
   */
  get(b: number): number;

  /**
   * A version of {@link Automation#getPoints} with unlimited range.
   */
  getAllPoints(): [number, number][];

  /**
   * Get a definition object.
   */
  getDefinition(): Definition;

  /**
   * Returns how values between control points are interpolated.
   */
  getInterpolationMethod(): InterpolationMethod;

  /**
   * A version of {@link Automation#get} that uses linear interpolation (even if {@link Automation#getInterpolationMethod} is not "Linear").
   * @param b
   */
  getLinear(b: number): number;

  /**
   * Get an array of control points whose positions are between begin and end (blicks).
   * Each element in the array is an array of two elements: a number for the position (blicks) and a number
   * for the parameter value.
   * For example, [[0, 0.1], [5000, 0], [10000, -0.1]].
   * @param begin
   * @param end
   */
  getPoints(begin: number, end: number): [number, number][];

  /**
   * Get the parameter type for this Automation. See the {@link ParameterType}.
   */
  getType(): ParameterType;

  /**
   * Remove the control point at position b (blicks) if there is one.
   * <br>
   * Return true if any point has been removed.
   * @param b
   */
  remove(b: number): boolean;

  /**
   * Remove all control points between position begin (blicks) and end (blicks).
   * <br>
   * Return true if any point has been removed; return false if there's no point in the specified range.
   * @param begin
   * @param end
   */
  remove(begin: number, end: number): boolean;

  /**
   * Remove all control points in the Automation.
   */
  removeAll(): void;

  /**
   * Simplify the parameter curve from position begin (blicks) to position end (blicks) by removing control points
   * that do not significantly contribute to the curve's shape.
   * If threshold is not provided, it will be set to 0.002. Higher values of threshold will result in more simplification.
   * <br>
   * Return true if any point has been removed.
   * @param begin
   * @param end
   * @param threshold
   */
  simplify(begin: number, end: number, threshold?: number): boolean;
}

/**
 * Returned by getClientInfo().
 */
export interface ClientInfo {
  name: string;
  category?: string;
  author: string;
  versionNumber: number;
  minEditorVersion: number;
}

/**
 * Utility export interface to represent classes that have the {@link Cloneable#clone()} method.
 */
export interface Cloneable {
  /**
   * A deep copy of the current object.
   */
  clone(): this;
}

/**
 * A UI state object for navigating a two-dimensional scrollable area where the x-axis is time and the y-axis is value.
 * <br>
 * It is used in piano roll ({@link MainEditorView}) and arrangement area ({@link ArrangementView}).
 * In both cases, the unit for the x-axis is blicks.
 * However, the arrangement area only uses CoordinateSystem for the x-axis.
 */
export interface CoordinateSystem extends NestedObject {
  /**
   * Get the scaling factor in the horizontal direction.
   * <br>
   * The unit is pixels per blick so expect this to be a very small number.
   */
  getTimePxPerUnit(): number;

  /**
   * Get the current visible time range.
   * It returns an array with two number elements corresponding to the starting time and ending time.
   * The time unit is blicks.
   */
  getTimeViewRange(): [number, number];

  /**
   * Get the scaling factor in the vertical direction.
   * <br>
   * For the piano roll, the unit is pixels per semitone.
   */
  getValuePxPerUnit(): number;

  /**
   * Get the current visible value range.
   * It returns an array with two number elements corresponding to the lower value and upper value.
   * For the piano roll, the unit is MIDI number (semitones); for arrangement view, its value bears no meaning.
   */
  getValueViewRange(): [number, number];

  /**
   * Move the visible area so the left end is at time.
   * @param time
   */
  setTimeLeft(time: number): void;

  /**
   * Move the visible area so the right end is at time.
   * @param time
   */
  setTimeRight(time: number): void;

  /**
   * Set the horizontal scaling factor to scale.
   * <br>
   * The unit is pixels per blick so it expects a very small number.
   * @param scale
   */
  setTimeScale(scale: number): void;

  /**
   * Move the visible area so the vertical center is at v.
   * @param v
   */
  setValueCenter(v: number): void;

  /**
   * Round a time position b based on snapping settings.
   * @param b
   */
  snap(b: number): number;

  /**
   * Convert a time position to an x-position (pixels).
   * @param t
   */
  t2x(t: number): number;

  /**
   * Convert a value to a y-position (pixels).
   * @param v
   */
  v2y(v: number): number;

  /**
   * Convert an x-position (pixels) to a time position.
   * @param x
   */
  x2t(x: number): number;

  /**
   * Convert a y-position (pixels) to a value.
   * @param y
   */
  y2v(y: number): number;
}

export interface CustomDialogForm {
  /**
   * The dialog's title
   */
  title: string;

  /**
   * A message displayed in the top of the dialog
   */
  message: string;

  /**
   * The preset buttons displayed in the bottom of the dialog.
   */
  buttons: 'YesNoCancel' | 'OkCancel';

  /**
   * An array of widgets displayed in the body of the dialog.
   */
  widgets: WidgetOptions[];
}

export type ParameterType = 'PitchDelta' | 'VibratoEnv' | 'Loudness' | 'Tension' | 'Breathiness' | 'Voicing' | 'Gender';
export type Definition = (
  | { displayName: 'Pitch Deviation'; typeName: 'pitchDelta' }
  | { displayName: 'Vibrato Envelope'; typeName: 'vibratoEnv' }
  | { displayName: 'Loudness'; typeName: 'loudness' }
  | { displayName: 'Tension'; typeName: 'tension' }
  | { displayName: 'Breathiness'; typeName: 'breathiness' }
  | { displayName: 'Voicing'; typeName: 'voicing' }
  | { displayName: 'Gender'; typeName: 'gender' }) & {
  range: [number, number];
  defaultValue: number;
};

/**
 * A collection of group selection behaviors.
 */
export interface GroupSelection {
  /**
   * Unselect all {@link NoteGroupReference}. Return true if the selection has changed.
   */
  clearGroups(): boolean;

  /**
   * Get an array of selected {@link NoteGroupReference} following the order of selection.
   */
  getSelectedGroups(): NoteGroupReference[];

  /**
   * Check if there is at least one {@link NoteGroupReference} selected.
   */
  hasSelectedGroups(): boolean;

  /**
   * Add a {@link NoteGroupReference} to the selection.
   * <br>
   * The argument must be part of the currently open project.
   * @param reference
   */
  selectGroup(reference: NoteGroupReference): void;

  /**
   * Unselect a {@link NoteGroupReference}. Return true if the selection has changed.
   * @param reference
   */
  unselectGroup(reference: NoteGroupReference): boolean;
}

export interface HostInfo {
  osType: 'Windows' | 'macOS' | 'Linux' | 'Unknown';

  /**
   * The full name of the operating system
   */
  osName: string;
  hostName: 'Synthesizer V Studio Pro' | 'Synthesizer V Studio Basic';

  /**
   * The version string of Synthesizer V Studio e.g. "1.0.4"
   */
  hostVersion: string;

  /**
   * The version number defined as taking major, minor and revision as 2-digit hexadecimals (e.g. 0x010004 for "1.0.4")
   */
  hostVersionNumber: number;

  /**
   * Language code for the UI, e.g. "en-us", "ja-jp", "zh-cn"
   */
  languageCode: LanguageCode;
}

/**
 * Known language codes, based on {@link https://github.com/Dreamtonics/svstudio-translations}
 */
export type LanguageCode = 'en-us' | 'ja-jp' | 'zh-cn' | 'fr-fr' | 'zh-tw' ;

/**
 * The UI state object for the piano roll.
 */
export interface MainEditorView extends NestedObject {
  /**
   * Get the current {@link NoteGroupReference} that the user is working inside.
   * If the user has not entered a {@link NoteGroupReference}, return the main group of the current track.
   */
  getCurrentGroup(): NoteGroupReference;

  /**
   * Get the current {@link Track} opened in the piano roll.
   */
  getCurrentTrack(): Track;

  /**
   * Get the {@link CoordinateSystem} of the piano roll.
   */
  getNavigation(): CoordinateSystem;

  /**
   * Get the selection state object for the piano roll.
   */
  getSelection(): TrackInnerSelectionState;
}

export interface MeasureMark {
  /**
   * The measure number at where the mark is placed
   */
  position: number;

  /**
   * The position of the mark in blicks
   */
  positionBlick: number;

  /**
   * The numerator (e.g. 3 if it's a 3/4 time signature)
   */
  numerator: number;

  /**
   * The denominator (e.g. 4 if it's a 3/4 time signature)
   */
  denominator: number;
}

/**
 * NestedObject is the base class for all objects that can be passed between the host (Synthesizer V Studio) and the client (the script environment). It implements a tree structure for indexing everything inside a project.
 * Besides that, some UI elements are also exposed through the NestedObject export interface.
 */
export interface NestedObject {
  /**
   * Get index of the current object in its parent.
   * In Lua, this index starts from 1.
   * In JavaScript, this index starts from 0.
   */
  getIndexInParent(): number;

  /**
   * Get the parent NestedObject. Return undefined if the current object is not attached to a parent.
   */
  getParent(): NestedObject | undefined;

  /**
   * Check whether or not the current object is memory managed (i.e. garbage collected by the script environment).
   */
  isMemoryManaged(): boolean;
}

/**
 * A note defined by pitch, lyrics, onset, duration, etc. It is placed inside a {@link NoteGroup}.
 */
export interface Note extends Cloneable, NestedObject {
  /**
   * Get an object holding note properties.
   */
  getAttributes(): VoiceAttributes;

  /**
   * Get the duration of the note. The unit is blicks.
   */
  getDuration(): number;

  /**
   * Get the end position (start + duration) of the note. The unit is blicks.
   */
  getEnd(): number;

  /**
   * Get the lyrics for this note.
   */
  getLyrics(): string;

  /**
   * Get the start position of the note. The unit is blicks.
   */
  getOnset(): number;

  /**
   * Returns the user-specified phonemes, delimited by spaces. For example, "hh ah ll ow".
   * <br>
   * If there's no phoneme specified, this will return an empty string,
   * instead of the default pronunciation (see {@link SV#getPhonemesForGroup}).
   */
  getPhonemes(): string;

  /**
   * Get the pitch as a MIDI number. C4 maps to 60.
   */
  getPitch(): number;

  /**
   * Set note properties based on an attribute object.
   * The attribute object does not have to be complete; only the given properties will be updated.
   * @param object
   */
  setAttributes(object: Partial<VoiceAttributes>): void;

  /**
   * Resize the note to duration t. The unit is blicks. This changes the end as well, but not the onset.
   * @param t
   */
  setDuration(t: number): void;

  /**
   * Change the lyrics.
   * @param lyrics
   */
  setLyrics(lyrics: string): void;

  /**
   * Move the note to start at t. The unit is blicks. This does not change the duration.
   * @param t
   */
  setOnset(t: number): void;

  /**
   * Change the phonemes to phonemeStr. For example, "hh ah ll ow".
   * @param phonemeStr
   */
  setPhonemes(phonemeStr: string): void;

  /**
   * Set the note pitch to pitchNumber, a MIDI number.
   * @param pitchNumber
   */
  setPitch(pitchNumber: number): void;

  /**
   * Set both onset and duration. This is a shorthand for calling setOnset(onset) and setDuration(duration).
   * @param onset
   * @param duration
   */
  setTimeRange(onset: number, duration: number): void;
}

/**
 * A set of notes ({@link Note}) and parameters ({@link Automation}) grouped together for convenient reuse.
 * <br>
 * To put a NoteGroup inside a {@link Track},
 * it has to be wrapped in a {@link NoteGroupReference} which provides the context
 * (e.g. voice, language, time and pitch offset) for the group.
 */
export interface NoteGroup extends Cloneable, NestedObject {
  /**
   * Add a note to this NoteGroup and return the index of the added note.
   * The notes are kept sorted by ascending onset positions.
   * @param note
   */
  addNote(note: Note): number;

  /**
   * Get the user-specified name of this NoteGroup.
   */
  getName(): string;

  /**
   * Get the note at index. The notes inside a NoteGroup are always sorted by onset positions.
   * @param index
   */
  getNote(index: number): Note;

  /**
   * Get the number of notes in the NoteGroup.
   */
  getNumNotes(): number;

  /**
   * Get the {@link Automation} object for parameter type. It is case-insensitive.
   * <br>
   * type should be one of the strings in the typeName column in the table shown in {@link Automation#getDefinition}.
   * @param type
   */
  // TODO: Typo in web doc
  // TODO: Is first letter capitalized?
  getParameter(type: ParameterType): Automation;

  /**
   * Get the Universally Unique Identifier.
   * Unlike the name, a UUID is unique across the project and can be used to associate a {@link NoteGroupReference} with a NoteGroup.
   * <br>
   * A UUID looks like this: "ab85d637-d80b-4628-9c27-007ea74029af".
   */
  getUUID(): string;

  /**
   * Remove the note at index.
   * @param index
   */
  removeNote(index: number): void;

  /**
   * Set the name of this NoteGroup.
   * @param name
   */
  setName(name: string): void;
}

/**
 * A reference to a {@link NoteGroup} with optional time and pitch offset and voice/database properties.
 * It puts a {@link NoteGroup} in a language context so text-to-phoneme conversion and rendering are possible.
 * A NoteGroupReference is always placed inside a {@link Track}.
 * A {@link NoteGroup} may be referenced by more than one NoteGroupReference.
 */
export interface NoteGroupReference extends Cloneable, NestedObject {
  /**
   * A deep copy of the current object.
   * <br>
   * Note: since NoteGroupReference does not take ownership of the target {@link NoteGroup},
   * this does not copy the target {@link NoteGroup}.
   */
  clone(): this;

  /**
   * The duration of this NoteGroupReference (blicks).
   * <br>
   * Equivalent to getEnd() - getOnset().
   */
  getDuration(): number;

  /**
   * The ending position (blicks), that is, the end of the last note in the target NoteGroup plus the time offset.
   * <br>
   * If the NoteGroupReference holds an audio file ({@link NoteGroupReference#isInstrumental}),
   * getEnd() will return the ending position (blicks) of the audio plus the time offset.
   * However, if the NoteGroupReference is not placed inside a {@link Project},
   * there is not enough information to determine the audio's length in musical time units and
   * getEnd() will assume that the duration is zero.
   */
  getEnd(): number;

  /**
   * Get the beginning position (blicks), that is, the onset of the first {@link Note} in the target {@link NoteGroup} plus the time offset.
   */
  getOnset(): number;

  /**
   * Get the pitch shift (semitones) applied to all notes in the target {@link NoteGroup}.
   */
  getPitchOffset(): number;

  /**
   * Get the target {@link NoteGroup}.
   */
  getTarget(): NoteGroup;

  /**
   * Get the time offset (blicks) applied to all notes in the target {@link NoteGroup}.
   */
  getTimeOffset(): number;

  /**
   * Get an object holding the default voice properties for this group, similar to {@link Note#getAttributes}.
   */
  getVoice(): VoiceParameters;

  /**
   * Whether this NoteGroupReference refers to an external audio file. If so, it must not refer to a {@link NoteGroup}.
   */
  isInstrumental(): boolean;

  /**
   * Whether this NoteGroupReference refers to the parent {@link Track}'s main group.
   */
  isMain(): boolean;

  /**
   * Set the pitch offset to pitchOffset (semitones).
   * @param pitchOffset
   */
  setPitchOffset(pitchOffset: number): void;

  /**
   * Set the target {@link NoteGroup}.
   * <br>
   * Note that once set, the target can't be changed.
   * @param group
   */
  setTarget(group: NoteGroup): void;

  /**
   * Set the time offset to blickOffset (blicks).
   * @param blickOffset
   */
  setTimeOffset(blickOffset: number): void;

  /**
   * Set voice properties based on an attribute object (for the definition, see {@link VoiceParameters}).
   * The attribute object does not have to be complete;
   * only the given properties will be updated (see {@link Note#setAttributes}).
   * @param attributes
   */
  setVoice(attributes: Partial<VoiceParameters>): void;
}

export type PlaybackStatus = 'playing' | 'looping' | 'stopped';
/**
 * The UI state object for controlling audio playback.
 */
export interface PlaybackControl extends NestedObject {
  /**
   * Get the current playhead position in seconds.
   * <br>
   * To get the position in blicks, use this with the current project's {@link TimeAxis}.
   */
  getPlayhead(): number;

  /**
   * Get the current playback status.
   */
  getStatus(): PlaybackStatus;

  /**
   * Start looping between tBegin and tEnd in seconds.
   * @param tBegin
   * @param tEnd
   */
  loop(tBegin: number, tEnd: number): void;

  /**
   * Stop playing but without resetting the playhead.
   */
  pause(): void;

  /**
   * Start playing audio.
   */
  play(): void;

  /**
   * Set the playhead position to t in seconds.
   * <br>
   * If the audio is playing, this does not pause the audio but resumes playing at the new position.
   * @param t
   */
  seek(t: number): void;

  /**
   * Stop playing and reset the playhead to where the playback started.
   */
  stop(): void;
}

/**
 * The largest object to work with. Contains {@link Track}, {@link TimeAxis}, {@link NoteGroup}, etc.
 */
export interface Project extends NestedObject {
  /**
   * Insert a {@link NoteGroup} to the project library at suggestedIndex.
   * If suggestedIndex is not given, the {@link NoteGroup} is added at the end.
   * Return the index of the added {@link NoteGroup}.
   * @param group
   * @param suggestedIndex
   */
  addNoteGroup(group: NoteGroup, suggestedIndex?: number): number;

  /**
   * Add a {@link Track} to the Project. Return the index of the added {@link Track}.
   * @param track
   */
  addTrack(track: Track): number;

  /**
   * Get the duration of the Project (blicks), defined as the duration of the longest {@link Track}.
   */
  getDuration(): number;

  /**
   * Get the absolute path of the project on the file system.
   */
  getFileName(): string;

  /**
   * If id is a number, get the id-th {@link NoteGroup} in the project library.
   * <br>
   * If id is a string, look for a {@link NoteGroup} in the project library with id as its UUID;
   * return undefined if no such {@link NoteGroup} exists.
   * @param id
   */
  getNoteGroup(id: number | string): NoteGroup | undefined;

  /**
   * Get the number of {@link NoteGroup} in the project library.
   * <br>
   * It does not count the main groups and is unrelated to the number of {@link NoteGroupReference}.
   */
  getNumNoteGroupsInLibrary(): number;

  /**
   * Get the number of tracks.
   */
  getNumTracks(): number;

  /**
   * Get the {@link TimeAxis} object of this Project.
   */
  getTimeAxis(): TimeAxis;

  /**
   * Get the index-th {@link Track}. The indexing is based on the storage order rather than display order.
   * @param index
   */
  getTrack(index: number): Track;

  /**
   * Add a new undo record for this {@link Project}.
   * This means that all edits following the last undo record will be undone/redone together
   * when the users presses Ctrl + Z or Ctrl + Y.
   * <br>
   * A new undo record is automatically added to the currently open project at the beginning of script execution.
   */
  newUndoRecord(): void;

  /**
   * Remove index-th {@link NoteGroup} from the project library.
   * This also removes all {@link NoteGroupReference} that refer to the {@link NoteGroup}.
   * @param index
   */
  removeNoteGroup(index: number): void;

  /**
   * Remove the index-th {@link Track} from the Project.
   * @param index
   */
  removeTrack(index: number): void;
}

/**
 * A basic export interface for selection states.
 */
export interface SelectionStateBase {
  /**
   * Unselects all object types supported by this selection state. Return true if the selection has changed.
   */
  clearAll(): boolean;

  /**
   * Check if there's anything selected.
   */
  hasSelectedContent(): boolean;

  /**
   * Check if there's any unfinished edit on the selected objects.
   * <br>
   * For example, this will return true if the user is dragging around a few notes/control points but has not yet released the mouse.
   */
  hasUnfinishedEdits(): boolean;
}

/**
 * The host object is a global object named {@link SV} that can be accessed from anywhere in a script.
 */
export interface SynthV {
  /**
   * Number of blicks in a quarter. The value is 705600000.
   * <br>
   * We denote <em>musical time</em> (e.g. a quarter, a beat) differently from <em>physical time</em> (e.g. one second).
   * A blick is the smallest unit of <em>musical time</em> that the GUI works with internally.
   * It is a large number chosen to be divisible by a lot of similarly purposed numbers used in music software.
   * The name originates from <a href="https://github.com/facebookarchive/Flicks">Flicks</a>.
   */
  QUARTER: 705600000;

  /**
   * Check whether the key (passed in as a MIDI number) is a black key on a piano.
   * <br>
   * Conversions between musical and physical time in the context of a project are done by {@link TimeAxis}.
   * @param k
   */
  blackKey(k: number): boolean;

  /**
   * Convert b from number of blicks into number of quarters.
   * <br>
   * Equivalent to b / SV.QUARTER.
   * <br>
   * Conversions between musical and physical time in the context of a project are done by {@link TimeAxis}.
   * @param b
   */
  blick2Quarter(b: number): number;

  /**
   * Convert b from blicks into seconds with the specified beats per minute bpm.
   * <br>
   * Equivalent to b / SV.QUARTER * 60 / bpm.
   * <br>
   * Conversions between musical and physical time in the context of a project are done by {@link TimeAxis}.
   * @param b
   * @param bpm
   */
  blick2Seconds(b: number, bpm: number): number;

  /**
   * Rounded division of dividend (blicks) over divisor (blicks).
   * <br>
   * Conversions between musical and physical time in the context of a project are done by {@link TimeAxis}.
   * @param dividend
   * @param divisor
   */
  blickRoundDiv(dividend: number, divisor: number): number;

  /**
   * Returns the closest multiple of interval (blicks) from b (blick).
   * <br>
   * Equivalent to blickRoundDiv(b, interval) * interval.
   * <br>
   * Conversions between musical and physical time in the context of a project are done by {@link TimeAxis}.
   * @param b
   * @param interval
   */
  blickRoundTo(b: number, interval: number): number;

  /**
   * Create a new object. type can be one of the following type-specifying strings.
   * @param type A type-specifying string.
   */
  create(type: 'Note'): Note;
  create(type: 'Automation'): Automation;
  create(type: 'NoteGroup'): NoteGroup;
  create(type: 'NoteGroupReference'): NoteGroupReference;
  create(type: 'TrackMixer'): {}; // TODO To add later
  create(type: 'Track'): Track;
  create(type: 'TimeAxis'): TimeAxis;
  create(type: 'Project'): Project;

  /**
   * Mark the finish of a script.
   * All subsequent async callbacks will not be executed.
   * Note that this does not cause the current script to exit immediately.
   */
  finish(): void;

  /**
   * Convert a frequency in Hz to a MIDI number (semitones, where C4 is 60).
   * <br>
   * Conversions between musical and physical time in the context of a project are done by {@link TimeAxis}.
   * @param f
   */
  freq2Pitch(f: number): number;

  /**
   * Get the UI state object for arrangement view.
   */
  getArrangement(): ArrangementView;

  /**
   * Get the text on the system clipboard.
   */
  getHostClipboard(): string;

  /**
   * Get {@link HostInfo}.
   */
  getHostInfo(): HostInfo;

  /**
   * Get the UI state object for the piano roll.
   */
  getMainEditor(): MainEditorView;

  /**
   * Get the phonemes for all notes in a group (passed in as a group reference).
   * The group must be part of the currently open project.
   * <br>
   * Note that getPhonemesForGroup returns the output of Synthesizer V Studio's internal text-to-phoneme converter.
   * That means even for notes with no user-specified phonemes, getPhonemesForGroup will return the default pronunciation,
   * whereas {@link Note#getPhonemes} will return an empty string.
   * <br>
   * Also note that the text-to-phoneme converter runs on a different thread.
   * getPhonemesForGroup does not block the current thread.
   * There's a slight chance of returning an empty array if text-to-phoneme conversion has not yet finished on the group.
   * We recommend script authors to wrap getPhonemesForGroup in a {@link SV#setTimeout} call in such cases.
   * @param group
   */
  getPhonemesForGroup(group: NoteGroupReference): string[];

  /**
   * Get the UI state object for controlling the playback.
   */
  getPlayback(): PlaybackControl; // TODO: Typo in "PlayBackControl"

  /**
   * Get the currently open project.
   */
  getProject(): Project;

  /**
   * Convert a MIDI number (semitones, where C4 is 60) to a frequency in Hz.
   * <br>
   * Conversions between musical and physical time in the context of a project are done by {@link TimeAxis}.
   * @param p
   */
  pitch2Freq(p: number): number;

  /**
   * Convert q from number of quarters into number of blick.
   * <br>
   * Equivalent to q * SV.QUARTER.
   * <br>
   * Conversions between musical and physical time in the context of a project are done by {@link TimeAxis}.
   * @param q
   */
  quarter2Blick(q: number): number;

  /**
   * Convert s from seconds into blicks with the specified beats per minute bpm.
   * <br>
   * Equivalent to s / 60 * bpm * SV.QUARTER.
   * <br>
   * Conversions between musical and physical time in the context of a project are done by {@link TimeAxis}.
   * @param s
   * @param bpm
   */
  seconds2Blick(s: number, bpm: number): number;

  /**
   * Set the system clipboard.
   * @param text
   */
  setHostClipboard(text: string): void;

  /**
   * Schedule a delayed call to callback after timeOut milliseconds.
   * <br>
   * After calling setTimeout, the script will continue instead of immediately executing callback.
   * The callback function is pushed onto a queue and delayed.
   * This is not a preemptive callback, i.e. the execution of callback will not interrupt the currently running task.
   * @param timeout
   * @param callback
   */
  setTimeout(timeout: number, callback: () => void): void;

  /**
   * The synchronous version of {@link SV#showCustomDialogAsync} that blocks the script execution until the user closes the dialog.
   * It returns the inputs (the completed form) from the user.
   * @param form
   */
  showCustomDialog(form: CustomDialogForm): WidgetAnswers;

  /**
   * Display a custom dialog defined in form, without blocking the script execution.
   * <br>
   * callback will be invoked once the dialog is closed.
   * The callback function takes one argument which contains the results.
   * <br>
   * See <a href="https://dreamtonics.com/synthv/scripting/tutorial-Custom%20Dialogs.html">Custom Dialogs</a> for more information.
   * @param form
   * @param callback
   */
  showCustomDialogAsync(form: CustomDialogForm, callback: (answers: WidgetAnswers) => void): void;

  /**
   * The synchronous version of {@link SV#showInputBoxAsync} that blocks the script execution until the user closes the dialog.
   * It returns the text input from the user.
   * @param title
   * @param message
   * @param defaultText
   */
  showInputBox(title: string, message: string, defaultText: string): string;

  /**
   * Display a dialog with a text box and an "OK" button, without blocking the script execution.
   * <br>
   * callback will be invoked once the dialog is closed.
   * The callback function takes one string argument that is the content of the text box.
   * @param title
   * @param message
   * @param defaultText
   * @param callback
   */
  showInputBoxAsync(title: string, message: string, defaultText: string, callback: (answer: string) => void): void;

  /**
   * The synchronous version of {@link SV#showMessageBoxAsync} that blocks the script execution until the user closes the message box.
   * @param title
   * @param message
   */
  showMessageBox(title: string, message: string): void;

  /**
   * Cause a message box to pop up without blocking the script execution.
   * <br>
   * If a callback is given, it is invoked once the message box is closed. The callback function takes no argument.
   * @param title
   * @param message
   * @param callback
   */
  showMessageBoxAsync(title: string, message: string, callback?: () => void): void;

  /**
   * The synchronous version of {@link SV#showOkCancelBoxAsync} that blocks the script execution until the user closes the message box.
   * It returns true if "OK" button is pressed.
   * @param title
   * @param message
   */
  showOkCancelBox(title: string, message: string): boolean;

  /**
   * Display a message box with an "OK" button and a "Cancel" button, without blocking the script execution.
   * <br>
   * callback will be invoked once the message box is closed.
   * The callback function takes one boolean argument that is true if "OK" button is pressed.
   * @param title
   * @param message
   * @param callback
   */
  showOkCancelBoxAsync(title: string, message: string, callback: (answer: boolean) => void): void;

  /**
   * The synchronous version of {@link SV#showYesNoCancelBoxAsync} that blocks the script execution until the user closes the message box.
   * @param title
   * @param message
   */
  showYesNoCancelBox(title: string, message: string): YesNoCancelAnswer;

  /**
   * Display a message box with a "Yes" button, an "No" button and a "Cancel" button, without blocking the script execution.
   * <br>
   * callback will be invoked once the message box is closed. The callback function takes one string argument that can be "yes", "no" or "cancel".
   * @param title
   * @param message
   * @param callback
   */
  showYesNoCancelBoxAsync(title: string, message: string, callback: (answer: YesNoCancelAnswer) => void): void;

  /**
   * Get a localized version of text based on the current UI language settings.
   * <br>
   * See <a href="https://dreamtonics.com/synthv/scripting/tutorial-Localization.html">Localization</a> for more information.
   * @param text
   * @constructor
   */
  T(text: string): string;
}

export interface TempoMark {
  /**
   * The position of the tempo mark in blicks
   */
  position: number;

  /**
   * The position of the tempo mark in seconds
   */
  positionSeconds: number;

  /**
   * Beats per minute value that is effective between this tempo mark and the next tempo mark
   */
  bpm: number;
}

/**
 * A project-wide object storing tempo and time signature marks.
 * It also handles the conversion between physical time (e.g. seconds) and musical time (e.g. quarters, blicks).
 */
export interface TimeAxis extends Cloneable, NestedObject {
  /**
   * Insert a nomin/denom measure mark at position measure (a measure number).
   * If a measure mark exists at measure, update the information.
   * @param measure
   * @param nomin
   * @param denom
   */
  addMeasureMark(measure: number, nomin: number, denom: number): void;

  /**
   * Insert a tempo mark with beats per minute of bpm at position b (blicks).
   * If a tempo mark exists at position b, update the BPM.
   * @param b
   * @param bpm
   */
  addTempoMark(b: number, bpm: number): void;

  /**
   * Get all measure marks in this TimeAxis. See {@link TimeAxis#getMeasureMarkAt}.
   */
  getAllMeasureMarks(): MeasureMark[];

  /**
   * Get all tempo marks in this TimeAxis. See {@link TimeAxis#getTempoMarkAt}.
   */
  getAllTempoMarks(): TempoMark[];

  /**
   * Convert physical time t (second) to musical time (blicks).
   * @param t
   */
  getBlickFromSeconds(t: number): number;

  /**
   * Get the measure number at position b (blicks).
   * @param b
   */
  getMeasureAt(b: number): number;

  /**
   * Get the measure mark at measure measureNumber.
   * @param measureNumber
   */
  getMeasureMarkAt(measureNumber: number): MeasureMark;

  /**
   * Get the measure mark that is effective at position b (blicks).
   * For the returned object, see {@link TimeAxis#getMeasureMarkAt}
   * @param b
   */
  getMeasureMarkAtBlick(b: number): MeasureMark;

  /**
   * Convert musical time b (blicks) to physical time (seconds).
   * @param b
   */
  getSecondsFromBlick(b: number): number;

  /**
   * Get the tempo mark that is effective at position b (blicks).
   * @param b
   */
  getTempoMarkAt(b: number): TempoMark;

  /**
   * Remove the measure mark at measure number measure.
   * If a measure mark exists at measure, return true.
   * @param measure
   */
  removeMeasureMark(measure: number): number;

  /**
   * Remove the tempo mark at position b (blicks).
   * If a tempo mark exists at position b, return true.
   * @param b
   */
  removeTempoMark(b: number): boolean;
}

/**
 * A collection of {@link NoteGroupReference}.
 * A Track also contains a {@link NoteGroup} which is the main group of the track.
 * The first {@link NoteGroupReference} inside the track always refers to the main group.
 * <br>
 * The default voice properties of the Track is defined by the first {@link NoteGroupReference} (the main group).
 */
export interface Track extends Cloneable, NestedObject {
  /**
   * Add a {@link NoteGroupReference} to this Track and return the index of the added group.
   * It keeps all groups sorted by onset position.
   * @param group
   */
  addGroupReference(group: NoteGroupReference): number;

  /**
   * Get the track's color as a hex string.
   */
  getDisplayColor(): string;

  /**
   * Get the display order of the track inside the parent {@link Project}.
   * A track's display order can be different from its storage index.
   * The order of tracks as displayed in arrangement view is always based on the display order.
   */
  getDisplayOrder(): number;

  /**
   * Get the duration of the Track in blicks, defined as the ending position of the last {@link NoteGroupReference}.
   */
  getDuration(): number;

  /**
   * Get the index-th {@link NoteGroupReference}.
   * The first is always the main group, followed by groups that refer to {@link NoteGroup} in the project library.
   * The groups are sorted in ascending onset positions.
   * @param index
   */
  getGroupReference(index: number): NoteGroupReference;

  /**
   * Get the track name.
   */
  getName(): string;

  /**
   * Get the number of {@link NoteGroupReference} in this Track, including the main group.
   */
  getNumGroups(): number;

  /**
   * An option for whether or not to be exported to files, shown in Render Panel.
   */
  isBounced(): boolean;

  /**
   * Remove the index-th {@link NoteGroupReference} from this Track.
   * @param index
   */
  removeGroupReference(index: number): void;

  /**
   * Set whether or not to have the Track exported to files. See {@link Track#isBounced}.
   * @param enabled
   */
  setBounced(enabled: boolean): void;

  /**
   * Set the display color of the Track to a hex string.
   * @param colorStr
   */
  setDisplayColor(colorStr: string): void;

  /**
   * Set the name of the Track.
   * @param name
   */
  setName(name: string): void;
}

/**
 * The selection state of the piano roll area.
 * <br>
 * To access the TrackInnerSelectionState object,
 * <ul>
 *   <li>use SV.getMainEditor().getSelection() in JavaScript</li>
 *   <li>use SV:getMainEditor():getSelection() in Lua</li>
 * </ul>
 */
export interface TrackInnerSelectionState extends NestedObject, SelectionStateBase, GroupSelection {
  /**
   * Unselect all notes. Return true if the selection has changed.
   */
  clearNotes(): boolean;

  /**
   * Get an array of selected {@link Note} following the order of selection.
   */
  getSelectedNotes(): Note[];

  /**
   * Check if there is at least one {@link Note} selected.
   */
  hasSelectedNotes(): boolean;

  /**
   * Select a {@link Note}.
   * The note must be inside the current {@link NoteGroupReference} opened in the piano roll
   * (see {@link MainEditorView#getCurrentGroup}).
   * @param note
   */
  selectNote(note: Note): void;

  /**
   * Unselect a {@link Note}. Return true if the selection has changed.
   * @param note
   */
  unselectNote(note: Note): boolean;
}

export interface VoiceAttributes {
  /**
   * Pitch transition - offset (seconds)
   */
  tF0Offset: number;

  /**
   * Pitch transition - duration left (seconds)
   */
  tF0Left: number;

  /**
   * Pitch transition - duration right (seconds)
   */
  tF0Right: number;

  /**
   * Pitch transition - depth left (semitones)
   */
  dF0Left: number;

  /**
   * Pitch transition - depth right (semitones)
   */
  dF0Right: number;

  /**
   * Vibrato - start (seconds)
   */
  tF0VbrStart: number;

  /**
   * Vibrato - left (seconds)
   */
  tF0VbrLeft: number;

  /**
   * Vibrato - right (seconds)
   */
  tF0VbrRight: number;

  /**
   * Vibrato - depth (semitones)
   */
  dF0Vbr: number;

  /**
   * Vibrato - phase (radian, from -pi to pi)
   */
  pF0Vbr: number;

  /**
   * Vibrato - frequency (Hz)
   */
  fF0Vbr: number;

  /**
   * Timing and phonemes - note offset (seconds)
   */
  tNoteOffset: number;

  /**
   * Expression group
   */
  exprGroup?: string;

  /**
   * Phoneme duration scaling
   */
  dur: number[];

  /**
   * Phoneme alternative pronunciation
   */
  alt: number[]; // TODO: Really number?
}

export interface VoiceParameters {
  /**
   * Pitch transition - duration left (seconds)
   */
  tF0Left: number;

  /**
   * Pitch transition - duration right (seconds)
   */
  tF0Right: number;

  /**
   * Pitch transition - depth left (semitones)
   */
  dF0Left: number;

  /**
   * Pitch transition - depth right (semitones)
   */
  dF0Right: number;

  /**
   * Vibrato - start (seconds)
   */
  tF0VbrStart: number;

  /**
   * Vibrato - left (seconds)
   */
  tF0VbrLeft: number;

  /**
   * Vibrato - right (seconds)
   */
  tF0VbrRight: number;

  /**
   * Vibrato - depth (semitones)
   */
  dF0Vbr: number;

  /**
   * Vibrato - frequency (Hz)
   */
  fF0Vbr: number;

  /**
   * Parameters - loudness (dB)
   */
  paramLoudness: number;

  /**
   * Parameters - tension
   */
  paramTension: number;

  /**
   * Parameters - breathiness
   */
  paramBreathiness: number;

  /**
   * Parameters - gender
   */
  paramGender: number;
}

/**
 * Returned by getTranslations(LanguageCode). First element is translation key. Second element is translation value.
 */
export type Translation = [string, string];

export interface WidgetAnswers {
  status: 'Yes' | 'No' | 'Cancel';
  answers: {
    [k: string]: string | number | boolean;
  };
}

export interface SliderOptions {
  name: string;
  type: 'Slider';
  label: string;
  format: string;
  minValue: number;
  maxValue: number;
  interval: number;
  default: number;
}

export interface ComboBoxOptions {
  name: string;
  type: 'ComboBox';
  label: string;
  choices: string[];
  default: number;
}

export interface TextBoxOptions {
  name: string;
  type: 'TextBox';
  label: string;
  default: string;
}

export interface TextAreaOptions {
  name: string;
  type: 'TextArea';
  label: string;
  height: number;
  default: string;
}

export interface CheckBoxOptions {
  name: string;
  type: 'CheckBox';
  text: string;
  default: boolean;
}

export type WidgetOptions = SliderOptions | ComboBoxOptions | TextBoxOptions | TextAreaOptions | CheckBoxOptions;

export type YesNoCancelAnswer = 'yes' | 'no' | 'cancel';
