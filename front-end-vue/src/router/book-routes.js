import BookList from '@/components/books/BookList'
import Book from '@/components/books/Book'

export default {
  path: '/books',
  component: {
    name: 'Books',
    template: '<router-view />'
  },
  children: [
    {
      path: '',
      component: BookList
    },
    {
      path: 'new',
      component: Book
    },
    {
      path: ':id',
      component: Book,
      props: true
    }
  ]
}
