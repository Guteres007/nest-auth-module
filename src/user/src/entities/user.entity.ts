import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql'
import { Permission } from '@app/auth/enums/permission.enum'

export type UserDocument = User & Document

@Schema({ timestamps: true })
@ObjectType()
@Directive('@key(fields: "id")')
export class User extends Document {
  @Field(() => ID)
  id: number

  @Prop({ type: String, required: true })
  @Field(() => String)
  email: string

  @Prop({ type: String, required: true })
  @Field(() => String)
  name: string

  @Prop({ type: String, required: true })
  @Field(() => String, { nullable: true })
  password: string

  @Prop({ type: [String], default: [Permission.ALL] })
  @Field(() => [String], { nullable: true })
  permission: string[]
}

export const UserSchema = SchemaFactory.createForClass(User)
