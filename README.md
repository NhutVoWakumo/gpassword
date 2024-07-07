# generatePassword Function

This repository contains a function `generatePassword` which generates a password based on various criteria.

## Installation

To use the `generatePassword` function in your project, first install the required packages:

```sh
npm install gpassword
```

## Usage

To use the `generatePassword` function, import it into your project as follows:

```typescript
import { generatePassword } from "gpassword";
```

### Function Parameters

The `generatePassword` function accepts an object with the following optional properties:

| Prop                      | Type    | Description                                                  | Default Value |
|---------------------------|---------|--------------------------------------------------------------|---------------|
| `length`                  | number  | Length of the generated password                             | 8             |
| `numbers`                 | boolean | Include numbers in the password                              | true          |
| `lowercase`               | boolean | Include lowercase letters in the password                    | true          |
| `uppercase`               | boolean | Include uppercase letters in the password                    | true          |
| `containSpecialCharacters`| boolean | Include special characters in the password                   | true          |
| `uniqueCharacters`        | boolean | Ensure all characters in the password are unique             | false         |

### Example Usage

Here are some examples of how to use the `generatePassword` function:

```typescript
// Generate a default password
const password1 = generatePassword({});
console.log(password1); // Example output: aB1@cD2#

// Generate a password with specified length
const password2 = generatePassword({ length: 12 });
console.log(password2); // Example output: aB1@cD2#eF3$

// Generate a password with only numbers
const password3 = generatePassword({
  numbers: true,
  lowercase: false,
  uppercase: false,
  containSpecialCharacters: false,
});
console.log(password3); // Example output: 12345678

// Generate a password with unique characters
const password4 = generatePassword({ length: 10, uniqueCharacters: true });
console.log(password4); // Example output: aB1@cD2#eF
```

## Test Coverage

The function is thoroughly tested to cover various scenarios:

| Test Case | Description |
|-----------|-------------|
| Default settings | Generates a password with length 8, including numbers, lowercase, uppercase, and special characters |
| Specified length | Generates a password with a specified length |
| Numbers only | Generates a password containing only numbers |
| No character types | Throws an error if no character types are included |
| Length smaller than conditions | Throws an error if the length is smaller than the number of required conditions |
| Unique characters | Generates a password with unique characters |
| Exceeding unique length | Throws an error if the unique character length exceeds available characters |
| No special characters | Generates a password without special characters |
| No uppercase characters | Generates a password without uppercase characters |
| No lowercase characters | Generates a password without lowercase characters |
| Only special characters | Generates a password containing only special characters |
| Mix with unique characters | Generates a password with a mix of all character types and unique characters |

To run the tests, use the following command:

```sh
npm run test
```

This will execute all the test cases and verify the functionality of the `generatePassword` function.
