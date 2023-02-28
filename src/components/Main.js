import { useCallback, useEffect, useState } from "react"
import CatNav from "./CatNav"
import NewsCard from "./NewsCard"

export default function Main (){
    //af1359d191a14748ac6ecb3b90f57f20 - henter API-key, for å putte den inn i URL'en du ønsker å bruke. I URL'elen, kan du etter q= putte inn det du ønsker istedenfor bitcoin. 

    //Lager en state, for å ta imot nyheter API
    const [news, setNews] = useState([])

    //Lager state, med const og useState. Også hva vi ønsker å filtrere ut. Vi har en array, med ting. Med newSet - gir oss ett nytt sett
    const [filter, setFilter] = useState("All")
    //Tom array, for resultatet av filteringen. Filterer news, og resultatet av det dyttes inn i result. Om result er null, ingenting. If/else. 
    const [resultat, setResultat] = useState([])
    //For å få tak i sources, mapper ut news. Som kun inneholder navnene. 
    const navCat = [...new Set(news.map((e) => e.source.name))]

    //Sette den som async, må appen kan foregå samtidig som andre funksjoner: 
    const getNews = async() => {
        const response = await fetch('https://newsapi.org/v2/everything?q=last-of-us&pageSize=20&apiKey=af1359d191a14748ac6ecb3b90f57f20')
        const data = await response.json()
        setNews(data.articles)
        //Henter articles som objekt, fra console.loggen. Så lager artikkelkort som skal vises på siden. 

        //Bruker filter metoden. 
        setResultat(news.filter(items => items.source.name === filter))
    }

    console.log(resultat)

    //Use effekt, kjøres komponentet igjen og igjen. 
    useEffect(() => {
        getNews()
    }, [])

    //Lager en funksjon for knappene: og setter inn setFilter funksjonen. Og ber om å printe ut eventet når button klikkes altså filter. 
    const handleFilter = (event) => {
        //console.log(event.target.innerHTML)
        setFilter(event.target.innerHTML)
    } 

    const handleReset = () => {
        setFilter("All")
    }

    //For å vise artikkelkortene som er lagd på komponentet NewsCard.js "printe" dem ut her. Arrayen er lagret i news arrayen. Henter den inn og mapper. 
    return (
        //Mapper på nytt her, for å få ut en og en ting. 

        //For button, lager vi en onClick, og setter inn funksjonen handleFilter.

        //Ta i mot komponentet og props på nytt komponent catNAv: 
        <>
            <h2>Her kommer nyheter!</h2>
                <CatNav navCat={navCat} handleFilter={handleFilter} handleReset={handleReset}/>

            {resultat.length <= 0 ? news?.map((item, index) => (
                <NewsCard key={index} img={item.urlToImage} title={item.title} ingress={item.description} />
            )) : resultat?.map((item, index) => (
                <NewsCard key={index} img={item.urlToImage} title={item.title} ingress={item.description} />
            ))}
                
            
        </>
        //For å se hvilke keys som må brukes, må du inn i console.loggen og se de ulike keys, som skal inn i img osv. 
    )    
}