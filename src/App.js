import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route path="/*" name="Home" element={<DefaultLayout />} />
            <Route path="*" name="Page 404" element={<Page404 />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
