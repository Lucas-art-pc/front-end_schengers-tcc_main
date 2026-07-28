export const nameFormat = (form) => {
  
  const lowercaseWords = ["de", "da", "do", "das", "dos", "e"];

  console.log(form)

  const words = form.trim().toLowerCase().split(/\s+/);

  const formatted = words.map((word, index) => {
    if (index > 0 && lowercaseWords.includes(word)) {
      return word;
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return formatted.join(" ");

};