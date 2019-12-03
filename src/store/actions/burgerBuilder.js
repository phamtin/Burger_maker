import * as actionType from "./actionType";
import instance from "firebase/axios-order";

export const addIngredient = name => {
  return {
    type: actionType.ADD_INGREDIENT,
    ingredientName: name
  };
};

export const removeIngredient = name => {
  return {
    type: actionType.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

export const setIngredients = ingredients => {
  return {
    type: actionType.SET_INGREDIENT,
    ingredients: ingredients
  };
};

export const fetchIngredientsFailed = error => {
  return {
    type: actionType.FETCH_INGREDIENT_FAILED,
    error: error
  };
};

export const initalIngredients = () => {
  return dispatch => {
    instance
      .get("/Ingredients.json")
      .then(res => {
        dispatch(setIngredients(res.data));
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed(error));
      });
  };
};
