import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
function Animation() {
    useEffect(() => {
        // Initialize AOS for each slide individually
        const items = document.querySelectorAll('.form-overlay-content');
        const banner = document.querySelectorAll('.banner-overlay-content');
        banner.forEach(item => {
            AOS.init({
                duration: 3000,
                // Customize AOS options for each slide if needed
            });
        });
        items.forEach(item => {
            AOS.init({
                duration: 3000,
                // Customize AOS options for each slide if needed
            });
        });
    }, []);

    return null; // Render nothing since this is just a utility component
}

export default Animation;