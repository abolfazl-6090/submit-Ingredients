import React from 'react';

import './IngredientList.css';

const IngredientList = props => {






  return (
    <section className="ingredient-list">
      <h2>Loaded Ingredients</h2>
      <ul>
        {props.ingredients.map(ig => (
          <li style={{
            cursor: 'pointer'
          }} key={ig.id} onClick={props.onremoveIngredient.bind(null, ig.id)} >
            <span>{ig.title}</span>
            <span>{ig.amount}x</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IngredientList;
