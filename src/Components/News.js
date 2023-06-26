const News=({news})=>{
    console.log(news.data.newsStories)
    return(
        <div className="news">
        {news.data.newsStories.map((news)=>(
            <div className="each-news">
                <h2>{news.title}</h2>
            </div>
        ))}
    </div>
    )
}
export default News
