const initialItems = [
  { id: 1, description: "Passports", quantity: 1, packed: false },
  { id: 2, description: "show money", quantity: "30k baht", packed: false },
  { id: 3, description: "Laptop", quantity: 1, packed: true },
  { id: 3, description: "Phone", quantity: 1, packed: true },
  { id: 3, description: "Programming Skill", quantity: "10+", packed: true },
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
  return (
    <div className="add-form">
      <h3>What do you need for your Thailand trip.</h3>
    </div>
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
