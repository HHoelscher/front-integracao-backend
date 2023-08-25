import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  DelErrandAsyncThunk,
  EditErrandAsyncThunk,
  Errand,
  ErrandAsyncThunk,
  logout,
  selectAll
} from '../../store/modules/UserSlice';
import User from '../types/User';
import { ArchiveCheckbox } from './ArchiveCheckbox';

const List: React.FC = () => {
  const [logged, setLogged] = useState<User | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const user = useAppSelector(state => state.user);
  const errands = useAppSelector(selectAll);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user.id) {
      navigate('/');
    }
  }, [user]);

  function addErrand() {
    dispatch(
      ErrandAsyncThunk({
        title,
        detail: description
      })
    );

    setTitle('');
    setDescription('');
  }

  function deleteErrand(id: string) {
    dispatch(DelErrandAsyncThunk(id));
  }

  function editErrand(errand: Errand) {
    const newTitle: string = prompt('Informe o novo título: ') || errand.title;

    const newDescription: string = prompt('Informe a nova descrição:') || errand.detail;

    dispatch(
      EditErrandAsyncThunk({
        ...errand,
        title: newTitle,
        detail: newDescription
      })
    );
  }

  function deslogar() {
    dispatch(logout());
    navigate('/');
  }

  return (
    <>
      <div>
        <Button type="button" variant="contained" color="error" size="small" onClick={deslogar}>
          Sair
        </Button>
      </div>
      <br />
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            addErrand();
          }}
        >
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Descrição" />
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Detalhamento"
          />
          <Button type="submit" variant="contained" color="info" size="small">
            Salvar
          </Button>
        </form>
      </div>
      <div>
        <br />
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Descrição</th>
              <th>Detalhamento</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {errands.map((errand, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{errand.title}</td>
                <td>{errand.detail}</td>
                <td>
                  <Button
                    color="warning"
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteErrand(errand.id)}
                  >
                    Apagar
                  </Button>
                  <Button color="primary" size="small" endIcon={<SendIcon />} onClick={() => editErrand(errand)}>
                    Editar
                  </Button>
                  <ArchiveCheckbox errand={errand} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default List;
