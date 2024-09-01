export default function FilterNavbar() {
    return (
        <div className="flex flex-row justify-between">
            <div className="flex flex-row join">
                <select className="select select-bordered rounded-none w-24">
                    <option>12</option>
                    <option>24</option>
                    <option>48</option>
                    <option>96</option>
                </select>
                <select className="select select-bordered max-w-xs rounded-none">
                    <option>Best Seller</option>
                    <option>Latest</option>
                    <option>Oldest</option>
                    <option>High - Low Price</option>
                    <option>Low - High Price</option>
                </select>
            </div>
            <div className="join">
                <button className="join-item btn btn-outline">«</button>
                <input type="text" value={1} className="input w-20 btn-outline rounded-none text-center" />
                <button className="join-item btn btn-outline">»</button>
            </div>
        </div>
    )
}