import { ref, onMounted, watch } from 'vue'

export function useDarkMode() {
    const isDark = ref(false)

    const toggleDarkMode = () => {
        isDark.value = !isDark.value
        updateDarkMode()
    }

    const updateDarkMode = () => {
        if (isDark.value) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('darkMode', 'true')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('darkMode', 'false')
        }
    }

    const initDarkMode = () => {
        // Check localStorage first
        const savedMode = localStorage.getItem('darkMode')
        if (savedMode !== null) {
            isDark.value = savedMode === 'true'
        } else {
            // Check system preference
            isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
        }
        updateDarkMode()
    }

    onMounted(() => {
        initDarkMode()

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleChange = (e) => {
            if (localStorage.getItem('darkMode') === null) {
                isDark.value = e.matches
                updateDarkMode()
            }
        }
        mediaQuery.addEventListener('change', handleChange)

        return () => mediaQuery.removeEventListener('change', handleChange)
    })

    return {
        isDark,
        toggleDarkMode
    }
}
