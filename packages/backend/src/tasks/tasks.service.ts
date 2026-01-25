import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import type { CreateTaskDto, UpdateTaskDto } from './task.interface';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>
  ){}

  async getAllTasks(): Promise<Task[]> {
    const tasks = await this.taskModel.find().exec();
    const priorityWeight = { high: 3, medium: 2, low: 1 };
    
    return tasks.sort((a, b) => 
      (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0)
    );
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = new this.taskModel(createTaskDto);
    return await newTask.save();
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const updatedTask = await this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();
      
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return updatedTask;
  }

  deleteTask(id: string): boolean {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      return false;
    }

    this.tasks.splice(index, 1);
    return true;
  }

  getTasksByStatus(status: string): Task[] {
    return this.tasks
      .filter((task) => task.status === status)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  getStatistics() {
    const stats = {
      total: this.tasks.length,
      todo: 0,
      inProgress: 0,
      done: 0,
      byPriority: { low: 0, medium: 0, high: 0 },
    };

    for (const task of this.tasks) {
      if (task.status === 'todo') stats.todo++;
      if (task.status === 'in-progress') stats.inProgress++;
      if (task.status === 'done') stats.done++;

      stats.byPriority[task.priority]++;
    }

    return stats;
  }
}
