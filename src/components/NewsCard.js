export default function NewsCard({img, title, ingress}) {
    //Lager artikkelkortene, hvordan det skal vises på siden. 
    return(
        <article className="article-card">
            <img src={img} alt={title} />
            <h3>{title}</h3>
            <p>{ingress}</p>
            <a href="#">Les mer</a>
        </article>
    )
}