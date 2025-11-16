// icons
import RefreshIcon from '@mui/icons-material/Refresh'
import IconButton from '@mui/material/IconButton'
// components
import NavButton from '@/components/navbar-components/nav-button'

export default function NavButtons() {
  return (
    <div
      style={{
        marginRight: '1em',
      }}>
      <NavButton variant="back" />
      <NavButton variant="forward" />

      <IconButton
        onClick={() => {
          location.reload()
        }}
        size="small">
        <RefreshIcon />
      </IconButton>
    </div>
  )
}
