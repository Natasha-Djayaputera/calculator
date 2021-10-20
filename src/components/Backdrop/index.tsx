import React from 'react'

const Backdrop: React.VFC = () => {
    return (
        <div className="backdrop">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <circle fill="currentColor" r="100" transform="translate(100 100)" />
            </svg>
        </div>
    )
}

export default Backdrop;