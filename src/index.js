//The endpoints you will need are:

// GET /ramens
// GET /ramens/:id
// PATCH /ramens/:id

// See all ramen images in the div with the id of ramen-menu. When the page loads, request the data from the server to get all the ramen objects. Then, display the image for each of the ramen using an an img tag inside the #ramen-menu div.

const ramenMenu = document.querySelector('div#ramen-menu')
const ramenDetail = document.querySelector('div#ramen-detail')
const ramenForm = document.querySelector('form#ramen-rating')


fetch('http://localhost:3000/ramens')
    .then(resp => resp.json())
    .then(data => {
        data.forEach((image) => {ramenImg(image)})
    })


function ramenImg(data){
const menuImg = document.createElement('img')
menuImg.dataset.id = data.id 
menuImg.src = data.image
ramenMenu.append(menuImg)
}

// Click on an image from the #ramen-menu div and see all the info about that ramen displayed inside the #ramen-detail div, as well as the current rating and comment for the ramen displayed in the #ramen-rating form.



ramenMenu.addEventListener('click', event => {
    ramenDetail.dataset.id = event.target.dataset.id 
    ramenForm.dataset.id = event.target.dataset.id 
    const detailImg = ramenDetail.querySelector('img.detail-image')
    const name = ramenDetail.querySelector('h2.name')
    const restaurant = ramenDetail.querySelector('h3.restaurant')
    const rating = ramenForm.querySelector('input#rating')
    const comment = ramenForm.querySelector('textarea#comment')

    // console.log(detailImg)
    // console.log(name)
    // console.log(rating)

    fetch(`http://localhost:3000/ramens/${event.target.dataset.id}`)
    .then(resp => resp.json())
    .then(data => {
        detailImg.src = data.image
        name.textContent = data.name 
        restaurant.textContent = data.restaurant
        rating.value = data.rating 
        comment.value = data.comment
    })
    })


    // Update the rating and comment for a ramen. When the #ramen-rating form is submitted, it should update the value on the server. Changes should also be reflected on the frontend (you can test this by submitting the form; clicking a different ramen image; then clicking the image for the ramen you updated - you should see the rating and comment that you submitted previously).

    ramenForm.addEventListener('submit', event =>{
        event.preventDefault()
        const rating = ramenForm.querySelector('input#rating').value 
        const comment = ramenForm.querySelector('textarea#comment').value

        

        fetch(`http://localhost:3000/ramens/${event.target.dataset.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ rating, comment  })
    
        })
            .then(resp => resp.json())
            .then(data => {
                rating.value = data.rating
                comment.value = data.comment
            })
    
    })
