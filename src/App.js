import { useState } from "react";

// /* eslint-disable */


const initialItems = [
  { id: 1, description: "Passports", quantity: 1, packed: false },
  { id: 2, description: "show money", quantity: "30k", packed: false },
  { id: 3, description: "Laptop", quantity: 1, packed: true },
  { id: 4, description: "Phone", quantity: 1, packed: true },
  // { id: 5, description: "Programming Skill", quantity: "10+", packed: true },
];

export default function App() {
  return <div>
    <Logo />
    <Form />
    <PackageList />
    <Stats />
  </div>
}



function Logo() {
  return <h1>🛫 Road to Thailand 💻 </h1>;
}

function Form() {

  const [description, setDescription] = useState('opps');
  const [quantity, setQuantity] = useState(2);

  function SubmitHandle(e) {
    e.preventDefault();

    const newItem = {
      description,
      quantity,
      package: false,
      id: Date.now()
    };

    console.log(newItem);
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


function PackageList() {
  return (
    <div className="list">
      <ul >
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  )
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span >
      <button> ❌ </button>
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
