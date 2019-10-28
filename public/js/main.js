// this is a partially revealing module pattern - just a variation on what we've already done
const myVM = (() => {
    // get the user buttons and fire off an async DB query with Fetch

    let userButtons = document.querySelectorAll('.u-link'),
        lightbox = document.querySelector('.lightbox');

    function renderSocialMedia(social){
        return `<ul class='ul-social>
                    ${social.map(item => `<li>${item}</li>`).join('')}
                </ul>`
    }

    function parseUserData(person){
        let targetDiv = document.querySelector('.lb-content'),
            targetImg = lightbox.querySelector('img');

        let bioContent = `
        <p>${person.bio}</p>
        <h4>Social Media:</h4>`
        ${renderSocialMedia(person.SocialMedia)};

        console.log(bioContent);

        targetDiv.innerHTML = bioContent;
        targetImg.src = person.imgsrc;

        lightbox.classList.add('show-lb'); 
    }

    function getUserData(e){
        //let userID = e.getAttribute('href');
        e.preventDefault();

        let url = `/${this.getAttribute('href')}`; // 1,2 or 3
        let imgSrc = this.previousElementSibling.getAttribute('src');

        fetch(url)
            .then(res => res.json()) 
            .then(data =>{
                console.log(data)

                data.imgsrc = imgSrc;

                parseUserData(data)
            })
            .catch((err)=>{
                console.log(err)
            }) //res.json(result)
    }

    userButtons.forEach(button => button.addEventListener('click', getUserData));

    lightbox.querySelector('.close').addEventListener('click', function(){
        console.log('closing lb');
        lightbox.classList.remove('show-lb');
    });
})();

