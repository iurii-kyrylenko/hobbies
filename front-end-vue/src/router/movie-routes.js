import Movies from '@/components/movies'
import MovieList from '@/components/movies/MovieList'
import NewMovie from '@/components/movies/NewMovie'
import EditMovie from '@/components/movies/EditMovie'

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
      component: NewMovie
    },
    {
      path: ':id',
      component: EditMovie
    }
  ]
}
