import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    async function getData() {
        try {
            const response = await fetch("http://localhost:4000"); // Make sure the server is running on port 4000
            const result = await response.json(); // Correctly parse the response as JSON

            if (!response.ok) {
                console.log(result.error);
                setError(result.error);
            } else {
                setData(result);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Error fetching data");
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/${id}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            if (!response.ok) {
                console.log(result.error);
                setError(result.error);
            } else {
                setError("Data deleted successfully");
                setTimeout(() => {
                    setError("");
                    getData();
                }, 2000);
            }
        } catch (error) {
            console.error("Error deleting data:", error);
            setError("Error deleting data");
        }
    };

    useEffect(() => {
        getData();
    }, []); // Add an empty dependency array to run the effect only once

    return (
        <div className="container my-2">
            {error && <div className={`alert ${error.includes("successfully") ? "alert-success" : "alert-danger"}`}>{error}</div>}
            <h2 className="text-container">All Data</h2>
            <div className="row">
                {data && data.map((ele) => (
                    <div key={ele._id} className="col-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{ele.name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                                <p className="text-muted">{ele.age}</p>
                                <Link  className="card-link" onClick={() => handleDelete(ele._id)}>Delete</Link>
                                <Link to={`/${ele._id}`} className="card-link">Edit</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div> 
        </div>
    );
};

export default Read;
