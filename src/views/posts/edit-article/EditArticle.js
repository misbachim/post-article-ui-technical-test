import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormTextarea,
} from '@coreui/react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editArticle, selectArticle, setCategory, setContent, setStatus, setTitle } from 'src/app/articleSlice';
import { getArticle } from './../../../app/articleSlice';

const EditArticle = () => {
  const navigate = useNavigate();
  const params = useParams();

  const article = useSelector(selectArticle)
  const dispatch = useDispatch()

  const [validated, setValidated] = useState(false)

  useEffect(() => {
    dispatch(getArticle(params.id))
  
  }, [])
  
  const handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()
    
    setValidated(true)

    if (!validateTitle()) return
    if (!validateContent()) return
    if (!validateCategory()) return
    if (!validateStatus()) return

    const updateArticle = async () => {
      await dispatch(editArticle({
        id: article.id,
        title: article.title,
        content: article.content,
        category: article.category,
        status: article.status,
      }))

      navigate(`/posts/all-posts`)
    }

    updateArticle()
  }

  const validateTitle = () => {
    return (/.{20,200}/.test(article.title)) && (!!article.title.length || validated)
  }
  const validateContent = () => {
    return (/.{200,}/.test(article.content)) && (!!article.content.length || validated)
  }
  const validateCategory = () => {
    return (/.{3,100}/.test(article.category)) && (!!article.category.length || validated)
  }
  const validateStatus = () => {
    return !!article.status
  }

  return (
    <>
      {
        article && 
        <CForm
          className="row g-3 needs-validation"
          noValidate
          onSubmit={handleSubmit}
        >
          <CCol md={4}>
            <CFormInput
              type="text"
              placeholder="Insert Article's Title"
              id="validationTitle"
              label="Title"
              value={article.title}
              required
              invalid={
                !validateTitle()
              }
              valid={
                validateTitle()
              }
              onChange={(e) => dispatch(setTitle(e.target.value))}
              text="Must be 20-200 characters long."
            />
          </CCol>
          <CCol md={3}>
            <CFormInput
              type="text"
              placeholder="Insert Article's Category"
              id="validationCategory"
              label="Category"
              value={article.category}
              required
              invalid={
                !validateCategory()
              }
              valid={
                validateCategory()
              }
              onChange={(e) => dispatch(setCategory(e.target.value))}
              text="Must be 3-100 characters long."
            />
          </CCol>
          <CFormTextarea
            type="text"
            placeholder="Start writing here..."
            id="validationContent"
            label="Content"
            value={article.content}
            rows="5"
            required
            invalid={
              !validateContent()
            }
            valid={
              validateContent()
            }
            onChange={(e) => dispatch(setContent(e.target.value))}
            text="Minimum 200 characters long."
          />
          <CFormCheck 
              inline
              type="radio"
              name="article.statusOptions"
              id="article.statusPublish"
              value="publish"
              label="Publish"
              checked={article.status === 'publish'}
              invalid={
                !validateStatus()
              }
              valid={
                validateStatus()
              }
              onChange={(e) => dispatch(setStatus(e.target.value))}
          />
          <CFormCheck 
              inline
              type="radio"
              name="article.statusOptions"
              id="article.statusDraft"
              value="draft"
              label="Draft" 
              checked={article.status === 'draft'}
              invalid={
                !validateStatus()
              }
              valid={
                validateStatus()
              }
              onChange={(e) => dispatch(setStatus(e.target.value))}
          />
          <CCol xs={12}>
            <CButton color="primary" type="submit">
              Submit
            </CButton>
          </CCol>
        </CForm>
      }
    </>
  )
}

export default EditArticle
