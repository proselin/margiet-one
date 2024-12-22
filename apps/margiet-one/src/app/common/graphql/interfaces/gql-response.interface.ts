import { Field, Int, InterfaceType } from '@nestjs/graphql';

/**
 * The common response of whole project
 */
@InterfaceType({ isAbstract: true })
export abstract class GqlResponseInterface {
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
