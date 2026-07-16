/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                bg: {
                    base: '#0C0C0E',
                    surface: '#141416',
                    elevated: '#1C1C1F',
                },
                border: {
                    subtle: '#2A2A2F',
                    active: '#3D3D45',
                },
                text: {
                    primary: '#F0F0F2',
                    secondary: '#8B8B99',
                    muted: '#52525E',
                },
                accent: {
                    blue: '#4F7AFF',
                    purple: '#9B6DFF',
                    green: '#3ECF8E',
                    red: '#FF4D6D',
                    amber: '#F5A623',
                    filter: '#4FC3F7',
                    transform: '#FF8A65',
                    merge: '#81C784',
                    conditional: '#CE93D8'
                }
            },
            fontFamily: {
                geist: ['Geist', 'sans-serif'],
                dm: ['"DM Mono"', 'monospace'],
            },
            boxShadow: {
                node: '0 4px 24px rgba(0,0,0,0.5)',
            },
            spacing: {
                1: '4px',
                2: '8px',
                3: '12px',
                4: '16px',
                5: '20px',
                6: '24px',
                8: '32px',
                10: '40px',
            }
        },
    },
    plugins: [],
}
