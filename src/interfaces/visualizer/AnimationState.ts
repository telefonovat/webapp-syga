import Frame from "../backend/Frame";
export interface AnimationState {
  isInitialized: boolean,
  frames: Frame[],
  activeFrame: number,
}

