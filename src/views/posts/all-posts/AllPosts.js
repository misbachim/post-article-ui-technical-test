import React, { useEffect, useState } from 'react'
import {
  CBadge,
  CButton,
  CNav,
  CNavItem,
  CNavLink,
  CPagination,
  CPaginationItem,
  CTabContent,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTabPane,
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { getArticles, countArticle, selectArticles, selectArticleCount } from 'src/app/listArticleSlice'
import CIcon from '@coreui/icons-react';
import { cilPen, cilTrash } from '@coreui/icons';
import { SmartPagination } from 'src/components/SmartPagination';
import { useNavigate } from 'react-router-dom';
import { putArticle } from 'src/app/articleAPI';

const ARTICLE_STATUS = {
  PUBLISH: 'publish',
  DRAFT: 'draft',
  THRASH: 'thrash',
}

const AllPosts = () => {
  const navigate = useNavigate();

  const listArticle = useSelector(selectArticles)
  const articleCount = useSelector(selectArticleCount)
  const dispatch = useDispatch()

  const [activeKey, setActiveKey] = useState(1)
  const [publishedPageCount, setPublishedPageCount ] = useState(0)
  const [draftedPageCount, setDraftedPageCount ] = useState(0)
  const [thrashedPageCount, setThrashedPageCount ] = useState(0)
  const [publishedCurrentPage, setPublishedCurrentPage ] = useState(0)
  const [draftedCurrentPage, setDraftedCurrentPage ] = useState(0)
  const [thrashedCurrentPage, setThrashedCurrentPage ] = useState(0)

  useEffect(() => {
    dispatch(getArticles({limit: 10, offset: publishedCurrentPage*10, status: ARTICLE_STATUS.PUBLISH}))

    fetchCountPublishedArticle()
    fetchCountDraftedArticle()
    fetchCountThrashedArticle()
  }, [])

  useEffect(() => {
    switch (activeKey) {
      case 1:
        dispatch(getArticles({limit: 10, offset: publishedCurrentPage*10, status: ARTICLE_STATUS.PUBLISH}))
        fetchCountPublishedArticle()
        break;
    
      case 2:
        dispatch(getArticles({limit: 10, offset: draftedCurrentPage*10, status: ARTICLE_STATUS.DRAFT}))
        fetchCountDraftedArticle()
        break;
    
      case 3:
        dispatch(getArticles({limit: 10, offset: thrashedCurrentPage*10, status: ARTICLE_STATUS.THRASH}))
        fetchCountThrashedArticle()
        break;
    
      default:
        break;
    }
  }, [
    activeKey, 
    publishedCurrentPage, 
    draftedCurrentPage, 
    thrashedCurrentPage,
  ])

  const fetchCountPublishedArticle = async () => {
    await dispatch(countArticle(ARTICLE_STATUS.PUBLISH))
    setPublishedPageCount(Math.ceil(articleCount[ARTICLE_STATUS.PUBLISH]/10))
  }
  const fetchCountDraftedArticle = async () => {
    await dispatch(countArticle(ARTICLE_STATUS.DRAFT))
    setDraftedPageCount(Math.ceil(articleCount[ARTICLE_STATUS.DRAFT]/10))
  }
  const fetchCountThrashedArticle = async () => {
    await dispatch(countArticle(ARTICLE_STATUS.THRASH))
    setThrashedPageCount(Math.ceil(articleCount[ARTICLE_STATUS.THRASH]/10))
  }

  const changePublishedPage = (page) => {
    setPublishedCurrentPage(page)
  }
  const changeDraftedPage = (page) => {
    setDraftedCurrentPage(page)
  }
  const changeThrashedPage = (page) => {
    setThrashedCurrentPage(page)
  }

  const handleThrashArticle = (article) => {
    const putThrash = async () => {
      await putArticle({
        ...article,
        status: ARTICLE_STATUS.THRASH,
      })

      switch (article) {
        case ARTICLE_STATUS.PUBLISH:
          dispatch(getArticles({limit: 10, offset: publishedCurrentPage*10, status: ARTICLE_STATUS.PUBLISH}))
          fetchCountPublishedArticle()
          break;
      
        case ARTICLE_STATUS.DRAFT:
          dispatch(getArticles({limit: 10, offset: draftedCurrentPage*10, status: ARTICLE_STATUS.DRAFT}))
          fetchCountDraftedArticle()
          break;
      
        default:
          break;
      }
    }

    putThrash()
  }

  return (
    <>
      <CNav variant="tabs" role="tablist">
        <CNavItem>
          <CNavLink
            active={activeKey === 1}
            onClick={() => setActiveKey(1)}
          >
            Published
            {
              articleCount && 
              <CBadge color="secondary">
                {articleCount[ARTICLE_STATUS.PUBLISH]}
              </CBadge>
            }
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            active={activeKey === 2}
            onClick={() => setActiveKey(2)}
          >
            Drafts
            {
              articleCount && 
              <CBadge color="secondary">
                {articleCount[ARTICLE_STATUS.DRAFT]}
              </CBadge>
            }
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            active={activeKey === 3}
            onClick={() => setActiveKey(3)}
          >
            Thrashed
            {
              articleCount && 
              <CBadge color="secondary">
                {articleCount[ARTICLE_STATUS.THRASH]}
              </CBadge>
            }
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="published-tab" visible={activeKey === 1}>
          <CTable align="middle" striped hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell className='text-center' scope="col">#</CTableHeaderCell>
                <CTableHeaderCell className='text-center' scope="col">Title</CTableHeaderCell>
                <CTableHeaderCell className='text-center' scope="col">Category</CTableHeaderCell>
                <CTableHeaderCell className='text-center' scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {
                listArticle && listArticle[ARTICLE_STATUS.PUBLISH] &&
                listArticle[ARTICLE_STATUS.PUBLISH].map((article, index) => {
                  return (
                    <CTableRow key={article.title}>
                      <CTableHeaderCell className='text-center' scope="row">{publishedCurrentPage*10+index+1}</CTableHeaderCell>
                      <CTableDataCell className='text-center'>{article.title}</CTableDataCell>
                      <CTableDataCell className='text-center'>{article.category}</CTableDataCell>
                      <CTableDataCell className='text-center'>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                        <CButton color="primary" onClick={() => navigate(`/posts/edit-article/${article.id}`)}>
                          <CIcon icon={cilPen}/>
                        </CButton>
                        <CButton color="danger" onClick={() => handleThrashArticle(article)}>
                          <CIcon icon={cilTrash}/>
                        </CButton>
                      </div>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })
              }
            </CTableBody>
          </CTable>
          {
            !!publishedPageCount &&
            <SmartPagination callbackChangePage={changePublishedPage} currentPage={publishedCurrentPage} totalPages={publishedPageCount} />
          }
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="drafts-tab" visible={activeKey === 2}>
          <CTable align="middle" striped hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell className='text-center' scope="col">#</CTableHeaderCell>
                <CTableHeaderCell className='text-center' scope="col">Title</CTableHeaderCell>
                <CTableHeaderCell className='text-center' scope="col">Category</CTableHeaderCell>
                <CTableHeaderCell className='text-center' scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {
                listArticle && listArticle[ARTICLE_STATUS.DRAFT] &&
                listArticle[ARTICLE_STATUS.DRAFT].map((article, index) => {
                  return (
                    <CTableRow key={article.title}>
                      <CTableHeaderCell className='text-center' scope="row">{draftedCurrentPage*10+index+1}</CTableHeaderCell>
                      <CTableDataCell className='text-center'>{article.title}</CTableDataCell>
                      <CTableDataCell className='text-center'>{article.category}</CTableDataCell>
                      <CTableDataCell className='text-center'>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                        <CButton color="primary" onClick={() => navigate(`/posts/edit-article/${article.id}`)}>
                          <CIcon icon={cilPen}/>
                        </CButton>
                        <CButton color="danger" onClick={() => handleThrashArticle(article)}>
                          <CIcon icon={cilTrash}/>
                        </CButton>
                      </div>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })
              }
            </CTableBody>
          </CTable>
          {
            !!draftedPageCount &&
            <SmartPagination callbackChangePage={changeDraftedPage} currentPage={draftedCurrentPage} totalPages={draftedPageCount} />
          }
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="thrashed-tab" visible={activeKey === 3}>
          <CTable align="middle" striped hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell className='text-center' scope="col">#</CTableHeaderCell>
                <CTableHeaderCell className='text-center' scope="col">Title</CTableHeaderCell>
                <CTableHeaderCell className='text-center' scope="col">Category</CTableHeaderCell>
                <CTableHeaderCell className='text-center' scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {
                listArticle && listArticle[ARTICLE_STATUS.THRASH] &&
                listArticle[ARTICLE_STATUS.THRASH].map((article, index) => {
                  return (
                    <CTableRow key={article.title}>
                      <CTableHeaderCell className='text-center' scope="row">{thrashedCurrentPage*10+index+1}</CTableHeaderCell>
                      <CTableDataCell className='text-center'>{article.title}</CTableDataCell>
                      <CTableDataCell className='text-center'>{article.category}</CTableDataCell>
                      <CTableDataCell className='text-center'>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                        <CButton color="primary" onClick={() => navigate(`/posts/edit-article/${article.id}`)}>
                          <CIcon icon={cilPen}/>
                        </CButton>
                      </div>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })
              }
            </CTableBody>
          </CTable>
          {
            !!thrashedPageCount &&
            <SmartPagination callbackChangePage={changeThrashedPage} currentPage={thrashedCurrentPage} totalPages={thrashedPageCount} />
          }
        </CTabPane>
      </CTabContent>
    </>
  )
}

export default AllPosts
