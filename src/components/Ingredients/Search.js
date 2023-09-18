import React, { useRef, useState, useEffect } from 'react';
import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {

  const [enteredFilter, setEnteredFilter] = useState('');
  const { onLoadIngredients,update } = props;
  const inputRef = useRef()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current.value === enteredFilter) {
        const query = enteredFilter.length === 0 ? '' :
          `?orderBy="title"&equalTo="${enteredFilter}"`;
        fetch('https://nonesense-burger-default-rtdb.firebaseio.com/ingredients.json' + query)
          .then(response => response.json())
          .then(responseData => {
            const loadedIngredients = [];
            for (const key in responseData) {
              loadedIngredients.push({
                id: key,
                title: responseData[key].title,
                amount: responseData[key].amount
              });
            }
            onLoadIngredients(loadedIngredients);
          })
      }
    }, 500)

    return () => {
      clearTimeout(timer)
    }

  }, [enteredFilter, onLoadIngredients,update]);


  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input ref={inputRef} type="text" value={enteredFilter} onChange={(event) => { setEnteredFilter(event.target.value) }} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
