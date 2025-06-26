const sampleStories = [
    { avatar: "https://randomuser.me/api/portraits/women/68.jpg", name: "Lan Anh" },
    { avatar: "https://randomuser.me/api/portraits/men/32.jpg", name: "Minh Quân" },
    { avatar: "https://randomuser.me/api/portraits/women/65.jpg", name: "Thu Hằng" },
    { avatar: "https://randomuser.me/api/portraits/men/45.jpg", name: "Hữu Phước" },
    { avatar: "https://randomuser.me/api/portraits/women/12.jpg", name: "Mai Linh" }
];
const samplePosts = [
    {
        username: "Lan Anh",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        badge: "Top Chef",
        caption: "Bánh mì ốp la tự làm, giòn rụm và thơm ngon!",
        image: "../images/banhmi.webp",
        time: "5 phút trước",
        likes: 12,
        comments: 3
    },
    {
        username: "Minh Quân",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        badge: "Newbie",
        caption: "Lần đầu thử làm phở bò, kết quả ngoài mong đợi 😋",
        image: "../images/photruyenthong.webp",
        time: "10 phút trước",
        likes: 8,
        comments: 2
    },
    {
        username: "Thu Hằng",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
        badge: "Food Lover",
        caption: "Cháo gà cho bữa tối nhẹ nhàng, cả nhà đều thích!",
        image: "../images/chao-ga.jpg",
        time: "20 phút trước",
        likes: 15,
        comments: 5
    },
    {
        username: "Mai Linh",
        avatar: "https://randomuser.me/api/portraits/women/12.jpg",
        badge: "Top Chef",
        caption: "Bún chả Hà Nội chuẩn vị, ai ăn cũng khen!",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
        time: "30 phút trước",
        likes: 21,
        comments: 7
    }
];

function renderStories() {
    document.getElementById('storyBar').innerHTML = sampleStories.map(s =>
        `<div>
            <img src="${s.avatar}" class="story-avatar" alt="${s.name}">
            <div class="story-label">${s.name}</div>
        </div>`
    ).join('');
}

function renderPost({username, avatar, badge, caption, image, time, likes, comments}) {
    return `
    <div class="col-md-6 col-lg-4">
        <div class="card blog-card h-100 shadow-lg border-0 position-relative">
            ${badge ? `<span class="badge">${badge}</span>` : ""}
            <div class="d-flex align-items-center p-3 pb-0">
                <img src="${avatar}" alt="${username}" class="rounded-circle me-2" style="width:44px;height:44px;object-fit:cover;border:2px solid #ffd700;">
                <div>
                    <span class="fw-bold text-dark">${username}</span>
                    ${badge ? `<span class="user-badge ms-1">${badge}</span>` : ""}
                    <div class="text-muted small">${time}</div>
                </div>
            </div>
            <img src="${image}" class="blog-img" alt="User post" data-img="${image}">
            <div class="blog-body pt-2">
                <div class="mb-2">${caption}</div>
                <div class="post-actions">
                    <button class="like-btn" title="Thích"><i class="bi bi-heart"></i> <span class="like-count">${likes}</span></button>
                    <button class="comment-btn" title="Bình luận"><i class="bi bi-chat-dots"></i> <span>${comments || 0}</span></button>
                    <button class="share-btn" title="Chia sẻ"><i class="bi bi-share"></i></button>
                </div>
            </div>
        </div>
    </div>`;
}

function renderAllPosts(posts) {
    document.getElementById('postsFeed').innerHTML = posts.map(renderPost).join('');
    attachLikeEvents();
    attachLightboxEvents();
}
function savePostsToLocalStorage() {
    localStorage.setItem('posts', JSON.stringify(posts));
}
function loadPostsFromLocalStorage() {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
        posts = JSON.parse(storedPosts);
        renderAllPosts(posts); // Hiển thị bài viết
    }
}

function attachLikeEvents() {
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.onclick = function() {
            const countSpan = btn.querySelector('.like-count');
            let count = parseInt(countSpan.textContent, 10) || 0;
            if (!btn.classList.contains('active')) {
                count++;
                btn.classList.add('active');
            } else {
                count--;
                btn.classList.remove('active');
            }
            countSpan.textContent = count;
        };
    });
}
function attachLightboxEvents() {
    document.querySelectorAll('.blog-img').forEach(img => {
        img.onclick = function() {
            const src = img.getAttribute('data-img');
            const lightbox = document.getElementById('lightbox');
            lightbox.querySelector('img').src = src;
            lightbox.classList.add('active');
        };
    });
    document.getElementById('lightbox').onclick = function() {
        this.classList.remove('active');
    };
}

// Render on load
renderStories();
let posts = [...samplePosts];
renderAllPosts(posts);

let currentUser = null; // Lưu thông tin người dùng hiện tại

// --- Logic đăng ký ---
(function () {
    'use strict';
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!registerForm.checkValidity()) {
            registerForm.classList.add('was-validated');
            return;
        }

        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        // Lưu thông tin vào LocalStorage
        localStorage.setItem('userUsername', username);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPassword', password);

        alert('Đăng ký thành công! Bạn có thể đăng nhập ngay.');
        const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
        if (modal) modal.hide();
        registerForm.reset();
        registerForm.classList.remove('was-validated');
    });
})();

// --- Logic đăng nhập ---
(function () {
    'use strict';
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!loginForm.checkValidity()) {
            loginForm.classList.add('was-validated');
            return;
        }

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Kiểm tra thông tin đăng nhập từ LocalStorage
        const storedEmail = localStorage.getItem('userEmail');
        const storedPassword = localStorage.getItem('userPassword');
        const storedUsername = localStorage.getItem('userUsername');

        if (!storedEmail || !storedPassword || !storedUsername) {
            alert("Không tìm thấy thông tin tài khoản! Vui lòng đăng ký.");
            return;
        }

        if (email === storedEmail && password === storedPassword) {
            loginUser(storedUsername, "https://randomuser.me/api/portraits/lego/1.jpg");
            const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            if (modal) modal.hide();
            updateUserNav(); // Cập nhật giao diện sau khi đăng nhập
        } else {
            alert("Thông tin đăng nhập không chính xác!");
        }
    });
})();

// --- Cập nhật thanh điều hướng sau khi đăng nhập ---
function updateUserNav() {
    if (currentUser) {
        document.getElementById('userAvatar').src = currentUser.avatar;
        document.getElementById('userAvatar').style.display = "block";
        document.getElementById('userName').textContent = currentUser.name;
        document.getElementById('userName').style.display = "block";
        document.getElementById('loginBtn').style.display = "none";
        document.getElementById('logoutBtn').style.display = "block"; // Hiển thị nút đăng xuất
        document.getElementById('registerBtn').style.display = "none"; // Ẩn nút đăng ký thành viên
    } else {
        document.getElementById('userAvatar').style.display = "none";
        document.getElementById('userName').style.display = "none";
        document.getElementById('loginBtn').style.display = "block";
        document.getElementById('logoutBtn').style.display = "none";
        document.getElementById('registerBtn').style.display = "block"; // Hiển thị nút đăng ký thành viên
    }
}

// --- Logic đăng bài ---
(function () {
    'use strict';
    const postForm = document.getElementById('postForm');
    postForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!postForm.checkValidity()) {
            postForm.classList.add('was-validated');
            return;
        }

        if (!currentUser) {
            alert("Vui lòng đăng nhập trước khi đăng bài!");
            return;
        }

        const caption = document.getElementById('caption').value;
        const imageInput = document.getElementById('image');
        const file = imageInput.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function (event) {
            const imgSrc = event.target.result;
            const newPost = {
                username: currentUser.name,
                avatar: currentUser.avatar,
                badge: "Member",
                caption,
                image: imgSrc,
                time: "Vừa xong",
                likes: 0,
                comments: 0
            };
            posts.unshift(newPost);
            renderAllPosts(posts);
            savePostsToLocalStorage(); // Lưu bài viết vào LocalStorage
            postForm.reset();
            postForm.classList.remove('was-validated');
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('postModal'));
            if (modal) modal.hide();
        };
        reader.readAsDataURL(file);
    }, false);
})();
window.addEventListener('load', function () {
    loadPostsFromLocalStorage(); // Khôi phục bài viết từ LocalStorage
});
// Kiểm tra trạng thái đăng nhập khi tải trang
window.addEventListener('load', function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUser = localStorage.getItem('currentUser');

    if (isLoggedIn === 'true' && storedUser) {
        currentUser = JSON.parse(storedUser);
        updateUserNav(); // Cập nhật giao diện với thông tin người dùng
    } else {
        updateUserNav(); // Đảm bảo giao diện hiển thị đúng khi chưa đăng nhập
    }
});

// Lưu trạng thái đăng nhập
function loginUser(username, avatar) {
    currentUser = { name: username, avatar };
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateUserNav();
}

// Xóa trạng thái đăng nhập khi đăng xuất
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    currentUser = null;

    // Cập nhật giao diện
    updateUserNav();

    alert('Bạn đã đăng xuất thành công!');
}
 // Hiển thị hình ảnh preview khi chọn file
    // Hiển thị hình ảnh preview khi chọn file
document.getElementById('image').addEventListener('change', function (event) {
    const file = event.target.files[0]; // Lấy file đã chọn
    const previewImage = document.getElementById('previewImage');

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewImage.src = e.target.result; // Hiển thị hình ảnh preview
            previewImage.style.display = "block"; // Hiển thị thẻ img
        };
        reader.readAsDataURL(file); // Đọc file dưới dạng URL
    } else {
        previewImage.style.display = "none"; // Ẩn thẻ img nếu không có file
        previewImage.src = ""; // Xóa src của thẻ img
    }
});