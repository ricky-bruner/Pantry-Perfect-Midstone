const loginAnimation = (e) => {
    if(e.target.parentElement.parentElement.className.includes("below")){
        let belowCard = document.querySelector(".below");
        let aboveCard = document.querySelector(".above");
        let parent = document.querySelector(".form-collection");
        parent.classList.add("animation-state-1");
        setTimeout(() => {
            belowCard.classList.remove("below");
            aboveCard.classList.remove("above");
            belowCard.classList.add("above");
            aboveCard.classList.add("below");
            setTimeout(() => {
                parent.classList.add("animation-state-finish");
                parent.classList.remove("animation-state-1");
                setTimeout(() => {
                    aboveCard.classList.add("turned");
                    belowCard.classList.remove("turned");
                    parent.classList.remove("animation-state-finish");
                }, 300);
            }, 10);
        }, 300);
    } 
}

export default loginAnimation;