// icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import IconButton from '@mui/material/IconButton'

export default function NavButton({
  variant,
}: {
  variant: 'back' | 'forward'
}) {
  return (
    // TODO: fix disabled state
    // TODO: right click menu show history of current tab
    <IconButton
      disabled={history.length === 1}
      onClick={() => {
        variant === 'forward' ? history.forward() : history.back()
      }}
      size="small">
      {variant === 'forward' ? <ArrowForwardIcon /> : <ArrowBackIcon />}
    </IconButton>
  )
}
