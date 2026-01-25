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
    const updatedTask = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true }).exec();
      
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return updatedTask;
  }

  async deleteTask(id: string): Promise<boolean> {
    const result = await this.taskModel.findByIdAndDelete(id).exec();
    return !!result; //True si supprimé
  }

  getTasksByStatus(status: string): Task[] {
    return this.tasks
      .filter((task) => task.status === status)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getStatistics() {
    const tasks = await this.taskModel.find().exec();
    const stats = {
      total: tasks.length,
      todo: tasks.filter(t=> t.status === 'todo').length,
      inProgress: tasks.filter(t => t.status === 'in-progress').length,
      done: tasks.filter(t => t.status === 'done').length,
      byPriority: { 
        low: tasks.filter(t => t.priority === 'low').length, 
        medium: tasks.filter(t => t.priority === 'medium').length, 
        high: tasks.filter(t => t.priority === 'high').length 
      },
    };
    return stats;
  }
}
