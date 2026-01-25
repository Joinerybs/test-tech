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

  @Get()
  async getAllTasks(@Query('status') status?: string) {
    if (status) {
      return await this.tasksService.getTasksByStatus(status);
    }
    return await this.tasksService.getAllTasks();
  }

  @Get('statistics')
  async getStatistics() {
    return await this.tasksService.getStatistics();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    const task = await this.tasksService.getTaskById(id);
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    if (!createTaskDto.title) {
      throw new HttpException('Title is required', HttpStatus.BAD_REQUEST);
    }
    return await this.tasksService.createTask(createTaskDto);
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const task = await this.tasksService.updateTask(id, updateTaskDto);
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    const deleted = await this.tasksService.deleteTask(id);
    if (!deleted) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Task deleted successfully' };
  }
}
