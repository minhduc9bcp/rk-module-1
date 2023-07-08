// //============== login register  =================
let loginForm = document.querySelector("#login");
let registerForm = document.querySelector("#register");
let toggleBtn = document.querySelector("#btn");

function register() {
    loginForm.style.left = '-400px';
    registerForm.style.left = '50px';
    toggleBtn.style.left = '110px';
}

function login() {
    loginForm.style.left = '50px';
    registerForm.style.left = '450px';
    toggleBtn.style.left = '0px';
}

let registerBtn = document.querySelector("#registerBtn");
registerBtn?.addEventListener('click', function (e) {
    e.preventDefault();
    let userName = document.querySelector("#userName").value.trim();
    let email = document.querySelector("#emailReg").value.trim();
    let password = document.querySelector("#passwordReg").value.trim();

    let regE = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

    let listUser = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : [];

    if (!email.match(regE)) {
        alert("Enter Email!");
    } else if (password.length < 6 || password == "") {
        alert("Enter Password with length >= 6");
    } else {
        listUser.push({
            userName: userName,
            email: email,
            password: password,
        })
        localStorage.setItem('user', JSON.stringify(listUser));
        alert("Register Success!");
        login();
    }
})

let loginBtn = document.querySelector("#loginBtn");
loginBtn?.addEventListener('click', function (e) {
    e.preventDefault();
    let email = document.querySelector("#emailLog").value.trim();
    let password = document.querySelector("#passwordLog").value.trim();
    let regE = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

    let listUser = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : [];

    const checkLogin = listUser.some(value => value.email == email && value.password == password);
    console.log(checkLogin);
    if (email == "" || !email.match(regE)) {
        alert("Enter Email!");
    } else if (password == "") {
        alert("Enter Password!");
    } else {
        if (checkLogin) {
            alert("Login Success");
            window.location.href = "home.html";
        } else {
            alert("Email or Password Wrong?");
        }
    }
})
// ============= Products List ====================================
// btn addProducts modal
let addProducts = document.querySelector("#add-products");
let overlay = document.querySelector(".overlay");
let closeAddBtn = document.querySelector("#btn-closeAdd");

function toggleOverlay() {
    overlay.classList.toggle('hide');
}

addProducts?.addEventListener("click", function () {
    toggleOverlay();
    document.querySelector(".form-edit").style.display = "none";
    document.querySelector(".form-submit").style.display = "";
    document.querySelector(".title-add").innerHTML = "add new product";
});

overlay?.addEventListener("click", function (e) {
    if (e.target == e.currentTarget) {
        toggleOverlay();
    }
});

closeAddBtn?.addEventListener("click", toggleOverlay);

// sidebar
const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeSide = document.querySelector("#close-btn");

menuBtn?.addEventListener('click', () => {
    sideMenu.style.display = 'block';
})
closeSide?.addEventListener('click', () => {
    sideMenu.style.display = 'none';
})

// clear form
function clearForm() {
    document.querySelector('#productId').disabled = false;
    document.querySelector("#productId").value = '';
    document.querySelector("#productName").value = '';
    document.querySelector("#importPrice").value = '';
    document.querySelector("#exportPrice").value = '';
    document.querySelector("#importDate").value = '';
    document.querySelector("#sizeS").checked = false;
    document.querySelector("#sizeM").checked = false;
    document.querySelector("#sizeL").checked = false;
    document.querySelector("#male").checked = true;
    document.querySelector("#female").checked = false;
    document.querySelector("#description").value = '';
}

// local data
let listProducts = localStorage.getItem("product")
    ? JSON.parse(localStorage.getItem("product"))
    : [];
// btn submit
let btnSubmit = document.querySelector(".form-submit");
btnSubmit?.addEventListener('click', function (e) {
    e.preventDefault();
    if (validator()) {
        let productId = document.querySelector("#productId").value.trim();
        let productName = document.querySelector("#productName").value.trim();
        let importPrice = document.querySelector("#importPrice").value.trim() * 1.0;
        let exportPrice = document.querySelector("#exportPrice").value.trim() * 1.0;
        let importDate = document.querySelector("#importDate").value.trim();
        const size = document.querySelectorAll("input[name='size']:checked");
        const sizeItems = [];
        for (let s in size) {
            if (Object.hasOwnProperty.call(size, s)) {
                sizeItems.push(size[s].value);
            }
        }
        let type = document.querySelector('input[name = "type"]:checked').value;
        let description = document.querySelector("#description").value.trim();
        listProducts.push({
            productId: productId,
            productName: productName,
            importPrice: importPrice,
            exportPrice: exportPrice,
            importDate: importDate,
            size: sizeItems,
            type: type,
            description: description,
        });
        localStorage.setItem('product', JSON.stringify(listProducts));
        overlay.classList.add('hide');
        alert("Thêm sản phẩm thành công!");
        clearForm();
    }
    renderData(getTotalPage());
})

// validator input
function validator() {
    let productId = document.querySelector("#productId").value.trim();
    let productName = document.querySelector("#productName").value.trim();
    let importPrice = document.querySelector("#importPrice").value.trim() * 1.0;
    let exportPrice = document.querySelector("#exportPrice").value.trim() * 1.0;
    let importDate = document.querySelector("#importDate").value.trim();
    const size = document.querySelectorAll("input[name='size']:checked");
    const sizeItems = [];
    for (let s in size) {
        if (Object.hasOwnProperty.call(size, s)) {
            sizeItems.push(size[s].value);
        }
    }
    // valid id
    if (productId == '' || productId.length <= 4) {
        alert("Vui lòng nhập mã SP từ 4 ký tự!");
        document.querySelector("#productId").focus();
        return false;
    }
    // valid name
    if (productName == '') {
        alert("Vui lòng nhập tên SP!");
        document.querySelector("#productName").focus();
        return false;
    }
    // valid importPrice
    if (importPrice == '' || isNaN(importPrice)) {
        alert("Vui lòng thêm giá nhập là số!");
        document.querySelector("#importPrice").focus();
        return false;

    }
    // valid exportPrice
    if (exportPrice == '' || isNaN(exportPrice)) {
        alert("Vui lòng thêm giá bán là số!");
        document.querySelector("#exportPrice").focus();
        return false;
    }
    // valid importDate
    let now = new Date().getTime();
    importDate = new Date(importDate).getTime();
    if (importDate == "" || importDate > now) {
        alert("Ngày nhập sản phẩm không được quá hôm nay!");
        document.querySelector("#importDate").focus();
        return false;
    }
    // valid size
    if (sizeItems.length == 0) {
        alert("Hãy chọn size");
        return false;
    }

    return true;
}
// panigation
let currentPage = 1;
let perPage = 5;
function getTotalPage() {
    return Math.ceil(listProducts.length / perPage);
}
// render data
function renderData(page) {
    if (page < 1) {
        page = 1;
    }
    if (page > getTotalPage()) {
        page = getTotalPage();
    }
    let maxIndex;
    if (page * perPage > listProducts.length) {
        maxIndex = listProducts.length;
    } else {
        maxIndex = page * perPage;
    }

    let tbody = document.querySelector("#content");
    tbody.innerHTML = "";
    for (let i = ((page - 1) * perPage); i < maxIndex; i++) {
        tbody.innerHTML += `
        <tr>
            <td>${listProducts[i].productId}</td>
            <td>${listProducts[i].productName}</td>
            <td>${listProducts[i].importPrice} $</td>
            <td>${listProducts[i].exportPrice} $</td>
            <td>${listProducts[i].importDate}</td>
            <td>${listProducts[i].size}</td>
            <td>${listProducts[i].type}</td>
            <td>${listProducts[i].description}</td>
            <td>
                <i class="edit" onclick="editProduct(${i})"><span class="material-symbols-sharp warning">
                        edit
                    </span>
                </i>
                <i class="delete" onclick="deleteProduct(${i})">
                    <span class="material-symbols-sharp danger">
                        delete
                    </span>
                </i>
            </td>
        </tr>
        `
    }
    // panigation render
    let listPage = document.querySelector("#list-page");
    listPage.innerHTML = "";
    for (let i = 1; i <= getTotalPage(); i++) {
        listPage.innerHTML += `
            <li class="link" onclick="clickPage(${i})">${i}</li>
        `
    }
    active(currentPage);

    let prev = document.querySelector(".btn-prev");
    if (currentPage == 1) {
        prev.style.display = 'none';
    } else {
        prev.style.display = '';
    }

    let next = document.querySelector(".btn-next");
    if (currentPage == getTotalPage()) {
        next.style.visibility = "hidden";
    } else {
        next.style.visibility = "visible";
    }
}
function active(page) {
    let links = document.querySelectorAll(".link");
    links.forEach(link => {
        link.classList.remove('active');
    });
    links[page - 1].classList.add('active');
}

function clickPage(page) {
    currentPage = page;
    renderData(page);
}

function prevPage() {
    if (currentPage < 1) {
        currentPage = 1;
    }
    currentPage--;
    renderData(currentPage);
}
function nextPage() {
    if (currentPage > getTotalPage()) {
        currentPage = getTotalPage();
    }
    currentPage++;
    renderData(currentPage);
}
// edit 
function editProduct(index) {
    document.querySelector("#index").value = index;
    document.querySelector(".form-submit").style.display = "none";
    document.querySelector(".form-edit").style.display = "";
    document.querySelector(".title-add").innerHTML = "Edit product";
    toggleOverlay();
    document.querySelector("#productId").value = listProducts[index].productId;
    document.querySelector("#productId").readOnly = true;
    document.querySelector("#productName").value = listProducts[index].productName;
    document.querySelector("#importPrice").value = listProducts[index].importPrice;
    document.querySelector("#exportPrice").value = listProducts[index].exportPrice;
    document.querySelector("#importDate").value = listProducts[index].importDate;
    document.querySelector("#description").value = listProducts[index].description;
    if (listProducts[index].size.length == 1) {
        document.querySelector("#sizeS").checked = true;
    } else if (listProducts[index].size.length == 2) {
        document.querySelector("#sizeS").checked = true;
        document.querySelector("#sizeM").checked = true;
    } else {
        document.querySelector("#sizeS").checked = true;
        document.querySelector("#sizeM").checked = true;
        document.querySelector("#sizeL").checked = true;
    }

}
function changeProduct() {
    let index = document.querySelector("#index").value;
    const size = document.querySelectorAll("input[name='size']:checked");
    const sizeItems = [];
    for (let s in size) {
        if (Object.hasOwnProperty.call(size, s)) {
            sizeItems.push(size[s].value);
        }
    }
    listProducts[index] = {
        productId: document.querySelector("#productId").value,
        productName: document.querySelector("#productName").value,
        importPrice: document.querySelector("#importPrice").value,
        exportPrice: document.querySelector("#exportPrice").value,
        importDate: document.querySelector("#importDate").value,
        size: sizeItems,
        type: document.querySelector('input[name = "type"]:checked').value,
        description: document.querySelector("#description").value,
    }
    localStorage.setItem('product', JSON.stringify(listProducts));
    alert("Sửa thành công!");
    renderData(currentPage);
}
// delete
function deleteProduct(index) {
    let choice = confirm(`Bạn có muốn xóa SP ${listProducts[index].productName} hay không?`);
    if (choice == true) {
        listProducts.splice(index, 1);
        localStorage.setItem('product', JSON.stringify(listProducts));
        alert("Xóa thành công!");
        renderData(1);
    }
}
// search
let btnSearch = document.querySelector("#btn-search");
btnSearch?.addEventListener('click', function () {
    searchProduct();
});
function searchProduct() {
    let searchValue = document.querySelector("#search").value.trim();
    let listProductSearch = localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')) : [];
    listProducts = listProductSearch.filter(product => product.productName.includes(searchValue));
    renderData(1);
}
window.onload = renderData(1);

// ============= Customer List ====================================
