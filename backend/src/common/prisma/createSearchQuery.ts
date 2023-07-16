export const createSearchQuery = (fieldName: string, query: string) => {
  const formatted = query.split(' ').join(' | ');

  return [
    { [fieldName]: { contains: query, mode: 'insensitive' } },
    { [fieldName]: { search: formatted, mode: 'insensitive' } },
  ];
};
