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

  /**
   * Récupère toutes les tâches.
   * @returns {Promise<Task[]>} - Un tableau de tâches triées par ordre de priorité
   */
  async getAllTasks(): Promise<Task[]> {
    const tasks = await this.taskModel.find().exec();
    const priorityWeight = { high: 3, medium: 2, low: 1 };
    return tasks.sort((a, b) => 
      (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0)
    );
  }

  /**
   * Récupère une tâche via son identifiant.
   * @param id - L'identifiant MongoDB de la tâche
   * @returns {Promise<Task>} - La tâche correspondant à l'id recherché
   * @throws {NotFoundException} - Si aucune tâche n'est trouvée avec l'identifiant
   */
  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  /**
   * Insertion d'une tâche dans la base de données
   * @param {CreateTaskDto} createTaskDto - Un objet qui contient les information relatives à la nouvelle tâche
   * @returns {Promise<Task>} - La nouvelle tâche ajoutée 
   */
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = new this.taskModel(createTaskDto);
    return await newTask.save();
  }

  /**
   * Modification d'une tâche par son identifiant unique.
   * @param id - L'identifiant MongoDB de la tâche
   * @param {UpdateTaskDto} updateTaskDto - Un objet contenant les information relatives à la tâche mise à jour
   * @returns la tâche mise à jour
   */
  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const updatedTask = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true }).exec();
      
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return updatedTask;
  }

  /**
   * Supprime une tâche par son identifiant unique.
   * @param id - L'identifiant MongoDB de la tâche
   * @returns Un booléen indiquant si la suppression a réussi
   */
  async deleteTask(id: string): Promise<boolean> {
    const result = await this.taskModel.findByIdAndDelete(id).exec();
    return !!result; //True si supprimé
  }

  /**
   * Récupère la liste des tâches filtrées par leur statut.
   * @param {string} status - Le status des tâches à rechercher 
   * @returns {Promise<Task[]>} Un tableau de tâches filtrées, triées par date de création décroissante
   */
  async getTasksByStatus(status: string): Promise<Task[]> {
    return await this.taskModel.find({ status: status }).sort({ createdAt: -1 }).exec();
  }

  /**
   * Récupère les statistiques des tâches en base de données.
   * @returns {Promise<{ total: number, todo: number, inProgress: number, done: number, byPriority: any }>} - Un objet stat contenant les statistiques obtenues
   */
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
