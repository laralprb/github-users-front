import { api } from '../../api/api';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Button,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Table,
  TableBody,
  Typography,
} from '@mui/material';
import style from './style.module.css';

export function ReposOfUser() {
  const [userData, setUserData] = useState([]);
  const { username } = useParams();
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
    },
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/users/${username}/repos`, axiosConfig);

        setUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  });

  return (
    <>
      <div className={style.container}>
        <Typography variant="h3">REPOSITORIES</Typography>
        <p>
          <>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>NAME</TableCell>
                    <TableCell>URL</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userData.map((repo) => (
                    <TableRow
                      key={repo.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {repo.id}
                      </TableCell>
                      <TableCell align="left">{repo.name}</TableCell>
                      <TableCell align="left">
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {repo.html_url}
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        </p>
        <div className={style.button}>
          <Button
            size="small"
            color="error"
            variant="contained"
            href={`/users`}
          >
            Home
          </Button>
          <Button
            size="small"
            color="error"
            variant="contained"
            href={`/users/${username}`}
          >
            User details
          </Button>
        </div>
      </div>
    </>
  );
}
