import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCardText,
  CCol,
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { countArticle, getArticles, selectArticleCount, selectArticles } from 'src/app/listArticleSlice'
import { SmartPagination } from 'src/components/SmartPagination'

const Preview = () => {
  const listArticle = useSelector(selectArticles)
  const articleCount = useSelector(selectArticleCount)
  const dispatch = useDispatch()

  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    dispatch(getArticles({limit: 6, offset: currentPage*6, status: 'publish'}))

    fetchCountPublishedArticle()
  }, [])

  useEffect(() => {
    dispatch(getArticles({limit: 6, offset: currentPage*6, status: 'publish'}))

    fetchCountPublishedArticle()
  }, [currentPage])

  const fetchCountPublishedArticle = async () => {
    await dispatch(countArticle('publish'))
    setTotalPages(Math.ceil(articleCount.publish/6))
  }

  const changePage = (page) => {
    setCurrentPage(page)
  }

  return (
    <>
      <div className="row justify-content-md-center">
        {
          listArticle && listArticle.publish &&
          listArticle.publish.map(article => {
            return (
              <CCol class="col-xs-6 col-md-4" >
                <CCard
                  className={`mb-3 border-light`}
                  style={{ maxWidth: '18rem' }}
                  key={article.id}
                >
                  <CCardHeader>{article.title}</CCardHeader>
                  <CCardBody>
                    <CCardTitle>{article.category}</CCardTitle>
                    <CCardText>
                      {article.content}
                    </CCardText>
                  </CCardBody>
                </CCard>
              </CCol>
            )
          })
        }
      </div>
      {
        !!totalPages &&
        <SmartPagination callbackChangePage={changePage} currentPage={currentPage} totalPages={totalPages} />
      }
    </>
  )
}

export default Preview
