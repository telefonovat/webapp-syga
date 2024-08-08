// Player utilities
function shouldDoTick(tickPeriod: number, lastTick: number,
  timestamp: number) {
  return tickPeriod + lastTick <= timestamp;

}

export { shouldDoTick };
