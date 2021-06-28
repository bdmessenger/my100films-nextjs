Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) { s = "0" + s;}
    return s;
}

Number.prototype.timeConvert = function() {
    var time = this;

    if(time === 0) return 'Invalid time'
    let arr = [];
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    
    if(hours !== 0) arr.push(hours + 'h');
    if(minutes !== 0) arr.push(minutes + 'm')
    
    return arr.join(' ');
}


export const fetchFilmById = async (id) => {
    try {
        const [filmDetails, filmRelease, filmCredits, filmRecommendations] = await Promise.all([
            `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US`,
            `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${process.env.API_KEY}`,
            `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}`,
            `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.API_KEY}&language=en-US&page=1`
        ].map(url => fetch(url).then(response => response.json())))

        const {iso_3166_1: country, release_dates } = filmRelease.results.find(obj => obj.iso_3166_1 === 'US') || filmRelease.results[0]
        const date = filmDetails.release_date && new Date(release_dates[0].release_date)
        const { date: filmDateReleased, year: filmYearReleased} = date && {
            date: `${(date.getUTCMonth() + 1).pad()}/${date.getUTCDate().pad()}/${date.getUTCFullYear()}`,
            year: date.getFullYear(),
            month: (date.getMonth() + 1).pad(),
            day: date.getDate().pad()
        }

        const rating = release_dates.find(obj => obj.certification !== "")?.certification || 'NR'

        const crew = {}

        filmCredits.crew.filter(person => person.job === 'Director' || person.job === 'Screenplay' || person.job === 'Story' || person.job === 'Writer' || person.job === 'Characters' || person.job === 'Novel').forEach(({id, job, name}) => {
            if(!crew.hasOwnProperty(name)) { 
                crew[name] = {}
                crew[name].jobs = []
                crew[name].id = id
                crew[name].name = name
            }

            crew[name].jobs.push(job)
        })

        const directors = Object.keys(crew).filter(name => crew[name].jobs.find(job => job === 'Director'))

        const cast = filmCredits.cast.splice(0, 8).map(({id, name, character, profile_path}) => ({id, name, character, image: profile_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${profile_path}` : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'}))

        const recommendations = filmRecommendations.results.splice(0, 8).map(({id, title, backdrop_path: path}) => ({id, title, backdrop: path ? `https://image.tmdb.org/t/p/w500${path}` : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-4ee37443c461fff5bc221b43ae018a5dae317469c8e2479a87d562537dd45fdc.svg'}))

        return {
            backdrop: filmDetails.backdrop_path ? `https://image.tmdb.org/t/p/w500${filmDetails.backdrop_path}` : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-4ee37443c461fff5bc221b43ae018a5dae317469c8e2479a87d562537dd45fdc.svg',
            cast,
            country,
            crew,
            date: filmDateReleased,
            directors,
            genres: filmDetails.genres.map(obj => obj.name),
            overview: filmDetails.overview,
            poster: filmDetails.poster_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${filmDetails.poster_path}` : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-4ee37443c461fff5bc221b43ae018a5dae317469c8e2479a87d562537dd45fdc.svg',
            rating,
            recommendations,
            runtime: filmDetails.runtime ? filmDetails.runtime.timeConvert() : '',
            status: filmDetails.status,
            tagline: filmDetails.tagline,
            title: filmDetails.title,
            year: filmYearReleased,
        }

    } catch (error) {
        console.error('Error:', error)
        return null
    }
}

export const fetchMoviesByListId = async (id) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/list/${id}?api_key=${process.env.API_KEY}&language=en-US`)
        const { created_by: creator, items: films } = await response.json()

        const myFilms = films.map(({id, title, name, backdrop_path: imagePath}) => ({id, title: title || name, backdrop: imagePath ? `https://image.tmdb.org/t/p/w500${imagePath}` : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-4ee37443c461fff5bc221b43ae018a5dae317469c8e2479a87d562537dd45fdc.svg'}))

        return {creator, films: myFilms}
    } catch (error) {
        console.error('Error:', error)
        return {}
    }
}