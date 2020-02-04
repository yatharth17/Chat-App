var firebaseConfig = {
    apiKey: "AIzaSyCZhaCwm11wT3f_2R1jnlSCIIJVaVr4k-o",
    authDomain: "chat-app-1fddb.firebaseapp.com",
    databaseURL: "https://chat-app-1fddb.firebaseio.com",
    projectId: "chat-app-1fddb",
    storageBucket: "chat-app-1fddb.appspot.com",
    messagingSenderId: "930816572890",
    appId: "1:930816572890:web:100baa8af3f70a771794e3",
    measurementId: "G-V6MS8H9MVE"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var db=firebase.firestore();
if (!localStorage.getItem('name')) {
	name = prompt('What is your name?')
	localStorage.setItem('name', name)
} else {
	name = localStorage.getItem('name')
}
document.querySelector('#name').innerText = name

// Change name
document.querySelector('#change-name').addEventListener('click', () => {
	name = prompt('What is your name?')
	document.querySelector('#name').innerText = name
})

// Send a new chat message
document.querySelector('#message-form').addEventListener('submit', e => {
	e.preventDefault();
	db.collection("messages")
	.add({
		name: name,
		message: document.querySelector('#message-input').value 
	})
	.then(function (docRef) {
		console.log("Document written with ID: ", docRef.id);
		document.querySelector('#message-form').reset()
	})
	.catch(function (error) {
		console.error("Error adding document: ", error);
	});
})

// Display chat stream
db.collection("messages")
.onSnapshot(function(snapshot) {
	document.querySelector('#messages').innerHTML = ""
	snapshot.forEach(function(doc) {
		var message = document.createElement('div')
		message.innerHTML = `
		<p class="name">${doc.data().name}</p>
		<p>${doc.data().message}</p>
		`
		document.querySelector('#messages').prepend(message)
	});
});
//Clear Messages
document.querySelector('#clear').addEventListener('click', () => {
	db.collection("messages")
    .get()
    .then(function(snapshot) {
        snapshot.forEach(function(doc) {
			db.collection("messages").doc(doc.id).delete().then(function() {
				console.log("Document successfully deleted!");
			}).catch(function(error) {
				console.error("Error removing document: ", error);
			});
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
})