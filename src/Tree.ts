export interface TreeProps {
  name: string;
  answerFieldType: "multipleChoice" | "textarea" | "searchBox" | "inputBox";
  question: string;
  answers?: string[];
  children?: TreeProps[];
}

const Tree: TreeProps = {
  name: "root",
  answerFieldType: "inputBox",
  question: "What is your username?",
  children: [],
};

export default Tree;
