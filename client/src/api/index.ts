import { ServerTask } from "../types";

export async function loadTasks(userId: number): Promise<ServerTask[]> {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/${userId}/tasks/get`
    );
    const { data } = await res.json();
    return data;
  } catch (err) {
    console.error("Error loading tasks");
    throw err;
  }
}
