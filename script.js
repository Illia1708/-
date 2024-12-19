const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
});

    document.querySelectorAll('.toggle-btn').forEach(button => {
        button.addEventListener('click', function () {
            const shortText = this.previousElementSibling.previousElementSibling;
            const fullText = this.previousElementSibling;

            if (fullText.style.display === 'none') {
                fullText.style.display = 'inline';
                shortText.style.display = 'none';
                this.textContent = 'Показати менше';
            } else {
                fullText.style.display = 'none';
                shortText.style.display = 'inline';
                this.textContent = 'Показати більше';
            }
        });
    });

    document.addEventListener("DOMContentLoaded", function () {
        const categoryFilter = document.getElementById("category-filter");
        const newsItems = document.querySelectorAll(".news-item");
    
        categoryFilter.addEventListener("change", function () {
            const selectedCategory = categoryFilter.value;
    
            newsItems.forEach((item) => {
                const itemCategory = item.dataset.category;
    
                if (selectedCategory === "all" || itemCategory === selectedCategory) {
                    item.classList.remove("hidden");
                } else {
                    item.classList.add("hidden");
                }
            });
        });
    });