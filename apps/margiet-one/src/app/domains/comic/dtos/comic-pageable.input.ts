import { InputType } from '@nestjs/graphql';
import { PageableInput } from '../../../common';

@InputType()
export class ComicPageableInput extends PageableInput {}
