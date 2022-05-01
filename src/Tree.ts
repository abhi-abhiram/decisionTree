export interface TreeProps {
  name: string;
  answerFieldType: "multipleChoice" | "textarea";
  question: string;
  answers?: string[];
  children?: TreeProps[];
}

const Tree: TreeProps = {
  name: "root",
  answerFieldType: "multipleChoice",
  question: "What is your favourite color?",
  answers: ["Blue", "Green", "Red"],
  children: [
    {
      name: "blue",
      answerFieldType: "textarea",
      question: "Ok, You like blue. Why you like blue?",
    },
    {
      name: "green",
      answerFieldType: "textarea",
      question: "Ok, You like green. Why you like green?",
    },
    {
      name: "red",
      answerFieldType: "textarea",
      question: "Ok, You like red. Why you like red?",
    },
  ],
};

export default Tree;
