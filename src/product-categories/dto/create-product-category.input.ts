import { IsOptional, IsString } from 'class-validator';

export class CreateProductCategoryInput {
  @IsString()
  name: string;

  @IsOptional()
  iconFile?: any;
}
