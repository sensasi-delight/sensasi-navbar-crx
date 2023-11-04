import React from 'react'

import IconButton from '@mui/material/IconButton'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'

export default function BookmarkButton(): React.ReactElement {
  return (
    <IconButton
      size="small"
      onClick={() =>
        document.dispatchEvent(
          new KeyboardEvent('keydown', {
            key: 'd',
            ctrlKey: true,
          }),
        )
      }>
      <BookmarkBorderIcon />
    </IconButton>
  )
}
