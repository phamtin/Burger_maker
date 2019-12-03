import * as actionTypes from "../actions/actionType";

const PRICE_INGREDIENT = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.5,
  meat: 1.3
};
const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const burgerBuilderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + PRICE_INGREDIENT[action.ingredientName],
        building: true
      };
    case actionTypes.REMOVE_INGREDIENT:
      if (state.ingredients[action.ingredientName] >= 1) {
        return {
          ...state,
          ingredients: {
            ...state.ingredients,
            [action.ingredientName]:
              state.ingredients[action.ingredientName] - 1
          },
          totalPrice:
            state.totalPrice - PRICE_INGREDIENT[action.ingredientName],
          building: true
        };
      } else return state;
    case actionTypes.SET_INGREDIENT:
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false,
        building: false
      };
    case actionTypes.FETCH_INGREDIENT_FAILED:
      return {
        ...state,
        error: true
      };

    default:
      return state;
  }
};

export default burgerBuilderReducer;
