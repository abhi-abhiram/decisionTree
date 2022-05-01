import { Select } from "@chakra-ui/react";

interface props {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  answers?: string[];
  disable: boolean;
}

const SelectOptions: React.FC<props> = ({ answers, setValue, disable }) => {
  return (
    <Select
      placeholder="Select option"
      minW="2rem"
      minH="3rem"
      colorScheme="green"
      onChange={(e) => setValue(e.target.value)}
      disabled={disable}
    >
      {answers?.map((ans, index) => (
        <option value={ans} key={index}>
          {ans}
        </option>
      ))}
    </Select>
  );
};

export default SelectOptions;
