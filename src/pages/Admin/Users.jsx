import Layout from './../../component/Layout/Layout';
import AdminMenu from './../../component/Layout/AdminMenu';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Spinner from '../../component/Spinner';
import { Box, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

const Users = () => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [loading, setLoading] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [visibleDelete, setVisibleDelete] = useState(false);
    const [selectedDeleteId, setSelectedDeleteId] = useState("");
    const [deleteName, setDeleteName] = useState("");
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [selectedEditId, setSelectedEditId] = useState("");
    const [editName, setEditName] = useState("");
    const [editRole, setEditRole] = useState("");
    const [roleError, setRoleError] = useState("");

    const getAllUser = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${baseUrl}/api/v1/auth/all-user`);
            setAllUsers(data);
        } catch (error) {
            toast.error("Something Went Wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllUser();
    }, []);

    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(`${baseUrl}/api/v1/auth/delete-user/${selectedDeleteId._id}`);
            if (data?.success) {
                toast.success(`${deleteName} is deleted`);
                setVisibleDelete(false);
                getAllUser();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong while deleting the user");
        }
    };

    const handleEdit = async () => {
        if (editRole <= 1) {
            try {
                const { data } = await axios.put(`${baseUrl}/api/v1/auth/update-user/${selectedEditId._id}`, { role: editRole });
                if (data?.success) {
                    toast.success(`${editName} is updated`);
                    setVisibleEdit(false);
                    getAllUser();
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error("Something went wrong while editing the user");
            }
        } else {
            setRoleError("Role is required");
        }
    };

    return (
        <Layout title={"Users Admin Dashboard"}>
            {loading ? (
                <Spinner />
            ) : (
                <Container maxWidth="lg" sx={{ mt: 4 }}>
                    <Box sx={{ display: 'flex' }}>
                        <AdminMenu />
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h4" component="h1" gutterBottom>
                                Admin Users List
                            </Typography>
                            <Paper sx={{ p: 2 }}>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Username</TableCell>
                                                <TableCell>Email</TableCell>
                                                <TableCell>Position</TableCell>
                                                <TableCell>Country</TableCell>
                                                <TableCell>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {allUsers.map((user) => (
                                                <TableRow key={user._id}>
                                                    <TableCell>
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <img
                                                                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                                                alt={user.name}
                                                                style={{ width: 40, height: 40, borderRadius: '50%' }}
                                                            />
                                                            <Typography sx={{ ml: 2 }}>{user.name}</Typography>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>{user.email}</TableCell>
                                                    <TableCell>{user.role}</TableCell>
                                                    <TableCell>{user.country}</TableCell>
                                                    <TableCell>
                                                        <IconButton
                                                            color="primary"
                                                            onClick={() => {
                                                                setVisibleEdit(true);
                                                                setEditName(user.name);
                                                                setSelectedEditId(user);
                                                                setEditRole(user.role);
                                                            }}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            color="secondary"
                                                            onClick={() => {
                                                                setVisibleDelete(true);
                                                                setDeleteName(user.name);
                                                                setSelectedDeleteId(user);
                                                            }}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Box>
                    </Box>
                </Container>
            )}

            <Dialog open={visibleDelete} onClose={() => setVisibleDelete(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete {deleteName}?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setVisibleDelete(false)}>No</Button>
                    <Button onClick={handleDelete} color="error">Yes</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={visibleEdit} onClose={() => setVisibleEdit(false)}>
                <DialogTitle>Update User Role</DialogTitle>
                <DialogContent>
                    <Typography>Change Role for {editName}</Typography>
                    <TextField
                        label="Role"
                        type="number"
                        inputProps={{ min: 0, max: 1 }}
                        value={editRole}
                        onChange={(e) => setEditRole(e.target.value)}
                        fullWidth
                        error={Boolean(roleError)}
                        helperText={roleError}
                        sx={{ mt: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setVisibleEdit(false)}>Cancel</Button>
                    <Button onClick={handleEdit} color="primary">Update</Button>
                </DialogActions>
            </Dialog>
        </Layout>
    );
};

export default Users;
