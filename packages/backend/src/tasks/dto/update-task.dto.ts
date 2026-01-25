import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

// PartialType va reprendre toutes les règles de CreateTaskDto mais les rendre optionnelles (grace à PartialType)
export class UpdateTaskDto extends PartialType(CreateTaskDto) {}