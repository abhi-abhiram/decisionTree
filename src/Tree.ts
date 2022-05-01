export interface TreeProps {
  name: string;
  answerFieldType: "dropdown" | "multipleChoice";
  question: string;
  answers?: string[];
  children?: TreeProps[];
}

const Tree: TreeProps = {
  name: "root",
  answerFieldType: "dropdown",
  question: "what is your fav colour?",
  answers: ["blue", "green", "yellow"],
  children: [
    {
      name: "blue",
      answerFieldType: "dropdown",
      question: "your fav color is blue",
      answers: ["black", "pink", "red"],
      children: [
        {
          name: "black",
          answerFieldType: "dropdown",
          question: "your fav color is blue",
          answers: ["black", "pink", "red"],
        },
        {
          name: "pink",
          answerFieldType: "dropdown",
          question: "your fav color is green",
        },
        {
          name: "red",
          answerFieldType: "dropdown",
          question: "your fav color is yello",
        },
      ],
    },
    {
      name: "green",
      answerFieldType: "dropdown",
      question: "your fav color is green",
      answers: ["blue", "green", "yellow"],
      children: [
        {
          name: "black",
          answerFieldType: "multipleChoice",
          question: "your fav color is blue",
          answers: ["black", "pink", "red"],
        },
      ],
    },
    {
      name: "yellow",
      answerFieldType: "dropdown",
      question: "your fav color is yello",
    },
  ],
};

export default Tree;
