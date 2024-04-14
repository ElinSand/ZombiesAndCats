
const url = `https://api.thecatapi.com/v1/images/search?limit=1`;
const api_key = "live_LpnbDhdhIspxFYLe9i03mbVecf1jyMFoE41TO9l3HutJM5dC2WUOpwbA4x7D73aW"

 fetch(url,{headers: {
      'x-api-key': api_key
    }})
 .then((response) => {
   return response.json();
 })
.then((data) => {
  let imagesData = data;
  imagesData.map(function(imageData) {
    
    let image = document.createElement('img');
    //use the url from the image object
    image.src = `${imageData.url}`;
        
    let gridCell = document.createElement('div');
    gridCell.classList.add('col');
    gridCell.classList.add('col-lg');
    gridCell.appendChild(image)
      
    document.getElementById('grid').appendChild(gridCell);
    
    });
})
.catch(function(error) {
   console.log(error);
});


function showNewCat() {
    const url = `https://api.thecatapi.com/v1/images/search?limit=1`;

    fetch(url, {
            headers: {
                'x-api-key': api_key
            }
        })
        .then(response => response.json())
        .then(data => {
            let imageData = data[0];

            let image = document.createElement('img');
            image.src = imageData.url;

            let gridCell = document.createElement('div');
            gridCell.classList.add('col');
            gridCell.classList.add('col-lg');
            gridCell.appendChild(image);

            document.getElementById('grid').innerHTML = ''; // Rensa tidigare bilder
            document.getElementById('grid').appendChild(gridCell);
        })
        .catch(error => {
            console.error('Error fetching new cat:', error);
        });
}

// Lägg till en händelselyssnare på knappen "Show New Cat"
document.getElementById('show-new-cat').addEventListener('click', showNewCat);
