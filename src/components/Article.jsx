import styled from "styled-components"

const ArticleCSS=styled.li`
    background-color: #f6f6ef;
    display:flex;
    flex-direction: column;
    gap: 5px;
    padding: 5px;
    p{
        display: flex;
        gap: 5px;
    }
    span{
        color: #b1b1ae;
    }
    a{
        color: black;
        text-decoration: none;
    }
    p:nth-of-type(2)>a{
        font-size: 10px;
        color: #929291;
    }
`

function Article({article, i}){
    return(
        <ArticleCSS>
            <p>
                <a href={article.url}>{i+1}. {article.title} </a>
                <span>({article.url.split("/")[2]})</span>
            </p>
            <p>
                <a>{article.score} points </a> 
                <a>by {article.by}</a>
                <a>{article.time}</a>
                <a>| Hide |</a>
                <a>{article.descendants} comments</a>
            </p>
        </ArticleCSS>
)
};

export default Article;