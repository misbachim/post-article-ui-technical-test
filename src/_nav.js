import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilNotes,
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavGroup,
    name: 'Posts',
    to: '/posts',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Posts',
        to: '/posts/all-posts',
      },
      {
        component: CNavItem,
        name: 'Add New',
        to: '/posts/add-new',
      },
      {
        component: CNavItem,
        name: 'Preview',
        to: '/posts/preview',
      },
    ],
  },
]

export default _nav
