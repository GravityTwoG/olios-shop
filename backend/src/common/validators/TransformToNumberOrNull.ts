import { Transform } from 'class-transformer';

export function TransformToNumberOrNull() {
  return Transform(({ value }) => {
    if (value === 'null') {
      return null;
    }
    return Number(value);
  });
}
