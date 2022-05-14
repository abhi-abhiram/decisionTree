export type answerFields =
  | "multipleChoice"
  | "textarea"
  | "searchBox"
  | "inputBox";

export interface TreeProps {
  name: string;
  answerFieldType: answerFields;
  question: string;
  answers?: string[];
  children?: TreeProps[];
}

const Tree: TreeProps = {
  name: "",
  answerFieldType: "inputBox",
  question: "",
  answers: [],
  children: [],
};

export const answerFields: string[] = [
  "multipleChoice",
  "textarea",
  "searchBox",
  "inputBox",
];

export default Tree;
