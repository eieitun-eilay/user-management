import * as React from 'react';
import {useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {db} from '../firebase-config';
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, } from "firebase/firestore";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Swal from 'sweetalert2';
import Modal from '@mui/material/Modal';
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';
import { useAppStore } from '../appStore';
// import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



export default function EmployeeListPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const empCollectionRef = collection(db,'employeelist');
  const [open, setOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  const [formid, setFormid] = useState("");
  const handleOpen = () => setOpen(true);
  const handleEditOpen = () => setEditOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEditOpen(false);
  const setRows = useAppStore((state) => state.setRows);
  const rows = useAppStore((state) => state.rows);
  


 

  useEffect(() =>{
    getUsers();
  },[]);

  
  // useEffect(() =>{
  //   axios.get().then(
  //     (response) => {
  //       setRows(response.data);
  //     }
  //   )
  // },[]);


  const getUsers = async() => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
  
  
  };



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "warning",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confrimButtonText: "Yes, delete it!",
    }).then((result) => {
      if(result.value){
        deleteApi(id);
      }
    });
  }

  const deleteApi = async(id) =>{
    const userDoc = doc(db,"employeelist",id);
    await deleteDoc(userDoc);
    Swal.fire("Delete!", "Your file has been deleted", "success");
    getUsers();
  };

  const filterData = (v) => {
    if(v){
      setRows([v]);
    }else{
      setRows([]);
      getUsers();
    }
    };

  
  
  const editData = (id, name, email, role) =>{
    const data = {
       id: id,
       name: name,
       email: email,
       role: role
    };
    setFormid(data);
    handleEditOpen();
  };
  

  return (
    <>
      <div>
        <Modal
          open={open}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
             <AddEmployee closeEvent={handleClose} />
          </Box>
        </Modal>
        <Modal
          open={editopen}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
             <EditEmployee closeEvent={handleEditClose} fid={formid} />
          </Box>
        </Modal>
      </div>
      { rows.length >0 && (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Typography
          variant="h5"
          component="div"
          sx={{ padding: "20px" }}
          gutterBottom
        >
          Employee List
        </Typography>
        <Divider />
        <Box height={5} />
        <Stack direction="row" spacing={2} className="my-2 mb-2" sx={{ paddingY: 1, paddingRight: 3, paddingLeft: 2}}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={rows}
            sx={{ width: 200, height: 70 }}
            onChange={(e, v) => filterData(v)}
            getOptionLabel={(rows) => rows.name || ""}
            renderInput={(params) => (
              <TextField {...params} label="Search Employee" />
            )}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>

          <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleOpen} sx={{ width: 100, height: 50 }}>
            Add
          </Button>
        </Stack>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ minWidth: "100px",backgroundColor: "#c5c5e3"}}>
                  Name
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px",backgroundColor: "#c5c5e3" }}>
                  Email
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px",backgroundColor: "#c5c5e3" }}>
                  Role
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px",backgroundColor: "#c5c5e3" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
                      <TableCell key={`name-${row.id}`} align="left">
                        {row.name}
                      </TableCell>
                      <TableCell key={`email-${row.id}`} align="left">
                        {row.email}
                      </TableCell>
                      <TableCell key={`role-${row.id}`} align="left">
                        {row.role}
                      </TableCell>
                      <TableCell key={`action-${row.id}`} align="left">
                        {row.action}
                        <Stack spacing={2} direction="row">
                          <EditIcon
                            style={{
                              fontSize: "20px",
                              color: "blue",
                              cursor: "pointer",
                            }}
                            className="cursor-pointer"
                            onClick={() => { editData(row.id, row.name, row.email, row.role)}}
                          />
                          <DeleteIcon
                            style={{
                              fontSize: "20px",
                              color: "darkred",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              deleteUser(row.id);
                            }}
                          />
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      )}
      
      
    </>
  );
}