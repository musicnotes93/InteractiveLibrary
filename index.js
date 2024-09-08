const myLibrary = [];

function Book(title, author, pages, rating) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.rating = rating;
  this.info = function() {
  return(this.title + " by " + this.author + ", " + this.pages + " pages; " + this.rating + " stars");
  };
}



document.getElementById("submit").addEventListener("click", function () {
var title1 = $('#title').val();
var author1 = $('#author').val();
var pages1 = $('#pages').val();
var rating1 = $('#rating').val();
var newBook = new Book(title1, author1, pages1, rating1);
myLibrary.push(newBook.info());
addBookToLibrary();
addPhoto();
  });
    
  var i = 0;
  function addBookToLibrary () {
    i++;
    const node = document.createElement("li");
        document.querySelector("ul").appendChild(node);
        node.innerHTML = myLibrary[i - 1];
  }

var j=0;
function addPhoto() {
  if (j < 6){
  j++;
  $("#addBook").append($("<img class='bookshelf' src='book" + j + ".png' id='book" + j + "'>").css("margin-left", "70px").animate({marginLeft: "0px"}, 1000).css("margin-left", "0px"));
} else {
  j=0;
  j++;
  $("#addBook").append($("<img class='bookshelf' src='book" + j + ".png'>"));
}
}


var modal = document.getElementById("myModal");
$("#form").click(function() {
  modal.style.display = "block";
})

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

$("#submit").click(function() {
    modal.style.display = "none";
  })






  









