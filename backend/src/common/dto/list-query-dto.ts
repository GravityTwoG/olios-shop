import { Type } from 'class-transformer';
import { IsNumber, Max, Min } from 'class-validator';

export class ListQueryDTO {
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @Max(1000)
  take: number;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  skip: number;
}
