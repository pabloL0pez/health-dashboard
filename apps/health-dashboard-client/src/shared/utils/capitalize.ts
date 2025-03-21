export const capitalize = (str: string): string => {
  const words = str.split(' ');
  const capitalizedWords = words.map((word) => {
    const firstLetter = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1);
    return firstLetter.concat(restOfWord);
  });
  
  return capitalizedWords.join(' ');
};