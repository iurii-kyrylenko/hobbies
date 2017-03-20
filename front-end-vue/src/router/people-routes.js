import Shared from '@/components/Shared'
import People from '@/components/People'
import BookList from '@/components/books/BookList'
import MovieList from '@/components/movies/MovieList'

export default {
  path: '/people',
  component: Shared,
  children: [
    {
      path: '',
      component: People
    },
    {
      path: ':uid/b',
      component: BookList,
      props: true
    },
    {
      path: ':uid/m',
      component: MovieList,
      props: true
    }
  ]
}
