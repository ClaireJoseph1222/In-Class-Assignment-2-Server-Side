export interface GameRecord {
  id: number;
  userId: number;
  rounds: number;
  didWin: boolean;
  finishedAt: Date;
}

export interface CreateGameRecordInput {
  userId: number;
  rounds: number;
  didWin: boolean;
  finishedAt: Date;
}