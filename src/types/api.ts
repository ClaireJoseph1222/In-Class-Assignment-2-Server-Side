export interface DefaultPayload<T> {
  status: "success" | "error";
  data: T;
}

export interface RegisterData {
  name: string;
}

export interface LoginData {
  token: string;
  user: RegisterData;
}

export type RegisterPayload = DefaultPayload<RegisterData>;
export type LoginPayload = DefaultPayload<LoginData>;