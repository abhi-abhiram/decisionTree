import { Input } from "@chakra-ui/react";

interface props {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  disable: boolean;
}

const InputBox: React.FC<props> = ({ setValue, disable }) => {
  return (
    <Input
      onChange={(e) => setValue(e.target.value)}
      disabled={disable}
      size={"md"}
    />
  );
};

export default InputBox;
