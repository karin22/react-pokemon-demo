import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ItemList } from "@/types/index.interface";
import type { RootState } from "store/index";

interface FavoriteState {
  favoriteList: ItemList[];
}

const initialState: FavoriteState = {
  favoriteList: [],
};

export const favoritePokemon = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<ItemList>) => {
      state.favoriteList = [...state.favoriteList, action.payload];
    },
    deFavorite: (state, action: PayloadAction<ItemList>) => {
      state.favoriteList = state.favoriteList.filter(
        (i) => i.pokemon.name !== action.payload.pokemon.name
      );
    },
    clearFavorite: (state) => {
      state.favoriteList = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addFavorite, deFavorite, clearFavorite } =
  favoritePokemon.actions;

export const favoriteList = (state: RootState) =>
  state.favoriteStore.favoriteList;

export default favoritePokemon.reducer;
