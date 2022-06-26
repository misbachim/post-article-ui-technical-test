import React, { useState } from 'react'
import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormTextarea,
} from '@coreui/react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { postArticle } from 'src/app/articleAPI';

const AddNew = () => {
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('draft')

  const handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()
    
    setValidated(true)

    if (!validateTitle()) return
    if (!validateContent()) return
    if (!validateCategory()) return
    if (!validateStatus()) return

    const addArticle = async () => {
      await postArticle({
        title: title,
        content: content,
        category: category,
        status: status,
      })

      navigate(`/posts/all-posts`)
    }

    addArticle()
  }

  const validateTitle = () => {
    return (/.{20,200}/.test(title)) && (!!title.length || validated)
  }
  const validateContent = () => {
    return (/.{200,}/.test(content)) && (!!content.length || validated)
  }
  const validateCategory = () => {
    return (/.{3,100}/.test(category)) && (!!category.length || validated)
  }
  const validateStatus = () => {
    return !!status
  }

  return (
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
          value={title}
          required
          invalid={
            !validateTitle()
          }
          valid={
            validateTitle()
          }
          onChange={(e) => setTitle(e.target.value)}
          text="Must be 20-200 characters long."
        />
      </CCol>
      <CCol md={3}>
        <CFormInput
          type="text"
          placeholder="Insert Article's Category"
          id="validationCategory"
          label="Category"
          value={category}
          required
          invalid={
            !validateCategory()
          }
          valid={
            validateCategory()
          }
          onChange={(e) => setCategory(e.target.value)}
          text="Must be 3-100 characters long."
        />
      </CCol>
      <CFormTextarea
        type="text"
        placeholder="Start writing here..."
        id="validationContent"
        label="Content"
        value={content}
        rows="5"
        required
        invalid={
          !validateContent()
        }
        valid={
          validateContent()
        }
        onChange={(e) => setContent(e.target.value)}
        text="Minimum 200 characters long."
      />
      <CFormCheck 
          inline
          type="radio"
          name="statusOptions"
          id="statusPublish"
          value="publish"
          label="Publish"
          checked={status === 'publish'}
          invalid={
            !validateStatus()
          }
          valid={
            validateStatus()
          }
          onChange={(e) => setStatus(e.target.value)}
      />
      <CFormCheck 
          inline
          type="radio"
          name="statusOptions"
          id="statusDraft"
          value="draft"
          label="Draft" 
          checked={status === 'draft'}
          invalid={
            !validateStatus()
          }
          valid={
            validateStatus()
          }
          onChange={(e) => setStatus(e.target.value)}
      />
      <CCol xs={12}>
        <CButton color="primary" type="submit">
          Submit
        </CButton>
      </CCol>
    </CForm>
  )
}

export default AddNew
