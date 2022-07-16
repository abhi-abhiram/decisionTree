import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { RawNodeDatum } from 'react-d3-tree/lib/types/common';
import validateTree from '../utils/validateTre';
import ShowErrors from './ShowErrors';
import SaveNewTree from './SaveNewTree';
import axios from 'axios';
import FeedBack, { status } from './AlertDialog';
import quesTree from '../../../Tree';

interface props {
  devTree: RawNodeDatum;
  treeId: string;
}

let ErrorMessages: string[] = [];

const messageObj = { status: status.SUCCESS, message: '' };

const SubmitAction = ({ devTree, treeId }: props) => {
  const [showModel, setShowModel] = useState(false);
  const [showFeedBack, setFeedBack] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Button
        position={'absolute'}
        bottom="50px"
        right="50px"
        isLoading={loading}
        onClick={() => {
          setShowModel(true);
          ErrorMessages = validateTree();
          if (treeId && ErrorMessages.length === 0) {
            setLoading(true);
            setShowModel(false);
            axios
              .post('/api/updateTree', {
                treeId,
                devTree,
                quesTree,
              })
              .then(({ data }) => {
                if (data.success === true) {
                  messageObj.status = status.SUCCESS;
                } else {
                  messageObj.status = status.Error;
                }
                messageObj.message = data.message;
                setLoading(false);
                setFeedBack(true);
              });
          }
        }}
      >
        {treeId ? 'Update' : 'Save'}
      </Button>
      {ErrorMessages.length === 0 ? (
        treeId ? (
          <>
            <FeedBack
              messageObj={messageObj}
              setFeedBack={setFeedBack}
              showFeedBack={showFeedBack}
            />
          </>
        ) : (
          <SaveNewTree {...{ showModel, setShowModel }} devTree={devTree} />
        )
      ) : (
        <ShowErrors
          {...{ showModel, setShowModel }}
          ErrorMessages={ErrorMessages}
        />
      )}
    </>
  );
};

export default SubmitAction;
