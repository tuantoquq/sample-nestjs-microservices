import { AbstractDocument } from '@app/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class UserDocument extends AbstractDocument {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ type: [String], default: [] })
  roles?: string[];
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
