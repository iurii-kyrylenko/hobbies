import Books from '@/components/books'
import BookList from '@/components/books/BookList'
import NewBook from '@/components/books/NewBook'
import EditBook from '@/components/books/EditBook'

export default {
  path: '/books',
  component: Books,
  children: [
    {
      path: '',
      component: BookList
    },
    {
      path: 'new',
      component: NewBook
    },
    {
      path: ':id',
      component: EditBook
    }
  ]
}
