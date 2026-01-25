import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import type { CreateTaskDto, UpdateTaskDto } from './task.interface';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  /**
   * Récupère la liste des tâches (avec filtre optionnel par statut).
   * @param {string} status - Statut pour filtrer les tâches
   */
  @Get()
  async getAllTasks(@Query('status') status?: string) {
    if (status) {
      return await this.tasksService.getTasksByStatus(status);
    }
    return await this.tasksService.getAllTasks();
  }

  /**
   * Retourne les statistiques consolidées des tâches.
   */
  @Get('statistics')
  async getStatistics() {
    return await this.tasksService.getStatistics();
  }

  /**
   * Récupère une tâche spécifique par son identifiant unique.
   * @param {string} id - L'identifiant (UUID ou MongoDB ID) de la tâche.
   * @returns {Promise<Task>} La tâche trouvée
   * @throws {HttpException} Lance une erreur si la tâche n'existe pas
   */
  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    const task = await this.tasksService.getTaskById(id);
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  /**
   * Crée une nouvelle tâche après validation du titre.
   * @param {CreateTaskDto} createTaskDto - Les données nécessaires à la création
   * @returns {Promise<Task>} La tâche nouvellement créée
   * @throws {HttpException} Lance une erreur si le titre est manquant dans le corps de la requête.
   */
  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    if (!createTaskDto.title) {
      throw new HttpException('Title is required', HttpStatus.BAD_REQUEST);
    }
    return await this.tasksService.createTask(createTaskDto);
  }

  /**
   * Met à jour les informations d'une tâche existante
   * @param {string} id - L'identifiant de la tâche à modifier
   * @param {UpdateTaskDto} updateTaskDto - Les champs à mettre à jour
   * @returns {Promise<Task>} La tâche après modification
   * @throws {HttpException} Erreur si la tâche à modifier n'a pas été trouvée
   */
  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const task = await this.tasksService.updateTask(id, updateTaskDto);
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  /**
   * Supprime une tâche de la base de données
   * @param {string} id - L'identifiant de la tâche à supprimer
   * @returns {Promise<{ message: string }>} Le message de confirmation de suppression
   * @throws {HttpException} L'erreur si la tâche n'a pas pu être supprimée
   */
  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    const deleted = await this.tasksService.deleteTask(id);
    if (!deleted) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Task deleted successfully' };
  }
}
