import React, { memo } from 'react';
import { useState } from 'react';
import Card from '../UI/Card';
import './IngredientForm.css';
import LoadingIndicator from '../UI/LoadingIndicator';


const IngredientForm = props => {

  const submitHandler = event => {
    event.preventDefault();
    props.onIngredients({ title, amount })
    // ...
  };

  const [title, setTitle] = useState('none')
  const [amount, setAmount] = useState(0)


  return (

    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" value={title} onChange={(event) => setTitle(event.target.value)} />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" value={amount} onChange={(event) => setAmount(event.target.value)} />
          </div>
        
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
};

export default memo(IngredientForm) ;
