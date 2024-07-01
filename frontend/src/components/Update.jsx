import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState(0);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    const getSingleUser = async () => {
        try {
            const response = await fetch(`http://localhost:4000/${id}`);
            const result = await response.json();
            if (!response.ok) {
                console.log(result.error);
                setError(result.error);
            } else {
                setName(result.name);
                setEmail(result.email);
                setAge(result.age);
                setError("");
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            setError("Error fetching user");
        }
    };

    useEffect(() => {
        getSingleUser();
    }, []);

    const handleEdit = async (e) => {
        e.preventDefault();
        const updatedUser = { name, email, age };
        try {
            const response = await fetch(`http://localhost:4000/${id}`, {
                method: "PATCH", // Use PUT or PATCH for updating
                body: JSON.stringify(updatedUser),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            if (!response.ok) {
                console.log(result.error);
                setError(result.error);
            } else {
                setName("");
                setEmail("");
                setAge("");
                setError("");
                navigate("/all");
            }
        } catch (error) {
            console.error("Error updating user:", error);
            setError("Error updating user");
        }
    };

    return (
        <div className="container my-2">
            {error && <div className="alert alert-danger">{error}</div>}
            <h2 className="text-center">Edit the Data</h2>
            <form onSubmit={handleEdit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input
                        type="number"
                        className="form-control"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Update;
