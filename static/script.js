let randomStory = 0;
let story = 0;
let page = 0;
// let animationMode;
let totalStories;
let quill;
const offwhite = '#FAF9f6';
const NavBar = ['index', 'about', 'explore', 'tell-your-story']
const ideas = ['What made you smile/cry/angry recently?', 'What is currently on your mind?', 'What is a important moment in your life?', "What is a memory that you visit frequently?", "What should people know about you?", "What challenges have you faced in your life?", "What lessons have you learned from your experiences?"]

// window.onload = function () {
//     console.log(localStorage.getItem("animationMode"));
//     handlePlayPause(localStorage.getItem("animationMode"));
// };

function onIndexLoad() {
    showRandomStory(randomStory);
    handlePlayPause(localStorage.getItem("animationMode"));
}

function onExploreLoad(length) {
    totalStories = length;
    showStory(story);
    showPreview();
    handlePlayPause(localStorage.getItem("animationMode"));
}

function onTellStoryLoad() {
    quill = new Quill('#editor', {
        theme: 'snow'
    });
    handlePlayPause(localStorage.getItem("animationMode"));
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

function onArrowClickIndex(direction) {
    if (direction == 'left') {
        if (randomStory == 0) {
            document.getElementById('dot' + randomStory).style.backgroundColor = 'transparent';
            randomStory = 4;
            document.getElementById('dot' + randomStory).style.backgroundColor = offwhite;
        } else {
            document.getElementById('dot' + randomStory).style.backgroundColor = 'transparent';
            randomStory -= 1;
            document.getElementById('dot' + randomStory).style.backgroundColor = offwhite;
        }
    }

    else {
        if (randomStory == 4) {
            document.getElementById('dot' + randomStory).style.backgroundColor = 'transparent';
            randomStory = 0;
            document.getElementById('dot' + randomStory).style.backgroundColor = offwhite;
        } else {
            document.getElementById('dot' + randomStory).style.backgroundColor = 'transparent';
            randomStory += 1;
            document.getElementById('dot' + randomStory).style.backgroundColor = offwhite;
        }
    }

    showRandomStory(randomStory);
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

    document.getElementById('ideas').innerHTML = ideas[index] + ' <button onclick="ideasClick()"><i class="fa-solid fa-shuffle"></i></button>'
}

function showRandomStory(index) {
    for (let i = 0; i < 5; i++) {
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
    console.log(quill.root.innerHTML);
}