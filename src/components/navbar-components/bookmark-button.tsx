import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import IconButton from '@mui/material/IconButton'

export default function BookmarkButton() {
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
