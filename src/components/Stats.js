export default function Stats({ items }) {

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
                    </>}
            </em>
        </footer>
    );
}
