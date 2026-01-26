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

/**
 * Schéma de validation pour la création d'une tâche.
 */
export class CreateTaskDto {
  /**
   * Titre de la tâche (Minimum 3 caractères).
   */
  @IsString({ message: 'Le titre doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le titre est obligatoire' })
  @MinLength(3, { message: 'Le titre doit faire au moins 3 caractères' })
  title: string;

  /**
   * Description détaillée des travaux à réaliser.
   */
  @IsString({ message: 'La description doit être une chaîne de caractères' })
  @IsOptional()
  description?: string;

  /**
   * État d'avancement de la tâche.
   * @default 'todo'
   */
  @IsEnum(TaskStatus, { message: 'Statut invalide (valeurs possibles: todo, in-progress, done)' })
  @IsOptional()
  status?: string;

  /**
   * Degré d'urgence de la tâche.
   * @default 'medium'
   */
  @IsEnum(TaskPriority, { message: 'Priorité invalide (valeurs possibles: low, medium, high)' })
  @IsOptional()
  priority?: string;

  /**
   * Liste de labels pour catégoriser la tâche.
   */
  @IsArray({ message: 'Les tags doivent être un tableau de chaînes' })
  @IsString({ each: true, message: 'Chaque tag doit être une chaîne de caractères' })
  @IsOptional()
  tags?: string[];
}