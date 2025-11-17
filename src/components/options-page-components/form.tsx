// materials
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormHelperText from '@mui/material/FormHelperText'
import FormLabel from '@mui/material/FormLabel'
import Slider from '@mui/material/Slider'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
// etc
import { useAppContext } from '@/components/app-provider'

export default function OptionsForm() {
    const { settings, setSettings } = useAppContext()

    return (
        <form>
            <FormGroup>
                <FormControlLabel
                    control={<Switch checked={settings.theme === 'dark'} />}
                    label="Dark Mode"
                    onClick={event => {
                        event.preventDefault()
                        setSettings({
                            ...settings,
                            theme: settings.theme === 'dark' ? 'light' : 'dark',
                        })
                    }}
                />
            </FormGroup>

            <FormGroup sx={{ mt: 2 }}>
                <FormLabel>Icon Opacity</FormLabel>

                <Stack
                    direction="row"
                    spacing={2}
                    sx={{ alignItems: 'center' }}>
                    <Slider
                        aria-label="Icon Opacity"
                        max={1}
                        min={0}
                        onChange={(_, value) => {
                            setSettings({
                                ...settings,
                                iconOpacity: value,
                            })
                        }}
                        step={0.1}
                        value={settings.iconOpacity}
                        valueLabelDisplay="auto"
                    />
                </Stack>

                <FormHelperText>
                    Adjust the visibility of the compass icon trigger.
                </FormHelperText>
            </FormGroup>
        </form>
    )
}
