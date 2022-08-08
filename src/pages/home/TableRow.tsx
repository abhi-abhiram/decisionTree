import { ExternalLinkIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Tr, Td } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from '.';

interface Props {
  value: {
    _id: string;
    treeName: string;
    createdAt: string;
    updatedAt: string;
  };
  onClickEditBtn: () => Promise<void>;
  onClickDeleteBtn: () => Promise<void>;
  onClickQuesBtn: () => Promise<void>;
}

const TableRow: React.FC<Props> = ({ value, ...props }) => {
  const [isLoading, setLoading] = useState({
    isLoadingEditBtn: false,
    isLoadingQuesBtn: false,
  });
  const navigateTo = useNavigate();

  return (
    <Tr>
      <Td textAlign="center">{value.treeName}</Td>
      <Td textAlign="center">{new Date(value.createdAt).toDateString()}</Td>
      <Td textAlign="center">{new Date(value.updatedAt).toDateString()}</Td>
      <Td>
        <CustomButton
          icon={<ExternalLinkIcon />}
          aria-label="display questions"
          variant="outline"
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
          aria-label="edit"
          variant="outline"
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
          icon={<DeleteIcon color="red.400" />}
          aria-label="delete"
          variant="outline"
          onClick={() => {
            props.onClickDeleteBtn().then(() => {});
          }}
          isDisabled={Boolean(
            isLoading.isLoadingEditBtn || isLoading.isLoadingQuesBtn
          )}
        />
      </Td>
    </Tr>
  );
};

export default TableRow;
