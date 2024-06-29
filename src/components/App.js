import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackageList from "./PackageList";
import Stats from "./Stats";

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




