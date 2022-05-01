import { Textarea } from "@chakra-ui/react";

interface props {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  disable: boolean;
}

const TextArea: React.FC<props> = ({ setValue, disable }) => {
  return (
    <Textarea
      onChange={(e) => setValue(e.target.value)}
      disabled={disable}
      size={"md"}
    />
  );
};

export default TextArea;
