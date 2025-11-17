import OptionsForm from '@/components/options-page-components/form'
import ThemeProvider from '@/components/theme-provider'

export default function OptionsPage() {
    return (
        <div style={{ padding: '1rem 1.5rem' }}>
            <ThemeProvider>
                <OptionsForm />
            </ThemeProvider>
        </div>
    )
}
