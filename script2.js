
const themeImages = document.querySelectorAll('.tema .img');
const body = document.body;


function changeTheme(theme) {
  
    body.classList.remove('dark-theme', 'warm-theme');
    

    if (theme) {
        body.classList.add(theme);
    }
}


themeImages.forEach((image, index) => {
    image.addEventListener('click', () => {
       
        if (index === 0) {
            changeTheme('dark-theme');  
        } else if (index === 1) {
            changeTheme('');  
        } else if (index === 2) {
            changeTheme('warm-theme');  
        }
    });
});

const heart = document.querySelector('.heart');
const likesNumber = document.querySelector('.likes-number');


let initialLikes = localStorage.getItem('likes') ? parseInt(localStorage.getItem('likes')) : 28;
likesNumber.textContent = `❤️ ${initialLikes}`;

heart.onclick = function () {
  heart.classList.toggle('added');

  initialLikes = heart.classList.contains('added') 
    ? initialLikes + 1 
    : initialLikes - 1;
  
  likesNumber.textContent = `❤️ ${initialLikes < 0 ? 0 : initialLikes}`;
  localStorage.setItem('likes', initialLikes);
};


document.addEventListener('DOMContentLoaded', function () {
    const cookiesAgreement = document.querySelector('.cookies-agreement');
    const cookiesButton = document.querySelector('.cookies-button');

    if (cookiesButton) {
    
        let overlay = document.createElement('div');
        overlay.classList.add('overlay');
        document.body.appendChild(overlay);


        cookiesButton.addEventListener('click', function () {
            cookiesAgreement.classList.add('cookies-agreement-closed');  
            overlay.style.display = 'none';  
        });
    } else {
        console.error('Кнопка не знайдена');
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const cookiesButton = document.querySelector('.cookies-button');
    const cookiesAgreement = document.querySelector('.cookies-agreement');

    cookiesButton.addEventListener('click', () => {
        cookiesAgreement.style.display = 'none';
        // Логіка для збереження кукіс (за потреби)
        document.cookie = "cookiesAccepted=true; path=/; max-age=31536000";
    });
});

// public/script.js
const socket = io();

// Елементи сторінки
const commentForm = document.querySelector('.comment-form');
const commentList = document.querySelector('.comment-list');

// Завантаження існуючих коментарів
fetch('/api/comments')
  .then((res) => res.json())
  .then((comments) => {
    comments.forEach(addCommentToDOM);
  });

// Додавання нового коментаря
commentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const commentField = e.target.commentField;

  if (commentField.value.trim()) {
    const comment = { text: commentField.value };
    socket.emit('new-comment', comment);
    commentField.value = '';
  }
});

// Оновлення коментарів у реальному часі
socket.on('comment-added', (comment) => {
  addCommentToDOM(comment);
});

// Функція для додавання коментаря в DOM
function addCommentToDOM(comment) {
  const li = document.createElement('li');
  li.textContent = comment.text;
  commentList.appendChild(li);
}