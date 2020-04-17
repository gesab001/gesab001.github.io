// var specialTopic = ["strife", "envy", "milk", "meat", "food", "soon", "gospel", "world", "head", "tail", "redeem", "save", "holy", "strength", "power", "hope", "adultery", "wife", "husband", "wise", "fire", "water", "hell", "perfect", "temple", "love", "wisdom", "understanding", "knowledge", "wrath", "fear", "mercy", "grace", "sanctuary", "pray", "time", "lamb", "Pharisee", "evil", "angel", "patience", "praise", "blessing", "heaven", "forgive", "faith", "idol", "Jesus", "sabbath", "God", "overcome", "sin"];
// let specialTopic = [...new Set(specialTopics)];
// specialTopic.sort();
// document.getElementById("topics").innerHTML = "hello";

    var xmlDoc;
    var specialTopic = [];
    var jsonTopicOriginal = [];
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //        // Typical action to be performed when the document is ready:
            var jsonO = JSON.parse(this.responseText);
            var txt = "hello";
            var topics = jsonO["topics"];
            for(var i=0; i<topics.length;i++){
                txt += topics[i]["name"];
                specialTopic.push(topics[i]["name"]);
                jsonTopicOriginal.push(topics[i]["name"]);

            }
            specialTopic.sort();
            document.getElementById("status").innerHTML = specialTopic;
        }else{
            document.getElementById("status").innerHTML = "error" ;

        }

    };
    xhttp.open("GET", "topics.json", true);
    xhttp.send();


xmlDoc;
xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        //        // Typical action to be performed when the document is ready:
        xmlDoc = xhttp.responseXML;
        loadBookSelection(xmlDoc);
        generateSpecialTopics(xmlDoc);
        getMinuteVerse();
        displayTodayChapter();
    }
    document.getElementById("status").innerHTML = this.status.toString();

};
xhttp.open("GET", "bible.xml", true);
xhttp.send();

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('timeDisplay').innerHTML =
        h + ":" + m + ":" + s;
    var timers = document.getElementsByClassName('timer');
    for (var x=0; x<timers.length; x++){
        timers[x].innerHTML = 60-s;
    }
    var t = setTimeout(startTime, 500);
    if (s=="00"){
        getMinuteVerse();
        generateSpecialTopics(xmlDoc);
        // displayTodayChapter();
    }
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}


function getMinuteVerse() {
    var txt = "";
    var verseID = getCurrentID(31102);
    // var chapterNumber = document.getElementById("chapterNumber").value;
    var path = "/bible/*//verse[@id="+verseID+"]";


    if (xmlDoc.evaluate) {
        var versesLeft = "<br>"+verseID + " of " + 31102 +" verses <br><br>";//result.childNodes[0].nodeValue;
        var nodes = xmlDoc.evaluate(path, xmlDoc, null, XPathResult.ANY_TYPE, null);
        var result = nodes.iterateNext();
        var title = "<h2>GENESIS TO REVELATION</h2><p class='timer'></p>" +versesLeft;
        var bookName = result.parentElement.parentElement.getAttribute("name"); //result.getElementsByTagName("book")[0].getAttribute("name");
        var chapterNumber = result.parentElement.getAttribute("number");//result.childNodes[0].parentElement.parentElement.getAttribute("number");;
        var verseNumber = result.getAttribute("number")+"<br>";
        var word = result.childNodes[0].nodeValue;

        txt += bookName + " "+ chapterNumber+":"+verseNumber+" " +word + "<br>";
        var txtPrint = bookName + " "+ chapterNumber+":"+verseNumber+" " +word;
        txt += "<button onclick='printVerse(\""+txtPrint+"\")'>Print</button>";
        // txt += "<button onclick='printVerse(\""+txtPrint+"\")'>Print WordSearch</button>";

        // Code For Internet Explorer
    } else if (window.ActiveXObject || xhttp.responseType == "msxml-document") {
        xmlDoc.setProperty("SelectionLanguage", "XPath");
        nodes = xmlDoc.selectNodes(path);
        for (i = 0; i < nodes.length; i++) {
            txt += nodes[i].childNodes[0].nodeValue + "<br>";
        }
    }
    document.getElementById("minuteVerseDisplay").innerHTML = txt;

}

function getCurrentID(totalVerses){

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    var date1 = new Date();
    var year = date1.getFullYear();
    var month = date1.getMonth();
    var day = date1.getDate();
    document.getElementById("dateDisplay").innerHTML = monthNames[month] + " " + day + ", " + year;
    var date2 = new Date(2018, 5, 23, 14, 45, 0, 0);
    var difference = date1.getTime() - date2.getTime();
    var minutesDifference = Math.floor(difference/1000/60)+1;
    var currentID=minutesDifference;
    // difference -= minutesDifference*1000*60;
    while (currentID > totalVerses){
        currentID = currentID - totalVerses;
    }
    //     document.getElementById("demo").innerHTML = "hello";
    // }
    // catch (e) {
    //     document.getElementById("demo").innerHTML = "hello1";
    //
    //

    return currentID;
}




function loadBookSelection(xml){
    var txt ="";
    var books = xml.getElementsByTagName("book");
    txt+="Book: <select id='bookNumber')";
    for(var i = -1; i < books.length; i++){

        try{
            txt+="<option value="+i+">";
            txt+=books[i].getAttribute("name");
            txt+="</option>";


        }
        catch(err) {
            document.getElementById("bookSelection").innerHTML = err.message + books.length;
        }

        // var bookName = books[i].getAttribute("name");

    }
    txt+="</select>";
    document.getElementById("bookSelection").innerHTML = txt;
    var chapterInput  = "Chapter: <input type='text' id='chapterNumber' name='chapterNumber'>";
    var chapterButton = "<button onclick='getChapter(document.getElementById(\"chapterNumber\").value)'>Get chapter</button>";

    document.getElementById("chapter").innerHTML = chapterInput + chapterButton;



}

function getBook(bookID){
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
// //        // Typical action to be performed when the document is ready:
//             xmlDoc = xhttp.responseXML;
    try {
        books = xmlDoc.getElementsByTagName("book");
        var txt = "";
        var book = books[bookID];
        var bookName = book.getAttribute("name"); //name of book
        txt+= "<p>"+bookName+"</p>";
        var chapters = book.getElementsByTagName("chapter"); //chapters in a book
        // txt+= "<p>"+"total chapters: " + chapters.length+"</p>";
        for (var v=0; v<chapters.length; v++ ){
            var chapter = chapters[v];
            var chapterNumber = chapter.getAttribute("number");
            txt+= "Chapter " + chapterNumber + "<br>";
            var verses = chapter.getElementsByTagName("verse");
            // txt+= "total verses: "+verses.length + "<br>";
            for (var x=0; x<verses.length; x++){
                verse = verses[x];
                var verseNumber = verse.getAttribute("number");
                var word = verse.childNodes[0].nodeValue;
                txt+=verseNumber+". "+word+"<br>";
            }
            txt+="<br>";
        }
        document.getElementById("demo").innerHTML = txt;
    }

        // adddlert("Welcome guest!");

    catch(err) {
        document.getElementById("demo").innerHTML = err.message;
    }
    // }
    // };
    // xhttp.open("GET", "http://giovanniwebsite.s3-website-ap-southeast-2.amazonaws.com/bible.xml", true);
    // xhttp.send();
}

function getChapter(chapterNumber) {
    var txt = "";
    var sel = document.getElementById("bookNumber");
    var bookName= sel.options[sel.selectedIndex].text;
    // var chapterNumber = document.getElementById("chapterNumber").value;
    var path = "/bible/book[@name='"+bookName+"']/chapter["+chapterNumber+"]/verse";
    if (xmlDoc.evaluate) {
        var nodes = xmlDoc.evaluate(path, xmlDoc, null, XPathResult.ANY_TYPE, null);
        var result = nodes.iterateNext();

        var verseCount = 1;
        while (result) {
            txt += verseCount + ". "+ result.childNodes[0].nodeValue + "<br>";
            result = nodes.iterateNext();
            verseCount+=1;
        }
        // Code For Internet Explorer
    } else if (window.ActiveXObject || xhttp.responseType == "msxml-document") {
        xmlDoc.setProperty("SelectionLanguage", "XPath");
        nodes = xmlDoc.selectNodes(path);
        for (i = 0; i < nodes.length; i++) {
            txt += nodes[i].childNodes[0].nodeValue + "<br>";
        }
    }
    document.getElementById("displaySearchResults").innerHTML = txt;

}

function getNextChapter(chapterNumber) {
    var nextChapter = parseInt(chapterNumber) +1;
    document.getElementById("chapterNumber").value = nextChapter;
    var txt = "";
    var sel = document.getElementById("bookNumber");
    var bookName= sel.options[sel.selectedIndex].text;
    // var chapterNumber = document.getElementById("chapterNumber").value;
    var path = "/bible/book[@name='"+bookName+"']/chapter["+nextChapter+"]/verse";
    if (xmlDoc.evaluate) {
        var nodes = xmlDoc.evaluate(path, xmlDoc, null, XPathResult.ANY_TYPE, null);
        var result = nodes.iterateNext();

        var verseCount = 1;
        while (result) {
            txt += verseCount + ". "+ result.childNodes[0].nodeValue + "<br>";
            result = nodes.iterateNext();
            verseCount+=1;
        }
        // Code For Internet Explorer
    } else if (window.ActiveXObject || xhttp.responseType == "msxml-document") {
        xmlDoc.setProperty("SelectionLanguage", "XPath");
        nodes = xmlDoc.selectNodes(path);
        for (i = 0; i < nodes.length; i++) {
            txt += nodes[i].childNodes[0].nodeValue + "<br>";
        }
    }
    document.getElementById("displaySearchResults").innerHTML = txt;

}

function getPreviousChapter(chapterNumber) {
    var nextChapter = parseInt(chapterNumber) -1;
    document.getElementById("chapterNumber").value = nextChapter;
    var txt = "";
    var sel = document.getElementById("bookNumber");
    var bookName= sel.options[sel.selectedIndex].text;
    // var chapterNumber = document.getElementById("chapterNumber").value;
    var path = "/bible/book[@name='"+bookName+"']/chapter["+nextChapter+"]/verse";
    if (xmlDoc.evaluate) {
        var nodes = xmlDoc.evaluate(path, xmlDoc, null, XPathResult.ANY_TYPE, null);
        var result = nodes.iterateNext();

        var verseCount = 1;
        while (result) {
            txt += verseCount + ". "+ result.childNodes[0].nodeValue + "<br>";
            result = nodes.iterateNext();
            verseCount+=1;
        }
        // Code For Internet Explorer
    } else if (window.ActiveXObject || xhttp.responseType == "msxml-document") {
        xmlDoc.setProperty("SelectionLanguage", "XPath");
        nodes = xmlDoc.selectNodes(path);
        for (i = 0; i < nodes.length; i++) {
            txt += nodes[i].childNodes[0].nodeValue + "<br>";
        }
    }
    document.getElementById("displaySearchResults").innerHTML = txt;

}

function getVerse(verseNumber) {
    var chapterNumber = document.getElementById("chapterNumber").value;
    var txt = "";
    var sel = document.getElementById("bookNumber");
    var bookName= sel.options[sel.selectedIndex].text;
    // var chapterNumber = document.getElementById("chapterNumber").value;
    var path = "/bible/book[@name='"+bookName+"']/chapter["+chapterNumber+"]/verse[@number="+verseNumber+"]";
    if (xmlDoc.evaluate) {
        var nodes = xmlDoc.evaluate(path, xmlDoc, null, XPathResult.ANY_TYPE, null);
        var result = nodes.iterateNext();

        var verseCount = 1;
        while (result) {
            txt += bookName + " " + chapterNumber + ":" + verseNumber + "<br>"+ result.childNodes[0].nodeValue + "<br>";

            txt += "<button onclick='printVerse(\""+txt+"\")'>Print</button>";
            result = nodes.iterateNext();
            verseCount+=1;
        }
        // Code For Internet Explorer
    } else if (window.ActiveXObject || xhttp.responseType == "msxml-document") {
        xmlDoc.setProperty("SelectionLanguage", "XPath");
        nodes = xmlDoc.selectNodes(path);
        for (i = 0; i < nodes.length; i++) {
            txt += nodes[i].childNodes[0].nodeValue + "<br>";
        }
    }
    document.getElementById("displaySearchResults").innerHTML = txt;

}

function getSearchResults() {
    var txt = "";
    var keyword = document.getElementById("searchKeyWord").value;
    // var chapterNumber = document.getElementById("chapterNumber").value;
    var path = "/bible//book//chapter//verse[contains(text(),'"+keyword+"')]";
    if (xmlDoc.evaluate) {
        var nodes = xmlDoc.evaluate(path, xmlDoc, null, XPathResult.ANY_TYPE, null);
        var result = nodes.iterateNext();

        var searchResultsArray = new Array();
        var verseCount = 1;
        while (result) {
            var item =  result.childNodes[0].nodeValue;
            var bookName = result.childNodes[0].parentElement.parentElement.parentElement.getAttribute("name");
            var chapterNumber = result.childNodes[0].parentElement.parentElement.getAttribute("number");
            var verseNumber = result.childNodes[0].parentElement.getAttribute("number");
            var reference = bookName + " " + chapterNumber + ":" + verseNumber + " ";
            txt += verseCount + ". " + reference + item;
            var txtPrint = reference + item;
            txt += "<button onclick='printVerse(\""+txtPrint+"\")'>Print</button><br>";

            searchResultsArray.push(item);
            result = nodes.iterateNext();
            verseCount+=1;
        }
        // getSpecialTopic(verseCount, searchResultsArray);
        // Code For Internet Explorer
    } else if (window.ActiveXObject || xhttp.responseType == "msxml-document") {
        xmlDoc.setProperty("SelectionLanguage", "XPath");
        nodes = xmlDoc.selectNodes(path);
        for (i = 0; i < nodes.length; i++) {
            txt += nodes[i].childNodes[0].nodeValue + "<br>";
        }
    }
    document.getElementById("displaySearchResults").innerHTML = txt;

}


function generateSpecialTopics(xmlDoc){
    var txt="";
    for (var i=0; i<specialTopic.length; i++){
        txt +="<hr>"+getSpecialTopics(xmlDoc,i);
    }
    document.getElementById("displayTotalResults").innerHTML = txt;

}

function getSpecialTopics(xmlDoc, i){
    var txt = "";
    var keyword = specialTopic[i];
    // var chapterNumber = document.getElementById("chapterNumber").value;
    var path = "/bible//book//chapter//verse[contains(text(),'"+keyword+"')]";
    if (xmlDoc.evaluate) {
        var nodes = xmlDoc.evaluate(path, xmlDoc, null, XPathResult.ANY_TYPE, null);
        var result = nodes.iterateNext();

        var searchResultsArray = new Array();
        var verseCount = 1;
        while (result) {
            var bookName = result.parentElement.parentElement.getAttribute("name"); //result.getElementsByTagName("book")[0].getAttribute("name");
            var chapterNumber = " "+result.parentElement.getAttribute("number")+":";//result.childNodes[0].parentElement.parentElement.getAttribute("number");;
            var verseNumber = result.getAttribute("number")+"<br>";
            var item =  bookName+chapterNumber+verseNumber+result.childNodes[0].nodeValue;
            txt += verseCount + ". "+ item + "<br>";
            searchResultsArray.push(item);
            result = nodes.iterateNext();
            verseCount+=1;
        }

        return displaySpecialTopic(verseCount, searchResultsArray, keyword);
        // Code For Internet Explorer
    } else if (window.ActiveXObject || xhttp.responseType == "msxml-document") {
        xmlDoc.setProperty("SelectionLanguage", "XPath");
        nodes = xmlDoc.selectNodes(path);
        for (i = 0; i < nodes.length; i++) {
            txt += nodes[i].childNodes[0].nodeValue + "<br>";
        }
    }
    // document.getElementById("demo").innerHTML = txt;

}
function displaySpecialTopic(total, nodesSearchResults, topicTitle ){
    var txt = "";
    var totalResults = total;
    var indexofTopic = jsonTopicOriginal.indexOf(topicTitle)
    var topicTitle = topicTitle.toUpperCase();
    var currentID = getCurrentID(totalResults);
    var verse = nodesSearchResults[currentID];
    var versesLeft = totalResults-currentID;
    txt += "<h2>"+topicTitle+"</h2><p class='timer'></p>";
    txt += versesLeft + " of " + totalResults + " verses";
    txt += "<p>" + verse + "</p>";
    txt += "<button onclick='printVerse(\""+verse+"\")'>Print</button>";
    // txt += "<button onclick='printVerse(\""+verse+"\")'>Delete Topic</button>";
    txt += "<form action=\"https://5bs5eujm0e.execute-api.ap-southeast-2.amazonaws.com/deletetopicstage/deletetopic\" method=\"get\">";
    txt += "<input hidden type=\"text\"  value=\""+indexofTopic + "\"name=\"topic\">";
    txt += "<input type=\"submit\" value=\"Delete topic\">";
    txt += "</form>";

    return txt;
}

function printVerse(input){
    var txt = "";
    var input0 = input.replace(/[\r\n]+/g, '');
    var input1 = input0.replace(/;/g, "");
    var input2 = input1.replace(/]/g, "");
    var verse = input2.replace(/\[/g, "");
    var arr = verse.split(" ");
    var res = arr.filter(function(e){return e});
    txt += "<div style=\"font-size:100px; page-break-after:always\">" + input + "</div>";
    for (var i=0; i<res.length; i++){
        txt+= "<div  style=\"padding-bottom: 50px; page-break-after:always; font-size:40vw; width=100%; text-align: center; border: 3px solid green\"><p>" + res[i] + "</p></div>";
    }
    var x = document.getElementsByTagName("BODY")[0];

    x.innerHTML = txt;
    // var divs = document.getElementsByTagName("div");
    // for ()
    window.print();
}

function printVerseWordSearch(input){
    var txt = "";
    var input0 = input.replace(/[\r\n]+/g, '');
    var input1 = input0.replace(/;/g, "");
    var input2 = input1.replace(/]/g, "");
    var verse = input2.replace(/\[/g, "");
    var arr = verse.split(" ");
    var res = arr.filter(function(e){return e});
    txt += "<table>";
    txt += "<th>love</th>";
    txt += "<th>love</th>";
    txt += "<th>love</th>";
    txt += "</table>";
    txt += "<div style=\"font-size:100px; page-break-after:always\">" + input + "</div>";
    for (var i=0; i<res.length; i++){
        txt+= "<div  style=\"padding-bottom: 50px; page-break-after:always; font-size:40vw; width=100%; text-align: center; border: 3px solid green\"><p>" + res[i] + "</p></div>";
    }
    var x = document.getElementsByTagName("BODY")[0];

    x.innerHTML = txt;
    // var divs = document.getElementsByTagName("div");
    // for ()
    window.print();
}
function  getTotalChapters(bookName) {
    var path = "/bible/book[@name='" + bookName + "']/chapter";
    var chapterCount = 0;
    if (xmlDoc.evaluate) {
        var nodes = xmlDoc.evaluate(path, xmlDoc, null, XPathResult.ANY_TYPE, null);
        var result = nodes.iterateNext();
        while (result) {
            result = nodes.iterateNext();
            chapterCount += 1;
        }
    }
    return chapterCount;
}


function getCurrentChapter(totalChapters){

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    var date1 = new Date();
    var year = date1.getFullYear();
    var month = date1.getMonth();
    var day = date1.getDate();
    document.getElementById("dateDisplay").innerHTML = monthNames[month] + " " + day + ", " + year;
    var date2 = new Date(2018, 6, 23, 14, 45, 0, 0);
    var difference = date1.getTime() - date2.getTime();
    var minutesDifference = Math.floor(difference/1000/60/60/24);
    var currentID=minutesDifference;
    // difference -= minutesDifference*1000*60;
    while (currentID > totalChapters){
        currentID = currentID - totalChapters;
    }
    //     document.getElementById("demo").innerHTML = "hello";
    // }
    // catch (e) {
    //     document.getElementById("demo").innerHTML = "hello1";
    //
    //

    return currentID;
}

function displayTodayChapter() {
    var txt = "";
    var bookName = "Revelation";
    var totalChapters = getTotalChapters(bookName);
    var chapterNumber = getCurrentChapter(totalChapters);
    // var chapterNumber = document.getElementById("chapterNumber").value;
    var path = "/bible/book[@name='" + bookName + "']/chapter[" + chapterNumber + "]/verse";
    if (xmlDoc.evaluate) {
        var nodes = xmlDoc.evaluate(path, xmlDoc, null, XPathResult.ANY_TYPE, null);
        var result = nodes.iterateNext();

        var verseCount = 1;
        while (result) {
            txt += verseCount + ". " + result.childNodes[0].nodeValue + "<br>";
            result = nodes.iterateNext();
            verseCount += 1;
        }
        // Code For Internet Explorer
    } else if (window.ActiveXObject || xhttp.responseType == "msxml-document") {
        xmlDoc.setProperty("SelectionLanguage", "XPath");
        nodes = xmlDoc.selectNodes(path);
        for (i = 0; i < nodes.length; i++) {
            txt += nodes[i].childNodes[0].nodeValue + "<br>";
        }
    }
    var x = document.getElementById("todayChapterDisplay");
    x.innerHTML += txt ;
    document.getElementById("todayChapterbutton").innerHTML = bookName + " " + chapterNumber;
    x.style.display = "none";
}

function showTodayChapter(){
    var x = document.getElementById("todayChapterDisplay");
    var y = document.getElementById("todayChapterbutton");
    if (x.style.display === "none") {
        x.style.display = "block";

    } else {
        x.style.display = "none";
    }

}

function hide(){
    var x = document.getElementById("displaySearchResults");
    var y = document.getElementById("hideShowButton");
    if (x.style.display === "none") {
        x.style.display = "block";
        y.innerText = "hide";

    } else {
        x.style.display = "none";
        y.innerText = "show";

    }
}
