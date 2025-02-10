import "./Card.css";

export const Card = ({ title, amount, data, type }) => {
    return (
        <div className={`card ${type}`}>
            <h2>{title}</h2>
            <p className="total-amount">₹{amount.toFixed(2)}</p>
            <div className="category-breakdown">
                <h3>Category Breakdown:</h3>
                <ul>
                    {data.map((item, index) => (
                        <li key={index}>
                            {item.category}: ₹{item.amount.toFixed(2)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
