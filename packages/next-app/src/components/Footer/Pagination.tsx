export default function Pagination() {
    return(
        <div className="join">
            <button className="join-item btn">&laquo;</button>
            <button className="join-item btn">&lt;</button>
            <button className="join-item btn">1</button>
            <button className="join-item btn">2</button>
            <button className="join-item btn">3</button>
            <button className="join-item btn btn-disabled">...</button>
            <button className="join-item btn">99</button>
            <button className="join-item btn">100</button>
            <button className="join-item btn">101</button>
            <button className="join-item btn">&gt;</button>
            <button className="join-item btn">&raquo;</button>
        </div>
    )
}