const storage = document.querySelector('.storage');
const button = document.querySelector('button');

const myLibrary = [];

const dialog = document.querySelector("dialog");
const addButton = document.querySelector('#add');

addButton.addEventListener('click', (event) => {

    let selected = document.getElementById('selector');

    addBookToLibrary(document.getElementById('title').value,
     document.getElementById('author').value,
     document.getElementById('pages').value,
     selected.options[selected.selectedIndex].text);
    document.getElementById("myForm").reset();
});

function createCard() {
    myLibrary.forEach(Book => {
        console.log(Book.id);
        if (!document.getElementById(Book.id)) {
            const newCard = document.createElement('div');
            newCard.classList.add('book');
        
            const title = document.createElement('div');
            title.classList.add('title');
            title.textContent = Book.title;
            
            const author = document.createElement('div');
            author.classList.add('author');
            author.textContent = Book.author;
        
            const numOfPages = document.createElement('div');
            numOfPages.classList.add('numOfPages');
            numOfPages.textContent = Book.numOfPages;
        
            const id = document.createElement('div');
            id.setAttribute("id", Book.id);
            id.classList.add('code');
            id.textContent = Book.id;
        
            const status = document.createElement('div');
            status.classList.add('status');
            const statusButton = document.createElement('button');
            statusButton.setAttribute("type", "button");
            statusButton.textContent = Book.read;

            statusButton.addEventListener("click", (e) => {
                Book.read = Book.read === 'Read'? "Not Read" : "Read";
                statusButton.textContent = Book.read;
                if (Book.read === 'Read') {
                    newCard.style.backgroundColor = 'green';
                } else {
                    newCard.style.backgroundColor = 'orange';
                }

            });
        
            const deleteButton = document.createElement('div');
            deleteButton.setAttribute("id", "delete-button");
        
            const button = document.createElement('button');
            button.setAttribute("type", "button");
            button.textContent = "Delete";
        
            button.addEventListener("click", (e) => {
                const myDiv = e.target.parentElement.parentElement.querySelector('.code');
                const attributeValue = myDiv.getAttribute('id');
                 
                for (let i = 0; i < myLibrary.length; i++) {
                    if (myLibrary[i].id === attributeValue) {
                        myLibrary.splice(i, 1);
                    }
                }

                e.target.parentElement.parentElement.remove();
            });

            if (Book.read === 'Read') {
                newCard.style.backgroundColor = 'green';
            } else {
                newCard.style.backgroundColor = 'orange';
            }

            status.appendChild(statusButton);
        
            deleteButton.appendChild(button);
        
            newCard.appendChild(title);
            newCard.appendChild(author);
            newCard.appendChild(numOfPages);
            newCard.appendChild(id);
            newCard.appendChild(status);
            newCard.appendChild(deleteButton);
        
            storage.append(newCard);
        }
    });
}

class Book {
    constructor(title, author, numOfPages, read) {
        this.title = title;
        this.author = author;
        this.numOfPages = numOfPages;
        this.id = crypto.randomUUID();
        this.read = read;
    }

    get info() {
        return (this.title + ' ' 
            + this.author + ' ' 
            + this.numOfPages + ' ' 
            + this.id + ' ' 
            + this.read);
    }
}

function addBookToLibrary(title, author, numOfPages, read) {
    newBook = new Book(title, author, numOfPages, read);
    myLibrary.push(newBook);
    createCard();
}