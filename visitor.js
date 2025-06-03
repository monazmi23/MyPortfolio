class VisitorAPI {
    constructor() {
        this.visitorData = {
            timestamp: new Date(),
            page: window.location.pathname,
            language: navigator.language,
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            sessionId: this.generateSessionId()
        };
    }

    generateSessionId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    async trackPageView() {
        const expirationDays = 30;
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + expirationDays);
        
        let pageViews = parseInt(localStorage.getItem('pageViews') || '0');
        localStorage.setItem('pageViews', ++pageViews);
        localStorage.setItem('lastVisit', new Date().toISOString());
        localStorage.setItem('dataExpiration', expirationDate.toISOString());
        
        this.cleanExpiredData();
        
        const event = new CustomEvent('visitorTracked', { 
            detail: {
                pageViews: pageViews,
                lastVisit: new Date().toISOString()
            }
        });
        document.dispatchEvent(event);
    }

    cleanExpiredData() {
        const expiration = localStorage.getItem('dataExpiration');
        if (expiration && new Date(expiration) < new Date()) {
            localStorage.removeItem('pageViews');
            localStorage.removeItem('lastVisit');
            localStorage.removeItem('dataExpiration');
        }
    }

    getPageViews() {
        this.cleanExpiredData();
        return parseInt(localStorage.getItem('pageViews') || '0');
    }

    getLastVisit() {
        this.cleanExpiredData();
        return localStorage.getItem('lastVisit');
    }

    updateDisplay() {
        const pageViewsElement = document.getElementById('pageViews');
        const lastVisitElement = document.getElementById('lastVisit');
        
        if (pageViewsElement) {
            pageViewsElement.textContent = this.getPageViews();
        }
        
        if (lastVisitElement) {
            const lastVisit = this.getLastVisit();
            if (lastVisit) {
                const date = new Date(lastVisit);
                lastVisitElement.textContent = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
            }
        }
    }
}

// Initialize and track visitor when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const visitor = new VisitorAPI();
    visitor.trackPageView();
}); 