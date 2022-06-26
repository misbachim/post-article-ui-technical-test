import React from 'react'

const Page404 = React.lazy(() => import('./views/page404/Page404'))
const AllPosts = React.lazy(() => import('./views/posts/all-posts/AllPosts'))
const AddNew = React.lazy(() => import('./views/posts/add-new/AddNew'))
const EditArticle = React.lazy(() => import('./views/posts/edit-article/EditArticle'))
const Preview = React.lazy(() => import('./views/posts/preview/Preview'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/posts', name: 'Posts', element: AllPosts, exact: true },
  { path: '/posts/all-posts', name: 'All Posts', element: AllPosts },
  { path: '/posts/add-new', name: 'Add New', element: AddNew },
  { path: '/posts/edit-article/:id', name: 'Edit Article', element: EditArticle },
  { path: '/posts/preview', name: 'Preview', element: Preview },
  { path: '*', name: 'Page 404', element: Page404 },
]

export default routes
