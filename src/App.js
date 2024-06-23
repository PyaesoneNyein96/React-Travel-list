import { useState } from "react";

// /* eslint-disable */


// let initialItems = [
//   { id: 1, description: "Passports", quantity: 1, packed: false },
//   { id: 2, description: "show money", quantity: "30k", packed: false },
//   { id: 3, description: "Laptop", quantity: 1, packed: true },
//   { id: 4, description: "Phone", quantity: 1, packed: true },
//   // { id: 5, description: "Programming Skill", quantity: "10+", packed: true },
// ];

export default function App() {

  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems(items => [...items, item]);
  }

  function handleDeleteItem(id) {
    // console.log(id)
    setItems(items => items.filter(i => i.id !== id));
  }

  function handleToggle(id) {
    setItems(items => items.map(i => i.id === id ? { ...i, packed: !i.packed } : i));
  }

  function clearList() {
    if (items.length !== 0) {
      const confirm = window.confirm('Are you sure!');
      if (confirm) setItems([]);
    }
    // if (confirm) console.log(items.length);
  }

  return <div>
    <Logo />
    <Form onAddItem={handleAddItems} />
    <PackageList onDelete={handleDeleteItem} items={items} handleToggle={handleToggle} clearList={clearList} />
    <Stats items={items} />
  </div>
}



function Logo() {
  return <h1>🛫 Road to Thailand 💻 </h1>;
}

function Form({ onAddItem }) {

  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);


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
  }

  return (
    <form className="add-form" onSubmit={SubmitHandle}>
      <h3>What do you need for your Thailand trip.</h3>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {
          Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
            <option value={num} key={num} >
              {num}
            </option>
          ))
        }
      </select>
      <input type="text" placeholder="Item . . ." value={description} onChange={e => setDescription(e.target.value)} />
      <button> Add </button>
    </form>
  )
}


function PackageList({ items, onDelete, handleToggle, clearList }) {

  const [sortBy, setSortBy] = useState("input");


  let sortedItems;

  if (sortBy === 'input') sortedItems = items;
  if (sortBy === 'description') {
    sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
  }

  if (sortBy === 'packed') sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));


  return (
    <div className="list">
      <ul >
        {sortedItems.map((item) => (
          <Item item={item} onDeleteItem={onDelete} handleToggle={handleToggle} key={item.id} />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} >
          <option value="input" > - Sort by input order </option>
          <option value='description' > - Sort by description </option>
          <option value='packed' > - Sort by packed status </option>

        </select>

        <button onClick={clearList}> Clear List</button>

      </div>


    </div>
  )
}

function Item({ item, onDeleteItem, handleToggle }) {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() => handleToggle(item.id)} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span >
      <button onClick={() => onDeleteItem(item.id)}> ❌ </button>
    </li>
  )
}

function Stats({ items }) {

  if (items.length === 0) return (<p className="stats"> <em>Start adding some items to your packing list.</em> </p>);

  let packed = items.filter((i) => {
    return i.packed;
  }).length;

  let percentage = Math.round(packed / items.length * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100 ? "You got everything! ready to go." :
          <>
            You have <span style={{ 'color': 'green' }}> {items.length} </span>
            items on your list, and you already packed <span style={{ 'color': 'blue' }}> {packed} </span>
            {/* ({(packed / items.length * 100).toFixed(2)}%) */}
            ({percentage} %)
          </>
        }
      </em>
    </footer >
  )
}
