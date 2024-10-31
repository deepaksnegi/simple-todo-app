import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import StyledTableCell from "./StyledCell";
import StyledTableRow from "./StyledTableRow";
import { Todo } from "../../api/todoApis";

type Props = {
  todos: Todo[];
  total: number;
  page: number;
  rowsPerPage: number;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => void;

  handleChangeRowsPerPage: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;

  handleEditClick: (todo: Todo) => void;
  handleDeleteClick: (id: number) => void;
};

const CustomTable = (props: Props) => {
  const {
    todos,
    total,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleEditClick,
    handleDeleteClick,
  } = props;
  return (
    <>
      <TableContainer>
        <Table aria-label="todo table" stickyHeader>
          <TableHead style={{ backgroundColor: "#f5f5f5" }}>
            <TableRow hover>
              <StyledTableCell>
                <strong>Task ID </strong>
              </StyledTableCell>
              <StyledTableCell>
                <strong>Todo </strong>
              </StyledTableCell>
              <StyledTableCell>
                <strong>Completed </strong>
              </StyledTableCell>
              <StyledTableCell>
                <strong>User ID </strong>
              </StyledTableCell>
              <StyledTableCell>
                <strong>Actions </strong>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo: Todo) => (
              <StyledTableRow key={todo.id}>
                <TableCell>{todo.id}</TableCell>
                <TableCell>{todo.todo}</TableCell>
                <TableCell>{todo.completed ? "Yes" : "No"}</TableCell>
                <TableCell>{todo.userId}</TableCell>
                <TableCell>
                  <Tooltip title="Edit Todo" arrow>
                    <IconButton
                      onClick={() => handleEditClick(todo)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Todo" arrow>
                    <IconButton
                      onClick={() => handleDeleteClick(todo.id)}
                      color="secondary"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default CustomTable;
