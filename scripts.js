var imageUrls;
var i;
var range = 32;
var imgId = "image";

const ids = ["1", "2", "3", "4"];

function injectImages() {
  // Inside the fetch function add the api to your database
  fetch("Your image API Link goes here!", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      imageUrls = response.imageUrl;
      i = imageUrls.length - 1;
      fillHTML();
    })
    .catch((err) => alert(err));
}

function getSmallestDivId() {
  var res = 0;
  var height = 2147483647;

  for (var i = 0; i < ids.length; i++) {
    const div = document.getElementById(ids[i]);

    const childList = div.childNodes;

    var currHeight = 0;
    for (var j = 0; j < childList.length; j++) {
      const image = childList[j].firstChild;
      currHeight = currHeight + image.height;
    }

    if (currHeight < height) {
      res = i;
      height = currHeight;
    }
  }

  return res;
}

function fadeIn() {}

// indirect recursion because direct recursion wasn't working idk why -_-
function recursion() {
  var img = document.getElementById(imgId + (i + 1).toString());
  img.style.opacity = 1;
  if (range >= 0) fillHTML();
}

function fillHTML() {
  var div = document.createElement("div");
  div.className = "photo";

  var img = document.createElement("img");
  img.src = imageUrls[i];
  img.id = imgId + i.toString();
  i--;

  // disable the loadmore button
  if (i == -1) {
    range = 0;
    var loadMoreBtn = document.getElementById("load-more-button");
    loadMoreBtn.style.opacity = 0;
    loadMoreBtn.disabled = true;
  }

  var id = getSmallestDivId();
  const col = document.getElementById(ids[id]);

  if (range >= 0) img.setAttribute("onload", "recursion()");
  range--;

  div.appendChild(img);
  col.append(div);
}

function loadMore() {
  range = 16;
  fillHTML();
}
