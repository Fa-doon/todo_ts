export interface TodoDTO {
    title: string;
    description: string;
    userId: number;
  }

  export interface UpdateTodoDTO {
    title?: string;
    description?: string;
  }