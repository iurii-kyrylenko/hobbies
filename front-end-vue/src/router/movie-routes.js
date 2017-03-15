import MovieList from '@/components/movies/MovieList'
import Movie from '@/components/movies/Movie'

export default {
  path: '/movies',
  component: {
    name: 'Movies',
    template: '<router-view />'
  },
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
