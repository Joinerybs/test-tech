import { IsString, IsNotEmpty, IsOptional, IsEnum, IsArray, MinLength } from 'class-validator';

/**
 * Énumération des statuts qu'une tâche peut avoir
 */
export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
}

/**
 * Énumération des niveaux de priorité possibles
 */
export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}