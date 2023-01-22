import dbConnect from '@/lib/dbConnect'
import Movie from '@/models/Movie'
import Head from 'next/head'

export default function Home({ movies }) {
  console.log({ movies });
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='container'>
        <h1>Movies</h1>
        {
          movies.map(({ _id, title, plot }) => (
            <div className="card mb-2" key={_id}>
              <div className="card-body">
                <div className="h5 text-uppercase">{title}</div>
                <p className="fw-light">{plot}</p>
              </div>
            </div>
          ))
        }
      </main>
    </>
  )
}

export async function getServerSideProps() {
  try {
    await dbConnect()
    const res = await Movie.find({})
    const movies = res.map((doc) => {
      const movie = doc.toObject()
      movie._id = `${movie._id}`
      return movie
    })
    console.log({ res });
    return { props: { movies } }
  } catch (error) {
    console.log(error);
  }
  return {
    props: {}
  }
}