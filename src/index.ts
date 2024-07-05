interface IGeneratePasswordProps {
  length?: number;
  numbers?: boolean;
  lowercase?: boolean;
  uppercase?: boolean;
  containSpecialCharacters?: boolean;
  uniqueCharacters?: boolean;
}

const shuffle = (str: string): string => {
  const arr = str.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
};

export const generatePassword = ({
  length = 8,
  numbers = true,
  lowercase = true,
  uppercase = true,
  containSpecialCharacters = true,
  uniqueCharacters = false,
}: IGeneratePasswordProps = {}): string => {
  const numberChars = "0123456789";
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";
  let allChars = "";
  let requiredChars = "";
  let minChars = 0;

  if (numbers) {
    allChars += numberChars;
    requiredChars +=
      numberChars[Math.floor(Math.random() * numberChars.length)];
    minChars++;
  }
  if (lowercase) {
    allChars += lowerChars;
    requiredChars += lowerChars[Math.floor(Math.random() * lowerChars.length)];
    minChars++;
  }
  if (uppercase) {
    allChars += upperChars;
    requiredChars += upperChars[Math.floor(Math.random() * upperChars.length)];
    minChars++;
  }
  if (containSpecialCharacters) {
    allChars += specialChars;
    requiredChars +=
      specialChars[Math.floor(Math.random() * specialChars.length)];
    minChars++;
  }

  if (allChars === "") {
    throw new Error("At least one character type should be included");
  }

  if (length < minChars) {
    throw new Error(
      "Length cannot be smaller than the number of required conditions"
    );
  }

  let remainingChars = allChars
    .split("")
    .filter((char) => !requiredChars.includes(char))
    .join("");

  const generateUniquePassword = (length: number, chars: string): string => {
    if (length > chars.length + requiredChars.length) {
      throw new Error(
        "Length exceeds the number of unique characters available"
      );
    }

    let charArray = chars.split("");
    let password = requiredChars;
    for (let i = minChars; i < length; i++) {
      let randomIndex = Math.floor(Math.random() * charArray.length);
      let randomChar = charArray.splice(randomIndex, 1);
      password += randomChar;
    }
    return shuffle(password);
  };

  const generateRandomPassword = (length: number, chars: string): string => {
    let password = requiredChars;
    for (let i = minChars; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
    return shuffle(password);
  };

  return uniqueCharacters
    ? generateUniquePassword(length, remainingChars)
    : generateRandomPassword(length, allChars);
};
