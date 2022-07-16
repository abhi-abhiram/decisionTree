import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  AlertIcon,
  Alert,
  AlertDialogHeader,
} from "@chakra-ui/react";

export enum status {
  SUCCESS = "success",
  Error = "error",
}

interface props {
  showFeedBack: boolean;
  setFeedBack: React.Dispatch<React.SetStateAction<boolean>>;
  messageObj: {
    status: status;
    message: string;
  };
}

const FeedBack = ({ showFeedBack, setFeedBack, messageObj }: props) => {
  const onClose = () => setFeedBack(false);
  return (
    <AlertDialog
      isOpen={showFeedBack}
      onClose={onClose}
      leastDestructiveRef={undefined}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader margin={"auto"}>
            {messageObj.status}
          </AlertDialogHeader>
          <AlertDialogBody>
            <Alert status={messageObj.status}>
              <AlertIcon />
              {messageObj.message}
            </Alert>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button colorScheme="red" onClick={onClose} ml={3}>
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default FeedBack;
