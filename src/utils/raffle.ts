const shuffle = (element: string[]): string[] => {
  for (let i = element.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [element[i], element[j]] = [element[j], element[i]];
  }
  return element;
};

export { shuffle };
