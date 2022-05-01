import { Select } from "@chakra-ui/react";

interface props {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  answers?: string[];
  ans: string;
}

const SelectOptions: React.FC<props> = ({ answers, setValue, ans }) => {
  return (
    <Select
      placeholder="Select option"
      minW="2rem"
      minH="3rem"
      colorScheme="green"
      defaultValue={ans}
      onChange={(e) => setValue(e.target.value)}
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
