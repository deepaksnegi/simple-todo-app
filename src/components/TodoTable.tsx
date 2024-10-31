import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  Todo,
} from "../api/todoApis";
import { Paper, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TodoDialog from "./TodoDialog";
import DeleteDialog from "./DeleteDialog";
import CustomTable from "./table/CustomTable";

type Pagination = {
  page: number;
  rowsPerPage: number;
};
const TodoTable = () => {
  const queryClient = useQueryClient();

  const [pagination, setPagination] = useState<Pagination>({
    page: 0,
    rowsPerPage: 10,
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [deleteTodoId, setDeleteTodoId] = useState<number | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["todos", pagination.page, pagination.rowsPerPage],
    queryFn: () =>
      fetchTodos(
        pagination.rowsPerPage,
        pagination.page * pagination.rowsPerPage
      ),
  });

  const addMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleAddClick = () => {
    setSelectedTodo(null);
    setDialogOpen(true);
  };

  const handleEditClick = (todo: Todo) => {
    setSelectedTodo(todo);
    setDialogOpen(true);
  };

  const handleDialogSubmit = (todoData: Omit<Todo, "id">) => {
    if (selectedTodo) {
      updateMutation.mutate(selectedTodo);
    } else {
      addMutation.mutate(todoData);
    }
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPagination({ ...pagination, page: newPage });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPagination({
      ...pagination,
      page: 0,
      rowsPerPage: parseInt(event.target.value, 10),
    });
  };

  const handleConfirmDelete = () => {
    if (deleteTodoId !== null) {
      deleteMutation.mutate(deleteTodoId);
    }
    setDeleteTodoId(null);
  };

  const handleDeleteClick = (id: number) => {
    setDeleteTodoId(id);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data</p>;

  return (
    <Paper sx={{ marginTop: "2.5rem" }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircleIcon />}
        onClick={handleAddClick}
        style={{ float: "right", margin: "0.7rem", padding: "0.5rem" }}
      >
        Add New Todo
      </Button>
      <CustomTable
        todos={data.todos}
        total={data.total}
        page={pagination.page}
        handleChangePage={handleChangePage}
        rowsPerPage={pagination.rowsPerPage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
      />
      <TodoDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
        onSubmit={handleDialogSubmit}
        initialData={selectedTodo}
        key={selectedTodo?.id}
      />

      <DeleteDialog
        open={deleteTodoId !== null}
        handleConfirmDelete={handleConfirmDelete}
        handleCancel={() => setDeleteTodoId(null)}
      />
    </Paper>
  );
};

export default TodoTable;
