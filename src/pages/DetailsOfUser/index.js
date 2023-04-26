import { api } from '../../api/api';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import style from './style.module.css';

export function DetailsOfUser() {
  const [userData, setUserData] = useState([]);
  const { username } = useParams();
  const date = new Date(userData.created_at);
  const formattedDate = date.toLocaleString();

  // Define a configuração do axios com o cabeçalho Authorization
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
    },
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/users/${username}`, axiosConfig);

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
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="200"
            image={userData.avatar_url}
            alt="avatar"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {userData.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <p> Login: {userData.login}</p>
              <p>ID: {userData.id}</p>
              <p>Profile: {userData.html_url}</p>
              <p>User since: {formattedDate}</p>
            </Typography>
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
                href={`/users/${username}/repos`}
              >
                Repositories
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
