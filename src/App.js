import { useState } from "react";

// /* eslint-disable */


let initialItems = [
  { id: 1, description: "Passports", quantity: 1, packed: false },
  { id: 2, description: "show money", quantity: "30k", packed: false },
  { id: 3, description: "Laptop", quantity: 1, packed: true },
  { id: 4, description: "Phone", quantity: 1, packed: true },
  // { id: 5, description: "Programming Skill", quantity: "10+", packed: true },
];

export default function App() {

  const [items, setItems] = useState(initialItems);

  function handleAddItems(item) {
    setItems(items => [...items, item]);
  }

  function handleDeleteItem(id) {
    console.log(id)
    setItems(items => items.filter(i => i.id !== id));
  }

  return <div>
    <Logo />
    <Form onAddItem={handleAddItems} />
    <PackageList onDelete={handleDeleteItem} items={items} />
    <Stats />
  </div>
}



function Logo() {
  return <h1>🛫 Road to Thailand 💻 </h1>;
}

function Form({ onAddItem }) {

  const [description, setDescription] = useState('opps');
  const [quantity, setQuantity] = useState(2);


  function SubmitHandle(e) {
    e.preventDefault();

    if (!description) return;
    const newItem = {
      description,
      quantity,
      package: false,
      id: Date.now()
    };


    onAddItem(newItem);

    setDescription('');
    setQuantity(1);

    // initialItems.push()
  }

  return (
    <form className="add-form" onSubmit={SubmitHandle}>
      <h3>What do you need for your Thailand trip.</h3>
      <select value={quantity} onChange={e => setQuantity(q => Number(e.target.value))}>
        {
          Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
            <option value={num} key={num} >
              {num}
            </option>
          ))
        }
      </select>
      <input type="text" placeholder="Item . . ." value={description} onChange={(e) => setDescription(s => e.target.value)} />
      <button> Add </button>
    </form>
  )
}


function PackageList({ items, onDelete }) {
  return (
    <div className="list">
      <ul >
        {items.map((item) => (
          <Item item={item} key={item.id} onDeleteItem={onDelete} />
        ))}
      </ul>
    </div>
  )
}

function Item({ item, onDeleteItem }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span >
      <button onClick={() => onDeleteItem(item.id)}> ❌ </button>
    </li>
  )
}

function Stats() {
  return (
    <footer className="stats">
      <em>
        You have X items on your list, and you already packed X (X%)
      </em>
    </footer>
  )
}
