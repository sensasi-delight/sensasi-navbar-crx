// icons
import OpenInNew from '@mui/icons-material/OpenInNew'
// materials
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
// vendors
// utils
import HOTKEYS_DATA from '@/utils/hotkeys-data'

export default function HotkeysDialog({
    onClose,
    open,
}: {
    onClose: () => void
    open: boolean
}) {
    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            onClose={onClose}
            open={open}
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: 2,
                    },
                },
            }}>
            <DialogTitle
                sx={{
                    pb: 2,
                    pt: 3,
                    px: 3,
                }}>
                ⌨️ Keyboard Shortcuts
            </DialogTitle>

            <Divider />

            <DialogContent
                sx={{
                    px: 3,
                    py: 2,
                }}>
                <Stack spacing={3}>
                    {['general', 'navigation', 'tabs'].map(categoryKey => {
                        const categoryHotkeys = HOTKEYS_DATA.filter(
                            hotkey => hotkey.category === categoryKey,
                        )
                        if (categoryHotkeys.length === 0) return null

                        const categoryLabels = {
                            general: 'General',
                            navigation: 'Navigation',
                            tabs: 'Tabs',
                        }

                        return (
                            <Stack key={categoryKey} spacing={1.5}>
                                <Typography
                                    sx={{
                                        color: 'primary.main',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                    }}
                                    variant="caption">
                                    {
                                        categoryLabels[
                                            categoryKey as keyof typeof categoryLabels
                                        ]
                                    }
                                </Typography>

                                {categoryHotkeys.map(hotkey => (
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        key={hotkey.keys}
                                        spacing={2}
                                        sx={{
                                            alignItems: 'center',
                                        }}>
                                        <Typography
                                            component="span"
                                            sx={{
                                                flex: 1,
                                            }}
                                            variant="body2">
                                            {hotkey.description}
                                        </Typography>

                                        <Typography
                                            component="span"
                                            sx={{
                                                fontFamily: 'monospace',
                                                fontSize: '0.875rem',
                                                textAlign: 'right',
                                                whiteSpace: 'nowrap',
                                            }}
                                            variant="body2">
                                            <KbdKey>{hotkey.keys}</KbdKey>
                                        </Typography>
                                    </Stack>
                                ))}
                            </Stack>
                        )
                    })}
                </Stack>
            </DialogContent>

            <DialogActions
                sx={{
                    '& > *': {
                        color: 'text.secondary',
                        fontSize: '0.75rem',
                    },
                    alignItems: 'center',
                    borderTop: '1px solid',
                    borderTopColor: 'divider',
                    display: 'flex',
                    justifyContent: 'space-between',
                    px: 3,
                    py: 2,
                }}>
                <Typography variant="caption">
                    Press <KbdKey>ESC</KbdKey> to close this dialog.
                </Typography>

                <Typography
                    component="a"
                    href="https://support.google.com/chrome/answer/157179"
                    rel="noopener noreferrer"
                    target="_blank"
                    variant="caption">
                    View all Chrome keyboard shortcuts{' '}
                    <OpenInNew
                        fontSize="inherit"
                        sx={{
                            verticalAlign: 'middle',
                        }}
                    />
                </Typography>
            </DialogActions>
        </Dialog>
    )
}

const KbdKey = ({ children }: { children: string }) => (
    <Box
        component="kbd"
        sx={{
            backgroundColor: 'action.hover',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 0.5,
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
            display: 'inline-block',
            fontFamily: 'monospace',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            px: 0.75,
            py: 0.25,
        }}>
        {children}
    </Box>
)
