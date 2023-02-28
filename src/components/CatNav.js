export default function CatNav({navCat, handleFilter, handleReset}) { //Om det er rødt etter kopi av kode, putt dem inn som prop her! Også ta det i mot i komponentet main.
    return(
        <ul>
            {navCat.map((item, index) =>(
            <li key={index}><button onClick={handleFilter}>{item}</button></li>
            ))}
            <li><button onClick={handleReset}>Alle nyheter</button></li>
        </ul>
    )
}