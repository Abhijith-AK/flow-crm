import React from 'react'

const StatCard = ({ bgColor, Icon, color, title, content }) => {
    return (
        <div style={{
            color,
            backgroundColor: bgColor
        }} className='card md:px-4 m-2'>
            <div className="card-body">
                <h2 className='card-title text-xl lg:text-2xl'><Icon  /> { title }</h2>
                <p className='text-3xl lg:text-5xl font-bold mt-3 text-center'> { content }</p>
            </div>
        </div>
    )
}

export default StatCard