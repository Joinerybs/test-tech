import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

/**
 * DTO pour la mise à jour d'une tâche
 * Utilise PartialType pour rendre tous les champs de CreateTaskDto optionnels
 * en conservant les règles de validation que la création d'une tâche
 */
export class UpdateTaskDto extends PartialType(CreateTaskDto) {}