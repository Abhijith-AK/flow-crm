import React from 'react'

const StatCard = ({ bgColor, Icon, color, title, content }) => {
    return (
        <div style={{
            color,
            backgroundColor: bgColor
        }} className='card px-4 m-2'>
            <div className="card-body">
                <h2 className='card-title text-2xl'><Icon size={40} /> { title }</h2>
                <p className='text-5xl font-bold mt-3 text-center'> { content }</p>
            </div>
        </div>
    )
}

export default StatCard