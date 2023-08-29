import { useEffect, useState } from "react"

function App() {
  const [articles,setArticles]=useState([])
  const [filteredArticles,setFilteredArticles]=useState([])
  const [textInput,setTextInput]=useState("")

  useEffect(()=>{
    loadNews()
  },[])
  async function loadNews(){
    const res=await fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
    const data=await res.json()
    const top20=data.slice(0,20)
    const responses=await top20.map(id=>{
      return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .then(res=>res.json())
    })
    Promise.all(responses).then(response=>{setArticles(response),setFilteredArticles(response)})
  }

  const handleSearch=(e)=>{
    e.preventDefault()
    setFilteredArticles(articles.filter(article=>article.title.toLowerCase().includes(textInput.toLowerCase())))
  }

  return (
    <>
      {filteredArticles.length?
        <>
          <ol>
            {filteredArticles.map((article,i)=><a key={i} href={article.url}><li>{article.title}</li></a>)}
          </ol>
        </>
      :<p>no articles</p>}
      <form onSubmit={handleSearch}>
        <input type="text" value={textInput} onChange={e=>setTextInput(e.target.value)}/>
      </form>
    </>
  )
}

export default App
