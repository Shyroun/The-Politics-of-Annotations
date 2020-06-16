let annotations = new Object();
var pics = new Array();

var imagesWidth = 400;

loadXMLDoc();

function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", "/database/task/annotations.xml", true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            loadInformation(this);
            createImages();
            displayInformation();
            imageCanvas();
        }
    };
}

function loadInformation(xml) {
    const xmlDoc = xml.responseXML;
    const images = xmlDoc.getElementsByTagName("image");

    annotations = [].slice.call(images).map(function (image) {
        return {
            imageName: image.getAttribute('name'),
            id: image.getAttribute('id'),
            width: image.getAttribute('width'),
            height: image.getAttribute('height'),
            elements: [].slice.call(image.children).map(function (element) {
                return {
                    type: element.nodeName,
                    xtl: element.getAttribute('xtl'),
                    ytl: element.getAttribute('ytl'),
                    xbr: element.getAttribute('xbr'),
                    ybr: element.getAttribute('ybr'),
                    label: element.getAttribute('label'),
                    points: element.getAttribute('points'),
                    z_order: element.getAttribute('z_order'),
                    occluded: element.getAttribute('occluded'),
                    attributes: [].slice.call(element.children).map(function (attribute) {
                        return {
                            name: attribute.getAttribute('name'),
                            content: attribute.textContent
                        }
                    })
                }
            })
        }
    });
    console.log(annotations);
}

function createImages() {

    for (var i = 0; i < annotations.length; i++) {

        var container = document.createElement("div"); //1. create new container
        container.setAttribute("id", i)

        var imageContainer = document.createElement("div");
        imageContainer.setAttribute("class", "imageContainer");
        imageContainer.setAttribute("id", "imageContainerID" + i);

        var image = document.createElement("img"); //2. access Image from Database and create new Image
        image.setAttribute("id", "imageID_" + i);
        image.src = "/database/task/images/" + annotations[i].imageName;
        image.setAttribute("class", "AnnotationImages")
        image.width = 300;

        var src = document.getElementById('x'); //3. access container from webpage

        container.appendChild(imageContainer);
        src.appendChild(container);
    }
}

function imageCanvas() {
    for (var i = 0; i < annotations.length; i++) {
        var canvas = document.createElement("canvas");
        canvas.setAttribute("class", "myCanvas");
        canvas.setAttribute("id", "canvasID_" + i);

        document.getElementById("imageContainerID" + i).appendChild(canvas);
    }
    for (var i = 0; i < annotations.length; i++) {
        loadImage(i);
        var canvas_ = document.getElementById("canvasID_" + i);
        var ctx = canvas_.getContext("2d");
    }
}

function loadImage(i) {
    var img = new Image();
    var imageWidth = annotations[i].width;
    var imageHeight = annotations[i].height;
    var canvas = document.getElementById("canvasID_" + i);
    var ctx = canvas.getContext("2d");
    var scaleNum = imagesWidth / imageWidth;
    //var scaleNum = 0.5;
    //canvas.height = canvas.width * (imageHeight / imageWidth);
    canvas.height = imageHeight * scaleNum;
    canvas.width = imageWidth * scaleNum;

    var imgName = annotations[i].imageName;

    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        var elements_ = annotations[i].elements;
        elements_.forEach(function (element, index) {
            if (element.type == "box") displayBox(ctx, element, scaleNum);
        })
    }
    img.src = "/database/task/images/" + imgName;
}

function displayBox(ctx_, element, scaleNum) {
    ctx_.lineWidth = "3*scaleNum";
    ctx_.strokeStyle = "red";

    ctx_.beginPath();
    ctx_.rect(element.xtl * scaleNum, element.ytl * scaleNum, (element.xbr - element.xtl) * scaleNum, (element.ybr - element.ytl) * scaleNum);
    ctx_.stroke();
}

function displayInformation() {

    var container = document.getElementById("x");
    var subContainer = container.children;

    annotations.forEach(function (img, index) {
        var subContainerText = document.createElement("div"); //create Container for Text
        subContainerText.setAttribute("class", "AnnotationTextContainer");

        var headLine = document.createElement("h3"); //create Headline
        headLine.setAttribute("class", "AnnotationHeadline")
        var text = document.createTextNode("Image ID: " + img.id);

        var subHeadline = document.createElement("h4");
        var paragraph = document.createElement("p"); //create text
        subHeadline.setAttribute("class", "AnnotationSubeHeadline");
        paragraph.setAttribute("class", "AnnotationText");
        var newText = document.createTextNode("annotations: ");

        headLine.appendChild(text); //add the text to the actualy paragraphs
        subHeadline.appendChild(newText);
        paragraph.appendChild(document.createElement("br"));

        img.elements.forEach(function (elements_) {
            /**
            var elementsText = document.createTextNode("type: " + elements_.type);
            paragraph.appendChild(elementsText);
            paragraph.appendChild(document.createElement("br")); */

            elements_.attributes.forEach(function (attributes_) {
                if (attributes_.content != "") {
                    var attributeNamesText = document.createTextNode(attributes_.name + ": " + attributes_.content);
                    paragraph.appendChild(attributeNamesText);
                    paragraph.appendChild(document.createElement("br"));
                }
            });
            paragraph.appendChild(document.createElement("br"));
        });
        subContainerText.appendChild(headLine); //add all Elements to the Container
        subContainerText.appendChild(document.createElement("br"));
        subContainerText.appendChild(subHeadline);
        subContainerText.appendChild(paragraph);
        subContainer[index].appendChild(subContainerText);
    });
}





//############ CODE DUMP ##############
