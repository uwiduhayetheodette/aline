let books = JSON.parse(localStorage.getItem("books")) || [];


function show(page){
["dashboard","books","borrow","return","reports"].forEach(p=>{
document.getElementById(p).classList.add("hidden");
});
document.getElementById(page).classList.remove("hidden");
loadAll();
}


function addBook(){
let t = title.value.trim();
let a = author.value.trim();

if(!t || !a){
alert("Fill all fields");
return;
}

books.push({title:t,author:a,status:"available",student:""});
localStorage.setItem("books",JSON.stringify(books));

title.value="";
author.value="";

loadAll();
}


function displayBooks(){
let html = "<tr><th>Title</th><th>Author</th><th>Status</th><th>Action</th></tr>";

books.forEach((b,i)=>{
html += `
<tr>
<td>${b.title}</td>
<td>${b.author}</td>
<td class="status-${b.status}">${b.status}</td>
<td><button onclick="del(${i})">Delete</button></td>
</tr>`;
});

bookTable.innerHTML = html;
}


function del(i){
books.splice(i,1);
localStorage.setItem("books",JSON.stringify(books));
loadAll();
}

function borrowBook(){
let i = borrowSelect.value;
let s = student.value.trim();

if(!s){
alert("Enter student name");
return;
}

books[i].status = "borrowed";
books[i].student = s;

localStorage.setItem("books",JSON.stringify(books));
student.value="";
loadAll();
}


function returnBook(){
let i = returnSelect.value;

books[i].status = "available";
books[i].student = "";

localStorage.setItem("books",JSON.stringify(books));
loadAll();
}


function loadSelects(){
borrowSelect.innerHTML="";
returnSelect.innerHTML="";

books.forEach((b,i)=>{
if(b.status=="available"){
borrowSelect.innerHTML += `<option value="${i}">${b.title}</option>`;
}else{
returnSelect.innerHTML += `<option value="${i}">${b.title} (${b.student})</option>`;
}
});
}

function filter(type){
let html = "<tr><th>Title</th><th>Status</th><th>Student</th></tr>";

books.forEach(b=>{
if(type=="all" || b.status==type){
html += `<tr><td>${b.title}</td><td>${b.status}</td><td>${b.student||"-"}</td></tr>`;
}
});

reportTable.innerHTML = html;
}


function dashboard(){
totalBooks.innerText = "Books: " + books.length;
borrowedBooks.innerText = "Borrowed: " + books.filter(b=>b.status=="borrowed").length;
}

function loadAll(){
displayBooks();
loadSelects();
filter("all");
dashboard();
}

window.onload = loadAll;