const About =({da})=>{
    return(
        <div className='About'>
            <br/>
            <div className='aboutText'> 
                <h1>{da.title}</h1> <br/>
                <h3>{da.description}</h3>
            </div>
            <div className='aboutQuote'>
                <h3 className='quote'>{da.quote}</h3>
                <h3>- {da.quoteAuthor}</h3>
            </div>
        </div>
    )
}
export default About;