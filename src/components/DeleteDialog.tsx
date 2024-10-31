import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

type Props = {
  open: boolean;
  handleConfirmDelete: () => void;
  handleCancel: () => void;
};

const DeleteDialog = (props: Props) => {
  const { open, handleConfirmDelete, handleCancel } = props;
  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this To-Do item? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleConfirmDelete} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
