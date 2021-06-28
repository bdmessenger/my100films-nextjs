import FilmPanel from './FilmPanel'

export default function FilmListGrid({films}) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {films.map(film => (
                <FilmPanel key={film.id} id={film.id} title={film.title} image={film.backdrop} />
            ))}
        </div>
    )
}
