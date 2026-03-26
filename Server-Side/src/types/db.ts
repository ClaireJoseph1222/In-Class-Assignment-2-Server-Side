export interface DbUser {
  id: number;
  username: string;
  email: string;
  user_password: string;
}

export interface DbGame {
  id: number;
  date_completed: Date;
  user_win: boolean;
  rounds: number;
  user_id: number;
}
