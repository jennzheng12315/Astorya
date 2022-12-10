let randomStory = 0;
let story = 0;
let page = 0;
let totalStories;
let quill;
let textEditorContent;
const offwhite = '#FAF9f6';
const NavBar = ['index', 'about', 'explore', 'tell-your-story']
const ideas = ['What made you smile/cry/angry recently?', 'What is currently on your mind?', 'What is a important moment in your life?', "What is a memory that you visit frequently?", "What should people know about you?", "What challenges have you faced in your life?", "What knowledge have you gained from your experiences?"]

let selected_tags;

function formatHtml(html) {
    var tab = "\t";
    var result = "";
    var indent = "";

    html.split(/>\s*</).forEach(function (element) {
        if (element.match(/^\/\w/)) {
            indent = indent.substring(tab.length);
        }

        result += indent + "<" + element + ">\r\n";

        if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith("input")) {
            indent += tab;
        }
    });

    return result.substring(1, result.length - 3);
}

const setUpIndent = function setUpIndentStyle() {
    const Parchment = Quill.import("parchment");
    class IndentAttributor extends Parchment.Attributor.Style {
        add(node, value) {
            if (value === 0) {
                this.remove(node);
                return true;
            } else {
                return super.add(node, `${value}em`);
            }
        }
    }

    let IndentStyle = new IndentAttributor("indent", "text-indent", {
        scope: Parchment.Scope.BLOCK,
        whitelist: ["1em", "2em", "3em", "4em", "5em", "6em", "7em", "8em", "9em"]
    });
    Quill.register(IndentStyle, true);
};

const setDefaultMargins = () => {
    const Block = Quill.import("blots/block");
    class Pblock extends Block {
        static create(value) {
            let node = super.create();
            node.setAttribute(
                "style",
                "margin-top:0in;margin-right:0in;margin-bottom:5.0pt;margin-left:0in;line-height:107%;"
            );
            return node;
        }
    }
    Quill.register(Pblock, true);
};
const customHeader = () => {
    const Block = Quill.import("formats/header");
    class Hblock extends Block {
        static create(value) {
            let node = super.create(value);
            node.setAttribute(
                "style",
                "margin-top:0in;margin-right:0in;margin-bottom:0in;margin-left:0in;line-height:107%;"
            );
            return node;
        }
        static formats(node) {
            return this.tagName.indexOf(node.tagName) + 1;
        }
    }
    Hblock.blotName = 'header';
    Hblock.tagName = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
    Quill.register(Hblock, true);
};

const setUpFonts = () => {
    var FontStyle = Quill.import("attributors/style/font");

}
const setUpQuill = function SetupQuill() {
    var AlignStyle = Quill.import("attributors/style/align");
    Quill.register(AlignStyle, true);
    var BackgroundStyle = Quill.import("attributors/style/background");
    Quill.register(BackgroundStyle, true);
    var ColorStyle = Quill.import("attributors/style/color");
    Quill.register(ColorStyle, true);
    var DirectionStyle = Quill.import("attributors/style/direction");
    Quill.register(DirectionStyle, true);
    var FontStyle = Quill.import("attributors/style/font");
    Quill.register(FontStyle, true);
    FontStyle.whitlelist = ['sans serif', 'serif', 'monospace'];
    var SizeStyle = Quill.import("attributors/style/size");
    SizeStyle.whitelist = ["12px", "16px", "18px", "32px"];
    Quill.register(SizeStyle, true);
    customHeader();
    setUpIndent();
    const toolbarOptions = [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],

        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction

        [{ size: ['small', false, 'large', 'huge'] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],

        ["clean"], // remove formatting button
        ["link"]
    ];
    setDefaultMargins();
    //setDefaultMarginsForH();
    const quill = new Quill("#editor", {
        modules: {
            toolbar: toolbarOptions,
        },
        theme: "snow"
    });
    // console.log(Quill.imports);
    quill.on("text-change", function (delta, source) {
        // console.log(formatHtml(
        //     quill.root.innerHTML
        // ));

        textEditorContent = formatHtml(quill.root.innerHTML);
    });
};

// document.addEventListener("DOMContentLoaded", () => {
//     setUpQuill();
// });

// -----------------------------------------------

function onIndexLoad(length) {
    windowAdjust();
    showRandomStory(randomStory, length);
    handlePlayPause(localStorage.getItem("animationMode"));
}

function onExploreLoad(length, filters) {
    totalStories = length;
    showStory(story);
    showPreview();
    handlePlayPause(localStorage.getItem("animationMode"));
    selected_tags = [];
    for (let i = 0; i < filters.length; i++) {
        let input = document.createElement("input");
        input.type = "text";
        input.value = filters[i];
        addTag(input);
    }
}

function onTellStoryLoad() {

    let input = document.getElementById('input-title');
    input.value = "";

    let el = document.getElementById('editor');
    if (typeof (el) != 'undefined' && el != null) {
        setUpQuill();
        formEnter();
    }
    handlePlayPause(localStorage.getItem("animationMode"));
    selected_tags = []
}

function onAboutLoad() {
    handlePlayPause(localStorage.getItem("animationMode"));
}

function handlePlayPause(mode) {
    if (document.querySelector('#play') == null || document.querySelector('#pause') == null) {
        return;
    }

    localStorage.setItem("animationMode", mode);

    if (mode == "play") {
        document.querySelector('#play').style.display = 'none';
        document.querySelector('#pause').style.display = 'block';
    } else {
        document.querySelector('#play').style.display = 'block';
        document.querySelector('#pause').style.display = 'none';
    }

}

function onArrowClickIndex(direction, length) {
    if (direction == 'left') {
        if (randomStory == 0) {
            document.getElementById('dot' + randomStory).style.backgroundColor = 'transparent';
            randomStory = length - 1;
            document.getElementById('dot' + randomStory).style.backgroundColor = offwhite;
        } else {
            document.getElementById('dot' + randomStory).style.backgroundColor = 'transparent';
            randomStory -= 1;
            document.getElementById('dot' + randomStory).style.backgroundColor = offwhite;
        }
    }

    else {
        if (randomStory == length - 1) {
            document.getElementById('dot' + randomStory).style.backgroundColor = 'transparent';
            randomStory = 0;
            document.getElementById('dot' + randomStory).style.backgroundColor = offwhite;
        } else {
            document.getElementById('dot' + randomStory).style.backgroundColor = 'transparent';
            randomStory += 1;
            document.getElementById('dot' + randomStory).style.backgroundColor = offwhite;
        }
    }

    showRandomStory(randomStory, length);
}

function onArrowClickExplore(direction) {
    if (direction == 'left') {
        if (story == 0) {
            story = totalStories - 1;
        } else {
            story -= 1;
        }
    }

    else {
        if (story == totalStories - 1) {
            story = 0;
        } else {
            story += 1;
        }
    }

    page = Math.floor(story / 10);
    showStory(story);
    showPreview();
}

function ideasClick() {
    let index = Math.floor(Math.random() * ideas.length);

    document.getElementById('ideas').innerHTML = ideas[index];
}

function showRandomStory(index, length) {
    for (let i = 0; i < length; i++) {
        if (index == i) {
            document.getElementById('random-story' + i).style.display = 'block';
        } else {
            document.getElementById('random-story' + i).style.display = 'none';
        }
    }
}

function showStory(index) {
    story = index;
    for (let i = 0; i < totalStories; i++) {
        if (index == i) {
            document.getElementById('story' + i).style.display = 'block';
        } else {
            document.getElementById('story' + i).style.display = 'none';
        }
    }
}

function showPreview() {
    for (let i = 0; i < totalStories; i++) {
        if (i >= page * 10 && i < (page + 1) * 10) {
            document.getElementById('preview' + i).style.display = 'inline';
        } else {
            document.getElementById('preview' + i).style.display = 'none';
        }
    }

    document.querySelector('#page-select').value = (page + 1).toString();
    checkPageArrows();
}

function onClickPageArrow(direction) {
    let lastPage = Math.ceil(totalStories / 10) - 1;
    if (direction == "left" && page > 0) {
        page -= 1;
    } else if (page < lastPage) {
        page += 1;
    }

    showPreview();
}

function onPageSelected() {
    page = parseInt(document.querySelector('#page-select').value) - 1;
    showPreview();
}

function checkPageArrows() {
    let lastPage = Math.ceil(totalStories / 10) - 1;

    if (lastPage == 0) {
        document.getElementById('page-arrow-left').style.visibility = 'hidden';
        document.getElementById('page-arrow-right').style.visibility = 'hidden';
        return;
    }
    if (page == 0) {
        document.getElementById('page-arrow-left').style.visibility = 'hidden';
        document.getElementById('page-arrow-right').style.visibility = 'visible';
    }
    if (page == lastPage) {
        document.getElementById('page-arrow-left').style.visibility = 'visible';
        document.getElementById('page-arrow-right').style.visibility = 'hidden';
    }
}

function getHTML() {
    // document.getElementById('input-content').value = formatHTML(quill.root.innerHTML);
    // console.log(quill.root.innerHTML);
    console.log(textEditorContent);
    document.getElementById('input-content').value = textEditorContent;
}

function getTags() {
    document.getElementById('input-tags').value = selected_tags;
}

function checkTitle() {
    let el = document.getElementById('input-title');
    if (el.value == null || el.value == "") {
        el.value = "Untitled";
    }
}

function handleSubmit() {
    getHTML()
    getTags()
    checkTitle()
}

function addTag(tag) {
    if (tag.value == undefined) return;
    let tags = document.getElementById("tags");
    let span = document.createElement("span");
    let val = tag.value.trim()
    span.classList.add("tag");
    span.textContent = tag.value;
    tag.value = "";

    span.setAttribute("onclick", "this.remove(); removeTag(this.textContent)");

    if (val != "") {
        if (!selected_tags.includes(val)) {
            tags.append(span);
        }
    }

    if (!selected_tags.includes(val)) {
        selected_tags.push(val)
    }
}


function removeTag(tag) {
    let index = selected_tags.indexOf(tag)
    if (index > -1) {
        selected_tags.splice(index, 1);
    }
}

function windowAdjust() {
    let width = window.innerWidth;
    if (width <= 768) {
        document.getElementById("mobile-version").style.display = 'block';
        document.getElementById("desktop-version").style.display = 'none';
    } else {
        document.getElementById("mobile-version").style.display = 'none';
        document.getElementById("desktop-version").style.display = 'float';
    }
}

function onFilterSubmit() {
    if (selected_tags.length > 0) {
        location.href = '/explore?filters=' + selected_tags.toString();
    } else {
        location.href = '/explore';
    }
}

function formEnter() {
    document.getElementById("story-form").addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            el = document.getElementById("tag-input");
            addTag(el)
            handleSubmit();
        }
    });
}