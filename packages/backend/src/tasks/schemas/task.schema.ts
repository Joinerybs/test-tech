import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type TaskDocument = Task & Document;

@Schema({ 
    timestamps: true,
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
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ default: 'todo' })
  status: string;

  @Prop({default: 'medium'})
  priority: string;

  @Prop([String]) // Ici je créé un tableau de chaînes de caractères pour la partie tags
  tags: string[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);