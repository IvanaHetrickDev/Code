import { createApp } from 'vue';

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.weather-widget').forEach(el => {
        const city = el.getAttribute('data-city');

        const app = createApp({
            data() {
                return {
                    city,
                    temperature: null,
                    loading: true
                };
            },
            mounted() {
                // Example API call (replace with your API key)
                fetch(`https://api.example.com/weather?city=${this.city}`)
                    .then(res => res.json())
                    .then(data => {
                        this.temperature = data.temp;
                        this.loading = false;
                    });
            },
            template: `
                <div>
                    <h4>Weather in {{ city }}</h4>
                    <div v-if="loading">Loading...</div>
                    <div v-else>{{ temperature }}°C</div>
                </div>
            `
        });

        app.mount(el);
    });
});
