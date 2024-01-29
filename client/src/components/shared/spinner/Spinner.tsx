import React from 'react'
import './spinner.scss'

const Spinner = () => {
    return (
        <section className="spinner">
            <div className="loader">
                {[...Array(20)].map((_, index) => (
                    <span
                        key={index + 1}
                        style={{ '--i': index + 1 } as React.CSSProperties}
                    ></span>
                ))}

                {/* <span className="--i:2"></span>
                <span className="--i:3"></span>
                <span className="--i:4"></span>
                <span className="--i:5"></span>
                <span className="--i:6"></span>
                <span className="--i:7"></span>
                <span className="--i:8"></span>
                <span className="--i:9"></span>
                <span className="--i:10"></span>
                <span className="--i:11"></span>
                <span className="--i:12"></span>
                <span className="--i:13"></span>
                <span className="--i:14"></span>
                <span className="--i:15"></span>
                <span className="--i:16"></span>
                <span className="--i:17"></span>
                <span className="--i:18"></span>
                <span className="--i:19"></span>
                <span className="--i:20"></span> */}
            </div>
        </section>
    )
}

export default Spinner
