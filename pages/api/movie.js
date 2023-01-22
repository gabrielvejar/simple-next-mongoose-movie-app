import dbConnect from "@/lib/dbConnect"
import Movie from "@/models/Movie"

export default async function handler(req, res) {
    await dbConnect()

    //POST api/movie

    const {method} = req
    switch(method){
        case "POST":
            try {
                const movie = new Movie(req.body)
                await movie.save()
                return res.json({ success: true, movie })
            } catch (error) {
                console.log({error});
                return res.status(400).json({success: false, error})
            }
        default:
            return res.status(400).json({success: false, error: "Error en el servidor"})
    }
}