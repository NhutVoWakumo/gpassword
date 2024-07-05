export function generatePassword({
  length = 8,
  numbers = true,
  lowercase = true,
  uppercase = true,
  containSpecialCharacters = true,
  uniqueCharacters = false,
}: {
  length?: number;
  numbers?: boolean;
  lowercase?: boolean;
  uppercase?: boolean;
  containSpecialCharacters?: boolean;
  uniqueCharacters?: boolean;
} = {}): string {
  const numberChars = "0123456789";
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";
  let allChars = "";

  if (numbers) allChars += numberChars;
  if (lowercase) allChars += lowerChars;
  if (uppercase) allChars += upperChars;
  if (containSpecialCharacters) allChars += specialChars;

  if (allChars === "") {
    throw new Error("At least one character type should be included");
  }

  const generateUniquePassword = (length: number, chars: string): string => {
    if (length > chars.length) {
      throw new Error(
        "Length exceeds the number of unique characters available"
      );
    }

    const charArray = chars.split("");
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charArray.length);
      password += charArray.splice(randomIndex, 1);
    }
    return password;
  };

  const generateRandomPassword = (length: number, chars: string): string => {
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
    return password;
  };

  return uniqueCharacters
    ? generateUniquePassword(length, allChars)
    : generateRandomPassword(length, allChars);
}
