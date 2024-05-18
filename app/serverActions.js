"use server";

import { pool } from "@/app/utils/dbConnect";

export async function createTask(data) {
  let task = data.get("task")?.valueOf();
  try {
    const newTask = await pool.query('INSERT INTO task_table VALUES ($1) RETURNING *', [task]);
    console.log(newTask.rows[0]);
  } catch (err) {
    console.log(err);
  }
}
