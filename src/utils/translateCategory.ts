const translateCategory = (category: string): string => {
  const categoryTranslations: Record<string, string> = {
    painting: '그림',
    music: '음악',
    exercise: '운동',
    cooking: '요리',
    game: '게임',
    movie: '영화',
  };

  return categoryTranslations[category] || category;
};

export default translateCategory;
