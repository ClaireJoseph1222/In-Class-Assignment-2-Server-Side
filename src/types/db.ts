export interface DbUser {
  id: number;
  name: string;
  password_hash: string;
}

export interface DbGame {
  id: number;
  user_id: number;
  rounds: number;
  did_win: boolean;
  finished_at: Date;
}