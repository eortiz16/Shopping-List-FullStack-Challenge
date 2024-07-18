// mock/shoppingList.js

const shoppingList = [
  {
    id: 1,
    name: 'Vegan Burgers',
    description: 'Plant-based burger patties',
    quantity: Math.floor(Math.random() * 3) + 1,
    purchased: false,
  },
  {
    id: 2,
    name: 'Hot Dog Buns',
    description: 'Whole wheat hot dog buns',
    quantity: Math.floor(Math.random() * 3) + 1,
    purchased: false,
  },
  {
    id: 3,
    name: 'Portobello Mushrooms',
    description: 'Fresh Portobello mushrooms for grilling',
    quantity: Math.floor(Math.random() * 3) + 1,
    purchased: false,
  },
  {
    id: 4,
    name: 'Bell Peppers',
    description: 'Mixed color bell peppers for skewers',
    quantity: Math.floor(Math.random() * 3) + 1,
    purchased: false,
  },
  {
    id: 5,
    name: 'Zucchini',
    description: 'Fresh zucchini for grilling',
    quantity: Math.floor(Math.random() * 3) + 1,
    purchased: false,
  },
  {
    id: 6,
    name: 'Corn on the Cob',
    description: 'Sweet corn on the cob',
    quantity: Math.floor(Math.random() * 3) + 1,
    purchased: false,
  },
  {
    id: 7,
    name: 'Vegan Sausages',
    description: 'Plant-based sausages',
    quantity: Math.floor(Math.random() * 3) + 1,
    purchased: false,
  },
  {
    id: 8,
    name: 'Avocados',
    description: 'Fresh avocados for guacamole',
    quantity: Math.floor(Math.random() * 3) + 1,
    purchased: false,
  },
  {
    id: 9,
    name: 'Chickpeas',
    description: 'Canned chickpeas for salad',
    quantity: Math.floor(Math.random() * 3) + 1,
    purchased: false,
  },
  {
    id: 10,
    name: 'Tomatoes',
    description: 'Fresh tomatoes for salad and burgers',
    quantity: Math.floor(Math.random() * 3) + 1,
    purchased: true, // Only this item is purchased
  },
];

export default shoppingList;
