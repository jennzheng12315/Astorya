let currentPage = 'index';
let featuredStory = 0;

const offwhite = '#FAF9f6';
const NavBar = ['index', 'about', 'explore', 'tell-your-story']
const ideas = ['What made you smile/cry/angry recently?', 'What is currently on your mind?', 'What is a important moment in your life?', "What is a memory that you visit frequently?", "What should people know about you?", "What challenges have you faced in your life?", "What lessons have you learned from your experiences?"]


window.onload = function () {
    let quill = new Quill('#editor', {
        theme: 'snow'
    });
}

function onNavBarClick(selected) {
    // for (let i = 0; i < NavBar.length; i++) {
    //     if (NavBar[i] == selected) {
    //         document.getElementById(NavBar[i]).style.textDecoration = 'underline';
    //     }
    //     else {
    //         document.getElementById(NavBar[i]).style.textDecoration = 'none';
    //     }
    // }
    currentPage = selected;
}

function onArrowClick(direction) {
    console.log(currentPage)
    if (currentPage == 'index') {
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

        if (direction == 'right') {
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
    }
}

function ideasClick() {
    index = Math.floor(Math.random() * ideas.length);

    document.getElementById('ideas').innerHTML = ideas[index] + ' <button onclick="ideasClick()"><i class="fa-solid fa-shuffle"></i></button>'
}

