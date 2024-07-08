import { generatePassword } from "./index";
import Fuzz from "jest-fuzz";

const fuzzData = Fuzz.Fuzzer({
  length: Fuzz.int({ min: 0, max: 200 }),
  numbers: Fuzz.bool(),
  lowercase: Fuzz.bool(),
  uppercase: Fuzz.bool(),
  uniqueCharacters: Fuzz.bool(),
  containSpecialCharacters: Fuzz.bool(),
});

Fuzz.test("Fuzz test for generatePassword", fuzzData(), (props: any) => {
  const {
    length,
    numbers,
    lowercase,
    uppercase,
    containSpecialCharacters,
    uniqueCharacters,
  } = props;

  const checks = [
    { enabled: numbers, chars: "0123456789" },
    { enabled: lowercase, chars: "abcdefghijklmnopqrstuvwxyz" },
    { enabled: uppercase, chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" },
    { enabled: containSpecialCharacters, chars: "!@#$%^&*()_+[]{}|;:,.<>?" },
  ];

  let maxLengthForUniqueChars = 0;
  checks.forEach((check) => {
    if (check.enabled) maxLengthForUniqueChars += check.chars.length;
  });

  const notContainConditions =
    !numbers && !lowercase && !uppercase && !containSpecialCharacters;

  const lengthSmallerThanCondition =
    length < numbers + lowercase + uppercase + containSpecialCharacters;

  const lengthBiggerThanUniqueRange =
    length > maxLengthForUniqueChars && uniqueCharacters;

  if (notContainConditions) {
    expect(() => generatePassword(props)).toThrow(
      "At least one character type should be included"
    );
    return;
  }

  if (lengthSmallerThanCondition) {
    expect(() => generatePassword(props)).toThrow(
      "Length cannot be smaller than the number of required conditions"
    );
    return;
  }

  if (lengthBiggerThanUniqueRange) {
    expect(() => generatePassword(props)).toThrow(
      "Length exceeds the number of unique characters available"
    );
    return;
  }

  const password = generatePassword(props);

  expect(password.length).toBe(length);

  checks.forEach((check) => {
    if (check.enabled) {
      expect(
        password.split("").some((char) => check.chars.includes(char))
      ).toBe(true);
    }
  });

  if (uniqueCharacters) {
    const uniqueChars = new Set(password);
    expect(uniqueChars.size).toBe(password.length);
  }
});

describe("generatePassword", () => {
  test("generates password with default settings", () => {
    const password = generatePassword({});
    expect(password).toHaveLength(8);
    expect(/[0-9]/.test(password)).toBe(true);
    expect(/[a-z]/.test(password)).toBe(true);
    expect(/[A-Z]/.test(password)).toBe(true);
    expect(/[!@#$%^&*()_+\[\]{}|;:,.<>?]/.test(password)).toBe(true);
  });

  test("generates password with specified length", () => {
    const length = 12;
    const password = generatePassword({ length });
    expect(password).toHaveLength(length);
  });

  test("generates password with numbers only", () => {
    const password = generatePassword({
      numbers: true,
      lowercase: false,
      uppercase: false,
      containSpecialCharacters: false,
    });
    expect(password).toHaveLength(8);
    expect(/^[0-9]+$/.test(password)).toBe(true);
  });

  test("throws error if no character types are included", () => {
    expect(() => {
      generatePassword({
        numbers: false,
        lowercase: false,
        uppercase: false,
        containSpecialCharacters: false,
      });
    }).toThrow("At least one character type should be included");
  });

  test("throws error if length is smaller than the number of required conditions", () => {
    expect(() => {
      generatePassword({ length: 2, numbers: true, lowercase: true });
    }).toThrow(
      "Length cannot be smaller than the number of required conditions"
    );
  });

  test("generates unique characters in password", () => {
    const password = generatePassword({ length: 8, uniqueCharacters: true });
    const uniqueChars = new Set(password.split(""));
    expect(uniqueChars.size).toBe(password.length);
  });

  test("throws error if unique character length exceeds available characters", () => {
    expect(() => {
      generatePassword({ length: 100, uniqueCharacters: true });
    }).toThrow("Length exceeds the number of unique characters available");
  });

  test("generates password without special characters", () => {
    const password = generatePassword({
      containSpecialCharacters: false,
    });
    expect(password).toHaveLength(8);
    expect(/[!@#$%^&*()_+\[\]{}|;:,.<>?]/.test(password)).toBe(false);
    expect(/[0-9]/.test(password)).toBe(true);
    expect(/[a-z]/.test(password)).toBe(true);
    expect(/[A-Z]/.test(password)).toBe(true);
  });

  test("generates password without uppercase characters", () => {
    const password = generatePassword({
      uppercase: false,
    });
    expect(password).toHaveLength(8);
    expect(/[A-Z]/.test(password)).toBe(false);
    expect(/[0-9]/.test(password)).toBe(true);
    expect(/[a-z]/.test(password)).toBe(true);
    expect(/[!@#$%^&*()_+\[\]{}|;:,.<>?]/.test(password)).toBe(true);
  });

  test("generates password without lowercase characters", () => {
    const password = generatePassword({
      lowercase: false,
    });
    expect(password).toHaveLength(8);
    expect(/[a-z]/.test(password)).toBe(false);
    expect(/[0-9]/.test(password)).toBe(true);
    expect(/[A-Z]/.test(password)).toBe(true);
    expect(/[!@#$%^&*()_+\[\]{}|;:,.<>?]/.test(password)).toBe(true);
  });

  test("generates password with only special characters", () => {
    const password = generatePassword({
      numbers: false,
      lowercase: false,
      uppercase: false,
      containSpecialCharacters: true,
    });
    expect(password).toHaveLength(8);
    expect(/^[!@#$%^&*()_+\[\]{}|;:,.<>?]+$/.test(password)).toBe(true);
  });

  test("generates password with a mix of all character types and unique characters", () => {
    const password = generatePassword({
      length: 10,
      numbers: true,
      lowercase: true,
      uppercase: true,
      containSpecialCharacters: true,
      uniqueCharacters: true,
    });
    const uniqueChars = new Set(password.split(""));
    expect(uniqueChars.size).toBe(password.length);
    expect(/[0-9]/.test(password)).toBe(true);
    expect(/[a-z]/.test(password)).toBe(true);
    expect(/[A-Z]/.test(password)).toBe(true);
    expect(/[!@#$%^&*()_+\[\]{}|;:,.<>?]/.test(password)).toBe(true);
  });
});
