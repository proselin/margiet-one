import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'recipe' })
export class Recipe {
  @Field(type => ID)
  id: string;

  @Field({ nullable: true })
  description?: string;

  @Field(type => [String])
  ingredients: string[];
}
