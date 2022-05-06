export interface TreeProps {
  name: string;
  answerFieldType: "multipleChoice" | "textarea" | "searchBox" | "inputBox";
  question: string;
  answers?: string[];
  children?: TreeProps[];
}

const Tree: TreeProps = {
  name: "node 1",
  answerFieldType: "inputBox",
  question: "What is your username?",
  children: [
    {
      name: "node 2",
      answerFieldType: "multipleChoice",
      question: "Determine category",
      answers: [
        "I am having trouble with my account",
        "I am having trouble with an application",
        "I am having trouble with my device",
      ],
      children: [
        {
          name: "node 3",
          answerFieldType: "textarea",
          question: "end node",
        },
        {
          name: "node 4",
          answerFieldType: "searchBox",
          question: "What is the name of the application?",
          answers: ["outlook", "gmail", "facebook"],
          children: [
            {
              name: "node 6",
              answerFieldType: "multipleChoice",
              question: "Select the problem you are facing",
              answers: ["I am not recieving emails", "outlook won't start"],
              children: [
                {
                  name: "node 7",
                  answerFieldType: "multipleChoice",
                  question: "Restart Device, Did this solve the problem?",
                  answers: ["Yes", "No"],
                  children: [
                    {
                      name: "node 8",
                      answerFieldType: "textarea",
                      question: "end",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "node 5",
          answerFieldType: "textarea",
          question: "end node",
        },
      ],
    },
  ],
};

export default Tree;
