import { useState } from "react";

export default function Form({ onAddItem }) {

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