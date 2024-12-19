document.addEventListener("DOMContentLoaded", () => {
    const commentButton = document.querySelector(".comment-btn");
    const commentMenu = document.querySelector(".comment-menu");
    const commentForm = document.querySelector(".comment-form");
    const commentList = document.querySelector(".comment-list");
    const commentField = document.querySelector(".comment-field");

    // Завантаження коментарів з localStorage
    const loadComments = () => {
        const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
        savedComments.forEach((comment) => addCommentToList(comment));
    };

    // Додавання нового коментаря до списку
    const addCommentToList = (comment) => {
        const listItem = document.createElement("li");
        listItem.classList.add("user-comment");
        listItem.textContent = comment;
        commentList.appendChild(listItem);
    };

    // Збереження коментарів у localStorage
    const saveComment = (comment) => {
        const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
        savedComments.push(comment);
        localStorage.setItem("comments", JSON.stringify(savedComments));
    };

    // Відкриття меню коментарів
    commentButton.addEventListener("click", () => {
        commentMenu.classList.remove("hidden");
    });

    // Закриття меню при кліку за межами
    document.addEventListener("click", (event) => {
        if (!commentMenu.contains(event.target) && event.target !== commentButton) {
            commentMenu.classList.add("hidden");
        }
    });

    // Обробка форми коментарів
    commentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const inputValue = commentField.value.trim();
        if (inputValue) {
            addCommentToList(inputValue);
            saveComment(inputValue);
            commentField.value = "";
        }
    });

    // Завантаження коментарів при завантаженні сторінки
    loadComments();
});

