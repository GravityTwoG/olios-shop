import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';
import { IsNullable } from 'src/common/validators/IsNullable';

export class CreateProductCategoryDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsInt()
  @IsNullable()
  @Transform(({ value }) => {
    if (value === 'null') {
      return null;
    }
    return Number(value);
  })
  parentId: number | null;
}
