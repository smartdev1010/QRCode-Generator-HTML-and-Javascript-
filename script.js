var padding = 0;
var paddingColor = "#ffffff";
var foreColor = "#000000";
var backColor = "#ffffff";
var qrCodeWidth = 100;
var qrCodeHeight = 100;
var currentPos = { x: 20, y: 20 };
var moveStart = { x: 0, y: 0 };
var state = 0;

function generateSimpleQRCode() {
  state = 1;
  var element = document.getElementById("qrcode");

  var childs = element.children;
  while (childs.length > 0) {
    element.removeChild(childs[0]);
  }

  let website = document.getElementById("website").value;
  if (website) {
    const qrCode = new QRCodeStyling({
      width: qrCodeWidth - padding * 2,
      height: qrCodeHeight - padding * 2,
      type: "img",
      data: "https://www.facebook.com/",
      dotsOptions: {
        color: foreColor,
      },
      cornersSquareOptions: {
        color: "#123456",
      },
      cornersDotOptions: {
        color: "#656565",
      },
      backgroundOptions: {
        // gradient: {
        //   type: "radial",
        //   colorStops: [
        //     { offset: 0, color: "blue" },
        //     { offset: 1, color: "red" },
        //   ],
        // },
        color: "#ffffff00",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 20,
      },
    });

    qrCode.append(document.getElementById("qrcode"));
    document.getElementsByTagName('svg')[0].setAttribute('class', 'shadow');
  } else {
    alert("Please enter a valid URL");
  }
}

function generateCircleQRCode() {
  state = 2;
  var element = document.getElementById("qrcode");
  element.style.position = "relative";
  element.innerHTML = "";

  new QRCode(element, {
    text: "this is random qrcode",
    width: qrCodeWidth,
    height: qrCodeHeight,
    colorDark: "#50ff50",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });
  document.getElementsByTagName("img")[0].style.border = "5px solid black";
  element.style.height = qrCodeHeight + "px";
  element.style.width = qrCodeWidth + "px";
  document.getElementsByTagName("img")[0].style.borderRadius = "50%";
  element.style.display = "flex";
  element.style.alignItems = "center";
  element.style.justifyContent = "center";
  var childs = element.children;
  for (var i = 0; i < childs.length; i++) element.removeChild(childs[i]);

  let website = document.getElementById("website").value;
  if (website) {
    var tmpElement = document.createElement("div");
    const qrCode = new QRCodeStyling({
      width: Math.sqrt((qrCodeWidth * qrCodeWidth) / 2) - padding * 2,
      height: Math.sqrt((qrCodeHeight * qrCodeHeight) / 2) - padding * 2,
      type: "img",
      data: "https://www.facebook.com/",
      // image: "linear-gradient(red, yellow, green)",
      dotsOptions: {
        color: foreColor,
      },
      cornersSquareOptions: {
        color: "#123456",
      },
      cornersDotOptions: {
        color: "#656565",
      },
      backgroundOptions: {
        // gradient: {
        //   type: "radial",
        //   colorStops: [
        //     { offset: 0, color: "blue" },
        //     { offset: 1, color: "red" },
        //   ],
        // },
        color: "#ffffffff",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 20,
      },
    });

    qrCode.append(tmpElement);
    tmpElement.style.position = "absolute";
    document.getElementById("qrcode").appendChild(tmpElement);
    document.getElementsByTagName('svg')[0].setAttribute('class', 'shadow');
    document.getElementsByTagName("img")[0].style.boxShadow =
      "2px 2px 2px black";
  } else {
    alert("Please enter a valid URL");
  }
}

function saveAsImage() {
  var container = document.getElementById("result-panel"); /* full page */
  html2canvas(container,  {
    allowTaint: true,
    useCORS: true
  }).then(function (canvas) {
    var link = document.createElement("a");
    document.body.appendChild(link);
    link.download = "html_image.jpg";
    link.href = canvas.toDataURL('image/jpeg', 1.0);
    link.target = "_blank";
    link.click();
  });
}

function paddingChange(e) {
  padding = e.target.value;
  document.getElementById("qrcode").style.padding = padding;
  generateQRCode();
}

function paddingColorChange(e) {
  paddingColor = e.target.value;
  document.getElementById("qrcode").style.backgroundColor = paddingColor;
}

function foregroundColorChange(e) {
  foreColor = e.target.value;
  generateQRCode();
}

function backgroundColorChange(e) {
  backColor = e.target.value;
  generateQRCode();
}

var rectEle = document.getElementsByClassName("rect")[0];
var rectSizeEle = document.getElementsByClassName("corner")[0];

var down = 0;

rectEle.addEventListener(
  "mousedown",
  function (event) {
    down = 1;
    moveStart = { x: event.x, y: event.y };
  },
  true
);

rectSizeEle.addEventListener(
  "mousedown",
  function (event) {
    down = 2;
    moveStart = { x: event.x, y: event.y };
  },
  true
);

window.addEventListener(
  "mouseup",
  function (event) {
    if (down == 2) {
      (qrCodeWidth = qrCodeWidth + event.x - moveStart.x),
        (qrCodeHeight = qrCodeHeight + event.y - moveStart.y),
        (moveStart = { x: event.x, y: event.y });
      document.getElementsByClassName("rect")[0].style.width = qrCodeWidth;
      document.getElementsByClassName("rect")[0].style.height = qrCodeHeight;
      state == 1 ? generateSimpleQRCode() : generateCircleQRCode();
    }
    down = 0;
  },
  true
);

document.addEventListener(
  "mousemove",
  function (event) {
    event.preventDefault();
    if (down == 1) {
      currentPos = {
        x: currentPos.x + event.x - moveStart.x,
        y: currentPos.y + event.y - moveStart.y,
      };
      moveStart = { x: event.x, y: event.y };
      document.getElementsByClassName("rect")[0].style.left = currentPos.x;
      document.getElementsByClassName("rect")[0].style.top = currentPos.y;

      document.getElementById("qrcode-container").style.left = currentPos.x;
      document.getElementById("qrcode-container").style.top = currentPos.y;
    }
    if (down == 2) {
      (qrCodeWidth = qrCodeWidth + event.x - moveStart.x),
        (qrCodeHeight = qrCodeHeight + event.y - moveStart.y),
        (moveStart = { x: event.x, y: event.y });
      document.getElementsByClassName("rect")[0].style.width = qrCodeWidth;
      document.getElementsByClassName("rect")[0].style.height = qrCodeHeight;
    }
  },
  true
);
