export interface IGeneratePasswordProps {
  length?: number;
  lowercase?: boolean;
  uppercase?: boolean;
  containNumbers?: boolean;
  containSpecialCharacters?: boolean;
  uniqueCharacters?: boolean;
}

export const generatePassword = (props: IGeneratePasswordProps) => {
  const {
    length = 8,
    lowercase = false,
    uppercase = false,
    containNumbers = true,
    containSpecialCharacters = true,
    uniqueCharacters = false,
  } = props;

  return Math.random();
};
