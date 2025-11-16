import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import IconButton from '@mui/material/IconButton'

export default function BookmarkButton() {
  return (
    <IconButton
      onClick={() =>
        document.dispatchEvent(
          new KeyboardEvent('keydown', {
            ctrlKey: true,
            key: 'd',
          }),
        )
      }
      size="small">
      <BookmarkBorderIcon />
    </IconButton>
  )
}
