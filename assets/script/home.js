'use strict'; 

const apiUrl = 'https://randomuser.me/api/?nat=CA&results=10';


function getRandomUserAPI() {
  const promise = new Promise(resolve => {
    fetch(apiUrl)
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

}

getRandomUserAPI();

