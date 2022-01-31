import React, { useState } from "react";

export const Export = () => {
    const [posting, setPosting] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();

        setPosting(true);

        window.open(`/api/stock/csv`, "_blank");

        setPosting(false);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <p style={{ marginBottom: 8 }}>
                    Downloads all "Frames" to a CSV file.
                </p>

                <input
                    type="submit"
                    value={posting ? "Working..." : "Download CSV"}
                />
            </form>
        </>
    );
};
