import {
  ExternalLinkIcon,
  EditIcon,
  DeleteIcon,
  CopyIcon,
} from '@chakra-ui/icons';
import {
  Tr,
  Td,
  Editable,
  EditableInput,
  EditablePreview,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from '.';
import { changeTreeName } from '../../api/manageTreeApis';

interface Props {
  value: {
    _id: string;
    treeName: string;
    createdAt: string;
    updatedAt: string;
    isCollection?: boolean;
  };
  onClickEditBtn: () => Promise<void>;
  onClickDeleteBtn: () => Promise<void>;
  onClickQuesBtn: () => Promise<void>;
  onClickCloneBtn: () => Promise<void>;
}

const TableRow: React.FC<Props> = ({ value, ...props }) => {
  const [isLoading, setLoading] = useState({
    isLoadingEditBtn: false,
    isLoadingQuesBtn: false,
    isLoadingCloneBtn: false,
  });
  const navigateTo = useNavigate();

  return (
    <Tr>
      <Td textAlign='center'>
        <Editable defaultValue={value.treeName}>
          <EditablePreview />
          <EditableInput
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                changeTreeName(value._id, e.currentTarget.value);
              }
            }}
          />
        </Editable>
      </Td>
      <Td textAlign='center'>{new Date(value.createdAt).toDateString()}</Td>
      <Td textAlign='center'>{new Date(value.updatedAt).toDateString()}</Td>
      <Td>
        <CustomButton
          icon={<ExternalLinkIcon />}
          aria-label='display questions'
          variant='outline'
          onClick={() => {
            setLoading({ ...isLoading, isLoadingQuesBtn: true });
            props.onClickQuesBtn().then(() => {
              setLoading({ ...isLoading, isLoadingQuesBtn: false });
              navigateTo('/tree');
            });
          }}
          isLoading={isLoading.isLoadingQuesBtn}
          isDisabled={Boolean(
            isLoading.isLoadingEditBtn || isLoading.isLoadingQuesBtn
          )}
        />
      </Td>
      <Td>
        <CustomButton
          icon={<EditIcon />}
          aria-label='edit'
          variant='outline'
          onClick={() => {
            setLoading({ ...isLoading, isLoadingEditBtn: true });

            props.onClickEditBtn().then(() => {
              setLoading({ ...isLoading, isLoadingEditBtn: false });
              navigateTo('/build-tree');
            });
          }}
          isLoading={isLoading.isLoadingEditBtn}
          isDisabled={Boolean(
            isLoading.isLoadingEditBtn || isLoading.isLoadingQuesBtn
          )}
        />
      </Td>
      <Td>
        <CustomButton
          icon={<DeleteIcon color='red.400' />}
          aria-label='delete'
          variant='outline'
          onClick={() => {
            props.onClickDeleteBtn().then(() => {});
          }}
          isDisabled={Boolean(
            isLoading.isLoadingEditBtn || isLoading.isLoadingQuesBtn
          )}
        />
      </Td>
      <Td>
        <CustomButton
          icon={<CopyIcon />}
          aria-label='clone'
          variant='outline'
          onClick={() => {
            setLoading({ ...isLoading, isLoadingCloneBtn: true });
            props.onClickCloneBtn().then(() => {
              setLoading({ ...isLoading, isLoadingCloneBtn: false });
              window.location.reload();
            });
          }}
          isLoading={isLoading.isLoadingCloneBtn}
          isDisabled={Boolean(
            isLoading.isLoadingEditBtn || isLoading.isLoadingQuesBtn
          )}
        />
      </Td>
    </Tr>
  );
};

export default TableRow;
