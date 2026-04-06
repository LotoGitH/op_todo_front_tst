export interface ToDo {
  id: number;
  title: string;
  description?: string | null;
  targetDate?: string | null;
  assignedUserName?: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface CreateTodoPayload {
  title: string;
  description?: string;
  targetDate?: string;
  assignedUserName?: string;
}

export interface UpdateTodoPayload {
  title?: string;
  description?: string;
  targetDate?: string | null;
  assignedUserName?: string;
  status?: string;
}
