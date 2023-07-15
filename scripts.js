var tabs = document.querySelectorAll(".tab");
var codeEditors = document.querySelectorAll(".code-editor");
var resultIframe = document.getElementById("resultIframe");
var toggleButton = document.getElementById("toggleButton");

function switchTab(tab) {
  tabs.forEach(function (t) {
    t.classList.remove("active");
  });
  codeEditors.forEach(function (editor) {
    editor.style.display = "none";
  });

  tab.classList.add("active");
  if (tab.dataset.tab === "html") {
    document.getElementById("htmlEditor").style.display = "block";
  } else if (tab.dataset.tab === "css") {
    document.getElementById("cssEditor").style.display = "block";
  } else if (tab.dataset.tab === "js") {
    document.getElementById("jsEditor").style.display = "block";
  } else if (tab.dataset.tab === "result") {
    updateResult();
  }
}

tabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    switchTab(tab);
  });
});

toggleButton.addEventListener("click", function () {
  var isActive = toggleButton.classList.toggle("active");
  if (isActive) {
    switchTab(tabs[0]);
  } else {
    switchTab(tabs[3]);
  }
});

function updateResult() {
  var htmlCode = document.getElementById("htmlEditor").textContent;
  var cssCode = document.getElementById("cssEditor").textContent;
  var jsCode = document.getElementById("jsEditor").textContent;

  var iframeDocument = resultIframe.contentDocument || resultIframe.contentWindow.document;
  iframeDocument.body.innerHTML = htmlCode;
  var styleElement = iframeDocument.createElement("style");
  styleElement.textContent = cssCode;
  iframeDocument.head.appendChild(styleElement);
  var scriptElement = iframeDocument.createElement("script");
  scriptElement.textContent = jsCode;
  iframeDocument.body.appendChild(scriptElement);
}

codeEditors.forEach(function (editor) {
  editor.addEventListener("input", updateResult);
});

function setInitialContent() {
  var htmlComment = "<!-- Start coding here -->";
  var cssComment = "/* Start coding here */";
  var jsComment = "// Start coding here ";
  document.getElementById("htmlEditor").textContent = htmlComment;
  document.getElementById("cssEditor").textContent = cssComment;
  document.getElementById("jsEditor").textContent = jsComment;
}

window.addEventListener("DOMContentLoaded", setInitialContent);
switchTab(tabs[0]);