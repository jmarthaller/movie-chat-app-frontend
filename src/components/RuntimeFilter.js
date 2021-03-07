import React from 'react';



function RuntimeFilter({ handleRuntimeChange }) {
    return (
        <div className="runtime-filter">
            <select name="runtime-filter" id="runtime-filter" onChange={handleRuntimeChange}>
                <option value="beef">RUNTIME</option>
                <option value="short">SHORT  ({"<"} 90 minutes)</option>
                <option value="medium">MEDIUM  (90-100 minutes)</option>
                <option value="mediumish">LONG  (100 minutes-2 hours)</option>
                <option value="long">EPIC  ({">"} 2 hours)</option>
            </select>
        </div>

    );
}

export default RuntimeFilter;