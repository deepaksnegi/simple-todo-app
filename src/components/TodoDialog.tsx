import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Todo } from "../api/todoApis";

interface TodoDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (todo: Omit<Todo, "id">) => void;
  initialData?: Omit<Todo, "id"> | null;
}

const TodoDialog: React.FC<TodoDialogProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [todo, setTodo] = useState(initialData?.todo || "");
  const [completed, setCompleted] = useState(initialData?.completed || false);
  const [userId, setUserId] = useState(initialData?.userId || 1);

  useEffect(() => {
    if (initialData) {
      setTodo(initialData.todo);
      setCompleted(initialData.completed);
      setUserId(initialData.userId);
    }
  }, [initialData]);

  const handleSubmit = () => {
    onSubmit({ todo, completed, userId });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? "Update Todo" : "Add New Todo"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Todo"
          type="text"
          fullWidth
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <TextField
          margin="dense"
          label="User ID"
          type="number"
          fullWidth
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
          }
          label="Completed"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          {initialData ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TodoDialog;
