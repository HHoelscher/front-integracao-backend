import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { api } from '../../api';
import { RootState } from '../store';

export type Errand = {
id: string;
title: string;
detail: string;
archived: boolean;
createdAt: string;
};

type CreateErrandDTO = {
    title: string,
    detail: string
}

type User = {
id: string;
name: string;
email: string;
password: string;
errands: Errand[];
};

type ResponseApi = {
ok: boolean;
message: string;
data: User | Errand;
};

type LoginDTO = {
email: string;
password: string;
};

type RegisterDTO = {
email: string;
password: string;
confirmPassword: string;
};

export const LoginAsyncThunk = createAsyncThunk('user/login', async (data: LoginDTO) => {
const response = await api.post<ResponseApi>('/users/login', data);
return response.data;
});

export const RegisterAsyncThunk = createAsyncThunk('user/register', async (data: RegisterDTO) => {
const response = await api.post<ResponseApi>('/users', data);
return response.data;
});

export const ErrandAsyncThunk = createAsyncThunk('user/recados/create', async (data: CreateErrandDTO, {
    getState
}) => {
    const user = (getState() as RootState).user 
const response = await api.post<ResponseApi>(`/users/${user.id}/errands`, data);
return response.data;
});

export const DelErrandAsyncThunk = createAsyncThunk('user/recados/delete', async (errandId: string, {
    getState
}) => {
    const user = (getState() as RootState).user 
const response = await api.delete<ResponseApi>(`/users/${user.id}/errands/${errandId}`);
return response.data;
});

export const EditErrandAsyncThunk = createAsyncThunk('user/recados/edit', async (data: Errand, {
    getState
}) => {
    const user = (getState() as RootState).user 
const response = await api.put<ResponseApi>(`/users/${user.id}/errands/${data.id}`, data);
return data;
});

export const ArchiveErrand = createAsyncThunk('user/recados/archive', async (errand: Errand, {
    getState
}) => {
    const user = (getState() as RootState).user 
const response = await api.post<ResponseApi>(`/users/${user.id}/errands/${errand.id}/archived`);
return errand;
});


const adapter = createEntityAdapter<Errand>({
selectId: errand => errand.id
});



export const userSlice = createSlice({
name: 'User',
initialState: { id: '', name: '', email: '', password: '', errands: adapter.getInitialState() },
reducers: {
    logout: () => {
        return {id: '', name: '', email: '', password: '', errands: adapter.getInitialState()}
    }
},
extraReducers(builder) {
builder.addCase(LoginAsyncThunk.fulfilled, (state, action) => {
    const user = action.payload.data as User;
    state.email = user.email;
    state.id = user.id;
    state.name = user.name;
    state.password = user.password;

    adapter.setAll(state.errands, user.errands);
});

builder.addCase(RegisterAsyncThunk.rejected, () => {
    alert('Credenciais inválidas.');
});

builder.addCase(ErrandAsyncThunk.fulfilled, (state, action) => {
    adapter.addOne(state.errands, action.payload.data as Errand)
})
builder.addCase(DelErrandAsyncThunk.fulfilled, (state, action) => {
    adapter.removeOne(state.errands, action.payload.data.id)
})
builder.addCase(EditErrandAsyncThunk.fulfilled, (state, action) => {
    adapter.updateOne(state.errands, {
        id: action.payload.id,
        changes: action.payload
    })
})
builder.addCase(ArchiveErrand.fulfilled, (state, action) => {
    adapter.updateOne(state.errands, {
        id: action.payload.id,
        changes: {archived: !action.payload.archived }
    })
})
}
});

export const { selectAll } = adapter.getSelectors<RootState>(state => state.user.errands);

export default userSlice.reducer;
export const {logout} = userSlice.actions
