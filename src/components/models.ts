export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Categories {
  id?: number;
  created_at?: string;
  name: string;
  user: string;
}
