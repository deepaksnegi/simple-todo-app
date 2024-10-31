import axios from "axios";

const API_URL = "https://dummyjson.com/todos";

export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export const fetchTodos = async (limit: number, skip: number) => {
  const response = await axios.get(`${API_URL}?limit=${limit}&skip=${skip}`);
  return response.data;
};

export const createTodo = async (newTodo: Omit<Todo, "id">) => {
  const response = await axios.post(`${API_URL}/add`, newTodo);
  return response.data;
};

export const updateTodo = async (updatedTodo: Todo) => {
  const response = await axios.put(`${API_URL}/${updatedTodo.id}`, updatedTodo);
  return response.data;
};

export const deleteTodo = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
