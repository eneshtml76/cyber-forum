// DOM Element Selection
const body = document.body;
const themeToggleBtn = document.getElementById('themeToggleBtn');
const messageBtn = document.getElementById('messageBtn');
const registerBtn = document.getElementById('registerBtn');

const registerModal = document.getElementById('registerModal');
const messageModal = document.getElementById('messageModal');
const closeModal = document.getElementById('closeModal');
const closeMessageModal = document.getElementById('closeMessageModal');

const registerForm = document.getElementById('registerForm');
const messageForm = document.getElementById('messageForm');
const passwordInput = document.getElementById('password');
const passwordError = document.getElementById('passwordError');
const forumFeed = document.getElementById('forumFeed');

// Theme Toggle Feature
themeToggleBtn.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
        body.classList.replace('dark-theme', 'light-theme');
    } else {
        body.classList.replace('light-theme', 'dark-theme');
    }
});

// Modal Open/Close Controls
messageBtn.addEventListener('click', () => messageModal.classList.add('active'));
closeMessageModal.addEventListener('click', () => messageModal.classList.remove('active'));

registerBtn.addEventListener('click', () => registerModal.classList.add('active'));
closeModal.addEventListener('click', () => registerModal.classList.remove('active'));

window.addEventListener('click', (e) => {
    if (e.target === registerModal) registerModal.classList.remove('active');
    if (e.target === messageModal) messageModal.classList.remove('active');
});

// Click listener for Like, Dislike, and Comment actions
forumFeed.addEventListener('click', (e) => {
    const target = e.target;
    const postCard = target.closest('.post-card');

    if (!postCard) return;

    // Handle Like Button click
    if (target.closest('.like-btn')) {
        const span = target.closest('.like-btn').querySelector('span');
        span.textContent = parseInt(span.textContent) + 1;
    }

    // Handle Dislike Button click
    if (target.closest('.dislike-btn')) {
        const span = target.closest('.dislike-btn').querySelector('span');
        span.textContent = parseInt(span.textContent) + 1;
    }

    // Handle Comment Button click (Shows Name and Comment input field inputs)
    if (target.closest('.comment-btn')) {
        if (postCard.querySelector('.comment-input-container')) return;

        const inputContainer = document.createElement('div');
        inputContainer.classList.add('comment-input-container');
        inputContainer.innerHTML = `
            <input type="text" placeholder="Your Name" class="inline-name-input" style="margin-bottom: 6px;">
            <div class="form-row">
                <input type="text" placeholder="Write a comment..." class="inline-comment-input">
                <button class="send-comment-btn">Reply</button>
            </div>
        `;
        postCard.insertBefore(inputContainer, postCard.querySelector('.comments-section'));
    }

    // Handle Reply Button submission
    if (target.classList.contains('send-comment-btn')) {
        const container = target.closest('.comment-input-container');
        const nameField = container.querySelector('.inline-name-input');
        const inputField = container.querySelector('.inline-comment-input');
        
        let commenterName = nameField.value.trim();
        const commentText = inputField.value.trim();
        const commentsSection = postCard.querySelector('.comments-section');

        // Fallback to Guest if name is empty
        if (commenterName === "") {
            commenterName = "Guest";
        }

        if (commentText !== "") {
            const commentElement = document.createElement('div');
            commentElement.classList.add('single-comment');
            commentElement.innerHTML = `<strong>${commenterName}:</strong> ${commentText}`;
            commentsSection.appendChild(commentElement);
        }
        container.remove();
    }
});

// Live Posting Engine
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('visitorName').value;
    const textContent = document.getElementById('visitorText').value;

    const newPost = document.createElement('div');
    newPost.classList.add('post-card');
    
    newPost.innerHTML = `
        <div class="post-header">
            <span class="author">${username}</span>
            <span class="date">Just now</span>
        </div>
        <p class="post-content">${textContent}</p>
        <div class="post-actions">
            <button class="action-btn like-btn">👍 <span>0</span></button>
            <button class="action-btn dislike-btn">👎 <span>0</span></button>
            <button class="action-btn comment-btn">💬 Comment</button>
        </div>
        <div class="comments-section"></div>
    `;

    forumFeed.prepend(newPost);
    messageModal.classList.remove('active');
    messageForm.reset();
});

// Secure Password Sign-Up Engine
registerForm.addEventListener('submit', (e) => {
    const value = passwordInput.value;
    
    const isValidLength = value.length >= 8;
    const hasNumber = /\d/.test(value);
    const hasUpperCase = /[A-Z]/.test(value);

    if (!isValidLength || !hasNumber || !hasUpperCase) {
        e.preventDefault();
        passwordError.style.display = 'block';
    } else {
        passwordError.style.display = 'none';
        alert('Account successfully created!');
        registerModal.classList.remove('active');
        registerForm.reset();
    }
});
