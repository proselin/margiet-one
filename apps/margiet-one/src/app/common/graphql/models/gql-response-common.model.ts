import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GqlResponseInterface } from '../interfaces';

/**
 * The common response of whole project
 */
@ObjectType({ isAbstract: true })
export abstract class GqlResponseCommonModel implements GqlResponseInterface {
  /**
   * represent as http code of response maybe 400, 500 ,...
   * @see HTTPStatus
   */
  @Field(() => Int, { nullable: false })
  code: number;


  /**
   * Message error or just a warning or something else =)))
   */
  @Field(() => String, { nullable: false })
  message: string;

  @Field(() => String, { nullable: false })
  status: string;
}
