import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type TaskDocument = Task & Document;

/**
 * Schéma qui représente une tâche dans la base de données.
 */
@Schema({ 
    timestamps: true, //Mangodb génère les dates tout seul
    toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      delete ret._id; // Ligne nécessaire afin de s'assurer que l'id que l'on envoi et celui que Mongodb a sont les mêmes
      return ret;
    },
  },
 })

export class Task {
  /** Titre de la tâche - Obligatoire */
  @Prop({ required: true })
  title: string;

  /** Description de la tâche */
  @Prop()
  description: string;

  /** Statut de la tâche*/
  @Prop({ default: 'todo' })
  status: string;

  /** Niveau de priorité de la tâche*/
  @Prop({default: 'medium'})
  priority: string;

  /** Liste associés à la tâche */
  @Prop([String]) // Ici je créé un tableau de chaînes de caractères pour la partie tags
  tags: string[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);