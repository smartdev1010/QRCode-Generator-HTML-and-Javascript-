var padding = 0;
var paddingColor = "#ffffff";
var foreColor = "#000000";
var backColor = "#ffffff";

function generateQRCode() {
  var element = document.getElementById("qrcode");
  var childs = element.children;
  console.log(childs);
  for(var i = 0 ; i < childs.length; i ++)
    element.removeChild(childs[i]);
  let website = document.getElementById("website").value;
  if (website) {
    const qrCode = new QRCodeStyling({
      width: 256 - padding * 2,
      height: 256 - padding * 2,
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
        gradient: {
            type: 'radial',
            colorStops:[
                { offset:0, color: 'blue' },
                { offset:1, color: 'red' },
            ]
        }
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 20,
      },
    });

    qrCode.append(document.getElementById("qrcode"));
    // document.getElementById("qrcode-container").style.display = "block";
  } else {
    alert("Please enter a valid URL");
  }
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
