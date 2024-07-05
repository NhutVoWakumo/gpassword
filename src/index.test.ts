import { generatePassword } from "./index";

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
});