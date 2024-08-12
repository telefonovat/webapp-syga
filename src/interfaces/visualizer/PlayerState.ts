export interface PlayerState {
  isInitialized: boolean,
  isPlaying: boolean,
  lastTick: DOMHighResTimeStamp | null,
  timeStamp: number | null,
  readonly TICK_PERIOD: number,
}
