export const useGenerateRandomUser = ()=> {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const minLength = 8;
    const maxLength = 16;
    const length = Math.floor(Math.random() * (maxLength - minLength + 1) + minLength);
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      result += alphabet[randomIndex];
    }
    return {
        result
    };
  }