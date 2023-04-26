// AllUsers.js
import { api } from '../../api/api';
import { useState, useEffect } from 'react';
import { Pagination } from '../../components/Pagination/Pagination';
import { Button, Typography } from '@mui/material';
import style from './style.module.css';

export function AllUsers() {
  const [users, setUsers] = useState([]);
  const [number, setNumber] = useState(0);

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
    },
  };

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await api.get(`/users?since=${number}`, axiosConfig);

        setUsers((prevUsers) => [...prevUsers, ...response.data]);
        setNumber(response.data[response.data.length - 1].id);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers([]);
  });

  return (
    <>
      <div className={style.container}>
        <Typography variant="h3" align="center">
          USERS
        </Typography>
        <Pagination
          itemsPerPage={10}
          data={users}
          renderItem={(user) => (
            <>
              <Typography variant="body1" align="center">
                {' '}
                LOGIN: {user.login} - ID: {user.id} -{' '}
                <Button
                  color="error"
                  variant="outlined"
                  size="small"
                  href={`/users/${user.login}`}
                >
                  more details
                </Button>
              </Typography>
              <Button onClick={() => setNumber(number + 1)}></Button>
            </>
          )}
        />
      </div>
    </>
  );
}
