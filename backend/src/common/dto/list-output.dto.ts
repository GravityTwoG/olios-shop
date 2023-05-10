export interface ListOutputDTO<T> {
  // Add this decorators to your actual class
  // @IsNumber()
  // @ApiProperty()
  count: number;

  // @IsArray()
  // @Type(() => T) // T is class or enum here
  // @ApiProperty({ isArray: true, type: () => T })
  list: T[];
}
