import { useEffect, useState } from "react"
import Article from "./components/Article"
import styled from "styled-components"

const Header=styled.nav`
display: flex;
background-color: #ff6600;
align-items: center;
gap: 5px;
  a{
    color: black;
    text-decoration: none;
  }
  a:first-of-type{
    color: white;
    font-weight: bold;
    border: solid white 2px;
    margin: 2px;
    width: 20px;
    height: 20px;
  }
  a:nth-of-type(2){
    font-weight: bold;
  }
`

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

  useEffect(()=>console.log(articles),[articles])

  return (
    <>
    <Header>
      <a>Y</a> <a>Hacker News</a> <p> | </p>
      <a>new</a><p> | </p>
      <a>past</a><p> | </p>
      <a>comments</a><p> | </p>
      <a>ask</a><p> | </p>
      <a>show</a><p> | </p>
      <a>jobs</a> <p> | </p>
      <a>submit</a>
    </Header>
      {filteredArticles.length?
        <>
          <ul>
            {filteredArticles.map((article,i)=><Article article={article} key={i} i={i}/>)}
          </ul>
        </>
      :<p>no articles</p>}
      <form onSubmit={handleSearch}>
        <input type="text" value={textInput} onChange={e=>setTextInput(e.target.value)}/>
      </form>
    </>
  )
}

export default App