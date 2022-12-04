let featuredStory = 0;
let quill;
const offwhite = '#FAF9f6';
const NavBar = ['index', 'about', 'explore', 'tell-your-story']
const ideas = ['What made you smile/cry/angry recently?', 'What is currently on your mind?', 'What is a important moment in your life?', "What is a memory that you visit frequently?", "What should people know about you?", "What challenges have you faced in your life?", "What lessons have you learned from your experiences?"]

function onIndexLoad() {
    showRandomStory(featuredStory);
}

function loadEditor() {
    quill = new Quill('#editor', {
        theme: 'snow'
    });
}

function onArrowClickIndex(direction) {
    if (direction == 'left') {
        if (featuredStory == 0) {
            document.getElementById('dot' + featuredStory).style.backgroundColor = 'transparent';
            featuredStory = 4;
            document.getElementById('dot' + featuredStory).style.backgroundColor = offwhite;
        } else {
            document.getElementById('dot' + featuredStory).style.backgroundColor = 'transparent';
            featuredStory -= 1;
            document.getElementById('dot' + featuredStory).style.backgroundColor = offwhite;
        }
    }

    else {
        if (featuredStory == 4) {
            document.getElementById('dot' + featuredStory).style.backgroundColor = 'transparent';
            featuredStory = 0;
            document.getElementById('dot' + featuredStory).style.backgroundColor = offwhite;
        } else {
            document.getElementById('dot' + featuredStory).style.backgroundColor = 'transparent';
            featuredStory += 1;
            document.getElementById('dot' + featuredStory).style.backgroundColor = offwhite;
        }
    }

    showRandomStory(featuredStory);
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

function getHTML() {
    console.log(quill.root.innerHTML);
}