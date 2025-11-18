import constructorReducer, {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from './constructorSlice';
import { TIngredient } from '@utils-types';

const mockBun: TIngredient = {
  _id: 'bun-1',
  name: 'Test Bun',
  type: 'bun',
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 100,
  price: 200,
  image: 'bun.jpg',
  image_large: 'bun-large.jpg',
  image_mobile: 'bun-mobile.jpg'
};

const mockIngredient: TIngredient = {
  _id: 'ingredient-1',
  name: 'Test Ingredient',
  type: 'main',
  proteins: 15,
  fat: 10,
  carbohydrates: 5,
  calories: 50,
  price: 100,
  image: 'ingredient.jpg',
  image_large: 'ingredient-large.jpg',
  image_mobile: 'ingredient-mobile.jpg'
};

describe('burgerConstructor reducer', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  it('should return initial state', () => {
    expect(constructorReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should handle addBun', () => {
    const action = addBun(mockBun);
    const state = constructorReducer(initialState, action);

    expect(state.bun).toEqual(mockBun);
    expect(state.ingredients).toEqual([]);
  });

  it('should handle addIngredient', () => {
    const action = addIngredient(mockIngredient);
    const state = constructorReducer(initialState, action);

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toMatchObject({
      ...mockIngredient,
      id: expect.any(String)
    });
    expect(state.bun).toBeNull();
  });

  it('should handle removeIngredient', () => {
    const addAction = addIngredient(mockIngredient);
    let state = constructorReducer(initialState, addAction);

    const ingredientId = state.ingredients[0].id;
    const removeAction = removeIngredient(ingredientId);
    state = constructorReducer(state, removeAction);

    expect(state.ingredients).toHaveLength(0);
  });

  it('should handle moveIngredient', () => {
    const ingredient1: TIngredient = {
      ...mockIngredient,
      _id: 'ingredient-1'
    };
    const ingredient2: TIngredient = {
      ...mockIngredient,
      _id: 'ingredient-2'
    };

    const addAction1 = addIngredient(ingredient1);
    let state = constructorReducer(initialState, addAction1);
    const addAction2 = addIngredient(ingredient2);
    state = constructorReducer(state, addAction2);

    expect(state.ingredients[0]._id).toBe('ingredient-1');
    expect(state.ingredients[1]._id).toBe('ingredient-2');

    const moveAction = moveIngredient({ fromIndex: 0, toIndex: 1 });
    state = constructorReducer(state, moveAction);

    expect(state.ingredients[0]._id).toBe('ingredient-2');
    expect(state.ingredients[1]._id).toBe('ingredient-1');
  });

  it('should handle clearConstructor', () => {
    const addBunAction = addBun(mockBun);
    const addIngredientAction = addIngredient(mockIngredient);

    let state = constructorReducer(initialState, addBunAction);
    state = constructorReducer(state, addIngredientAction);

    expect(state.bun).not.toBeNull();
    expect(state.ingredients).not.toHaveLength(0);

    const clearAction = clearConstructor();
    state = constructorReducer(state, clearAction);

    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(0);
  });
});
