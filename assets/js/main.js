window.addEventListener("load", function(){
    console.log("IZVINJAVAM SE STO KASNIM SA UPLOADAVNJEM PROJEKTA");
    let hamburger = this.document.querySelector("#hamburger");
    let isClicked = false;
    hamburger.addEventListener("click", openMenu);

    let links = this.document.querySelectorAll(".link");
    let bookmark = this.document.querySelector("#bookmark");

    links.forEach(link => {
        link.addEventListener("click", changeSlide);
    });

    let questionHeader = this.document.querySelectorAll(".question__header");
    let questionClick = false;
    let remember = "";
    let msg = "";
    let path;
    questionHeader.forEach(qh => {
        qh.addEventListener("click", showMsg);
    });

    let btnMail = this.document.querySelector("#btn__mail");
    let mail = document.querySelector("#mail");
    mail.addEventListener("blur", checkInput);
    btnMail.addEventListener("click", checkInput);

    function checkInput()
    {
        let msgId = document.querySelector("#msg");
        let regExpMail = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
        
        if(!regExpMail.test(mail.value))
        {
            mail.classList.add("input-error");

            msgId.classList.add("msg");
            msgId.innerText = "Whoops, make sure it’s an email";
        }
        else
        {
            mail.classList.remove("input-error");

            msgId.classList.remove("msg");
            msgId.innerText = "";
        }
    }
    function openMenu()
    {
        let hamburgerMenu = document.querySelector(".hamburger__menu"); 
        if(isClicked === false)
        {
            hamburgerMenu.classList.remove("d--none");
            isClicked = true;
        }
        else
        {
            hamburgerMenu.classList.add("d--none");
            isClicked = false;
        }
         
            
    }
    function changeSlide(e)
    {
        [].forEach.call(links, function(el){
            el.classList.remove("active");
        });
        e.preventDefault();
        this.classList.add("active");
        
        let imgPath, imgAlt, header, paragraph;
        switch(this.id)
        {
            case "simple":
                imgPath = "illustration-features-tab-1.svg";
                imgAlt = "Tab 1";
                header = "Bookmark in one click";
                paragraph = "Organize your bookmarks however you like. Our simple drag-and-drop interface gives you complete control over how you manage your favourite sites.";
                break;
            case "speedy":
                imgPath = "illustration-features-tab-2.svg";
                imgAlt = "Tab 2";
                header = "Intelligent search";
                paragraph = "Our powerful search feature will help you find saved sites in no time at all. No need to trawl through all of your bookmarks.";
                break;
            case "easy":
                imgPath = "illustration-features-tab-3.svg";
                imgAlt = "Tab 3";
                header = "Share your bookmarks";
                paragraph = "Easily share your bookmarks and collections with others. Create a shareable link that you can send at the click of a button.";
                break;
        }
        bookmark.innerHTML = `
        <div class="rectangle position--absolute"></div>
        <div id="bookmark__img" class="bookmark__img">
          <img src="assets/images/${imgPath}" alt="${imgAlt}">
        </div>

        <div id="bookmark__content" class="bookmark__content m--auto">
          <h2 class="f--weight-500">${header}</h2>
          <p>${paragraph}</p>
          <a href="#" class="btn btn--secondary">More info</a>
        </div>
        `;
    }
    function showMsg()
    {
        let paragraphHeight = this.nextElementSibling.lastElementChild.clientHeight + 61; //61 su margin top i bottom
        if(questionClick === true && remember !== this.nextElementSibling.innerText)
        {
            questionClick = false;
            ChangeCSStyle(path, msg, questionClick, paragraphHeight);
        }

        if(questionClick === true && remember === this.nextElementSibling.innerText)
        {
            questionClick = false;
            ChangeCSStyle(path, msg, questionClick, paragraphHeight);
        }
        else
        {
            remember = this.nextElementSibling.innerText;
            path = this.children[1].firstChild;
            msg = this.nextElementSibling;
            questionClick = true;
            ChangeCSStyle(path, msg, questionClick, paragraphHeight);
        }
    }
    function ChangeCSStyle(path, message, questionClick, height)
    {
        if(questionClick === true)
        {
            path.classList.add("arrow");
            message.style.height = height + "px";
        }
        else
        {
            message.style.height = "0";
            path.classList.remove("arrow");
        }
    }
});
