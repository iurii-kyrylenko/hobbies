import MovieList from '@/components/movies/MovieList'
import Movies from '@/components/movies/Movies'
import Movie from '@/components/movies/Movie'

export default {
  path: '/movies',
  component: Movies,
  children: [
    {
      path: '',
      component: MovieList
    },
    {
      path: 'new',
      component: Movie
    },
    {
      path: ':id',
      component: Movie,
      props: true
    }
  ]
}
