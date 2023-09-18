import React, { useReducer, useCallback, useState, useMemo, useEffect } from 'react';
import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import useHttp from './hooks/http';


const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients
    case 'ADD':
      return [...currentIngredients, action.ingredients]
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id)
    default: throw new Error('Should not get there!')
  }
};


/////////////////////////////////////////////////////////////////////////////////////////////////////
function Ingredients() {

  const [motherIng, dispatch] = useReducer(ingredientReducer, [])

  const {
    isLoading,
    error,
    data,
    sendRequest,
  } = useHttp();
const [updateIng, setUpdateIng] = useState(false)
  console.log(data);
useEffect(()=>{ setUpdateIng(true)},[data])

  

  const addIngredientsHandler = useCallback((ingredients) => {
    sendRequest('Your url ', 'POST', JSON.stringify(ingredients))
  }, [])

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    dispatch({ type: 'SET', ingredients: filteredIngredients })

  }, [])

  const removeIngredientHandler = useCallback(ingredientId => {

    sendRequest(`Your url`, 'DELETE', null)

  }, [])

  const clearError = useCallback(() => {
    //  
  }, [])

  const ingredientList = useMemo(() => <IngredientList onremoveIngredient={removeIngredientHandler} ingredients={motherIng} />, [motherIng, removeIngredientHandler])


  return (
    <div className="App">

      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm loading={isLoading} onIngredients={addIngredientsHandler} />

      <section>

        <Search update={updateIng} onLoadIngredients={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;