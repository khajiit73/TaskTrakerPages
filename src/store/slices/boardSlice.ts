import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../index'; // Import RootState to access Redux state

const API_BASE_URL = 'http://18.188.183.157:5000/api';

export interface Task {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  boardId: number;
  statusId: number;
  assigneeId: string;
  board?: {
    id: number;
    name: string;
    createdAt: string;
  }; // Added to match the API response
}

export interface Board {
  id: number;
  name: string;
  createdAt: string;
  tasks: Task[];
}

interface BoardState {
  boards: Board[];
  loading: boolean;
  error: string | { message: string } | null;
}

const initialState: BoardState = {
  boards: [],
  loading: false,
  error: null,
};

// Helper to get Authorization headers from Redux state
const getAuthHeaders = (state: RootState) => {
  const token = state.auth.token;
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};
// Thunk to fetch user's boards using the /api/task-items/user endpoint
export const fetchBoards = createAsyncThunk('board/fetchBoards', async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState;
    const headers = getAuthHeaders(state);
    const response = await axios.get(`${API_BASE_URL}/task-items/user`, { headers });
    
    // Transform the response into boards with tasks grouped by boardId
    const tasks = response.data as Task[];
    const boardsMap: Record<number, Board> = {};

    tasks.forEach((task) => {
      if (!boardsMap[task.boardId]) {
        boardsMap[task.boardId] = {
          id: task.boardId,
          name: task.board?.name || 'Unnamed Board',
          createdAt: task.board?.createdAt || '',
          tasks: [],
        };
      }
      boardsMap[task.boardId].tasks.push(task);
    });

    return Object.values(boardsMap); // Return boards as an array
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Thunk to create a new board
export const createBoard = createAsyncThunk('board/createBoard', async (name: string, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState;
    const headers = getAuthHeaders(state);
    const response = await axios.post(`${API_BASE_URL}/board`, { name }, { headers });
    return response.data; 
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Boards
      .addCase(fetchBoards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoards.fulfilled, (state, action: PayloadAction<Board[]>) => {
        state.loading = false;
        state.boards = action.payload;
      })
      .addCase(fetchBoards.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Board
      .addCase(createBoard.fulfilled, (state, action: PayloadAction<Board>) => {
        state.boards.push(action.payload); // Add the new board to the list
      });
  },
});

export default boardSlice.reducer;
