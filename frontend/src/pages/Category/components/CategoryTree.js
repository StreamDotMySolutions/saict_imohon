import React from 'react';

function CategoryTree({ data, parent_id = null }) {
  const filteredCategories = data.filter((category) => category.parent_id === parent_id);

  if (filteredCategories.length === 0) {
    // No more subcategories at this level
    return null;
  }

  return (
    <ul>
      {filteredCategories.map((category) => (
        <li key={category.id}>
          {category.name}
          <CategoryTree data={data} parent_id={category.id} />
        </li>
      ))}
    </ul>
  );
}

function MyComponent({ data }) {
  return (
    <CategoryTree data={data} />
  );
}

export default MyComponent;
