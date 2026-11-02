export class Juego {
    constructor(data) {
        this.id = data.id,
        this.name = data.name,
        this.released = data.released,
        this.tba = data.tba,
        this.background_image = data.background_image,
        this.rating = data.rating,
        this.rating_top = data.rating_top,
        this.ratings = data.ratings,
        this.ratings_count = data.ratings_count,
        this.platforms = data.platforms
    }
}