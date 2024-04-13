'use strict'; 

import { getCurrentDate } from './utility.js';
import { isEmpty } from './utility.js';


const apiUrl10 = 'https://randomuser.me/api/?nat=CA&results=10';
const apiUrl1 = 'https://randomuser.me/api/?nat=CA&results=1';
let randomUserName;
let randomUserPic;
const staticPost1 = 
"Excited to announce the launch of our latest webpage project! 🚀 Explore our innovative design and seamless user experience that redefine online interaction. Join us on this journey of creativity and functionality as we push the boundaries of web development. #WebDesign #UserExperience #Innovation" + 
"Feel free to customize it further to fit your project\'s specifics and your personal style!";

const staticPost2 = "Proud to unveil our newest webpage project! 💻 Dive into the world of cutting-edge design and intuitive functionality. Experience firsthand the power of seamless navigation and captivating visuals. Join us as we elevate online presence to new heights. #WebDevelopment #DesignExcellence #DigitalInnovation";

function getRandomUserAPI() {
  const promise = new Promise(resolve => {
    fetch(apiUrl10)
      .then(response => {
        if (response.ok === true) {
          resolve(response.json());
        } else {
            resolve("{}");
        }
      });
  });

  promise.then( value => {
    console.log(value);
    showUsers(value.results)
  }
  );
}

function getTopRandomUserAPI(post,postImage) {
    const promise = new Promise(resolve => {
      fetch(apiUrl1)
        .then(response => {
          if (response.ok === true) {
            resolve(response.json());
          }
        });
    });
  
    promise.then( value => {
      console.log(value);
      const user = value.results[0];
      randomUserName = `${user.name.first} ${user.name.last}`;
      randomUserPic = user.picture.thumbnail;
      createPostDiv(post, undefined,postImage);
    }
    );
  }
  

function showUsers(userList) {
    userList.forEach(user => {
        const userCity = user.location.city;
        const userName = `${user.name.first} ${user.name.last}`;
        const userPicture = user.picture.thumbnail;
        console.log(`showing user ${userCity} ${userName} ${userPicture}`);
        addToRightDivUserList(userCity, userName, userPicture);
    });
}

function addToRightDivUserList(city, name, picture) {
    const randomUserList = document.getElementById("random-user");
    const userCardDiv = createUserCard(city, name, picture);
    randomUserList.appendChild(userCardDiv);
}



getRandomUserAPI();
getTopRandomUserAPI(staticPost1,'./assets/media/post1.png');
getTopRandomUserAPI(staticPost2,'./assets/media/post2.jpg');

function createUserCard(city, name, picture) {
    const cardParentDiv = document.createElement('div');
    const cardImage = document.createElement('img');
    const detailsDiv = document.createElement('div');
    const nameHeading = document.createElement('h3');
    const locationParagrpah = document.createElement('p');
    const addIcon = document.createElement('i');

    cardParentDiv.classList.add('card-parent-div');
    detailsDiv.classList.add('card-details-div');
    nameHeading.classList.add('random-user-name');
    locationParagrpah.classList.add('random-user-location');
    cardImage.classList.add('random-user-image');

    cardImage.src = picture;
    cardImage.alt = `${name} profile image`;
    cardImage.id = "randomUserPic";

    nameHeading.textContent = name;

    locationParagrpah.textContent = city;

    addIcon.classList.add('fa-solid');
    addIcon.classList.add('fa-square-plus');

    cardParentDiv.appendChild(cardImage);
    cardParentDiv.appendChild(detailsDiv);
    cardParentDiv.appendChild(addIcon);

    detailsDiv.appendChild(nameHeading);
    detailsDiv.appendChild(locationParagrpah);

    return cardParentDiv;
}

// Adding Post

document.getElementById('postButton').addEventListener('click', function(event) {
    event.preventDefault(); 
    // Get post text
    const postText = document.getElementById('postText').value;

    // Get uploaded image file
    const imageFile = document.getElementById('imageInput').files[0];

    createPostDiv(postText, imageFile);
    getTopRandomUserAPI();
});

function createPostDiv(postText, imageFile, localImage) {
     
 
     if(isEmpty(postText) && isEmpty(imageFile)) {
         return;
     }
 
     // Create the post container
     let postContainer = document.createElement('div');
     postContainer.classList.add('post-section');
     postContainer.classList.add('post-container');
 
     // Create the first post row
     let postRowHeader = document.createElement('div');
     postRowHeader.classList.add('post-row');
 
     // Create the user info container
     let userInfoContainer = document.createElement('div');
     userInfoContainer.classList.add('user-info-container');
 
     // Create the user image
     let userImg = document.createElement('img');
     userImg.src = randomUserPic;
     userImg.alt = `${randomUserName} picture`;
     userImg.id = "postUserPic";
 
     // Create the user info
     let userInfo = document.createElement('h3');
     userInfo.classList.add('user-info');
     userInfo.textContent = randomUserName;
 
     // Append user image and user info to user info container
     userInfoContainer.appendChild(userImg);
     userInfoContainer.appendChild(userInfo);
 
     // Create the post date
     let postDate = document.createElement('div');
     postDate.classList.add('post-date');
     postDate.textContent = getCurrentDate();
 
     // Append user info container and post date to the first post row
     postRowHeader.appendChild(userInfoContainer);
     postRowHeader.appendChild(postDate);
 
     // Create the second post row
     let postRowContent = document.createElement('div');
     postRowContent.classList.add('post-row');
 
     // Create the paragraph element
     let paragraph = document.createElement('p');
     paragraph.textContent = postText;
 
     // Append paragraph to the second post row
     postRowContent.appendChild(paragraph);
     // console.log(imageFile);
     let postRowImage = document.createElement('div');
     if (imageFile != null && imageFile != undefined && imageFile != "") {
 
         
         postRowImage.classList.add('post-row');
     
         // Create the image element
         let postImage = document.createElement('img');
        // postImage.src = "./assets/media/post-pic.jpg";
         postImage.alt = "Uploaded Image";
        postImage.id = "post-pic";
         let reader = new FileReader();
         reader.onload = function() {
             postImage.src = reader.result;
            
         };
         reader.readAsDataURL(imageFile);
          postRowImage.appendChild(postImage);
     } else if(imageFile === undefined && localImage != undefined) {
         
        postRowImage.classList.add('post-row');
     
        // Create the image element
        let postImage = document.createElement('img');
       postImage.src = localImage;
       postImage.alt = "Uploaded Image";
       postImage.id = "post-pic";
        postRowImage.appendChild(postImage);
     }
 
     // Append all post rows to the post container
     postContainer.appendChild(postRowHeader);
     postContainer.appendChild(postRowContent);
     postContainer.appendChild(postRowImage);
 
     // Append post container to the document body
     document.body.appendChild(postContainer);
     document.getElementById('postsSection').insertBefore(postContainer, postsSection.firstChild);
     
     // clear everything after post
     document.getElementById('postText').value = '';
     document.getElementById('fileLabel').innerHTML = '';
     document.getElementById('imageInput').value = '';
}

// Get the file input element and the file label element
let imageInput = document.getElementById('imageInput');
let fileLabel = document.getElementById('fileLabel');

// Add event listener to the file input
imageInput.addEventListener('change', function() {
    // Check if files are selected
    if (imageInput.files.length > 0) {
        // Get the filename of the first selected file
        let filename = imageInput.files[0].name;
        // Update the file label with the filename
        fileLabel.textContent = filename;
    }
});
