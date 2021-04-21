//Selector

const filterInput = document.querySelector('#filter');
const productListUl = document.querySelector('.collection');
const nameInput = document.querySelector('.product-name');
const priceInput = document.querySelector('.product-price');
const addBtn = document.querySelector('.add-product');
const deleteBtn = document.querySelector('.delete-product');
const msg = document.querySelector('.message');



//data state

let productData = getDataFromLocalStorage();

function getDataFromLocalStorage(){
    let items = '';
    if(localStorage.getItem('productItems') === null){
        items = [];
    }else{
        items =JSON.parse(localStorage.getItem('productItems'));
    }
    return items; 
}

function saveDataToLocalStorage(item){
    let items = '';
    if(localStorage.getItem('productItems') === null){
        items = [];
        items.push(item);
        localStorage.setItem('productItems',JSON.stringify(items));
    }else{
        items = JSON.parse(localStorage.getItem('productItems'));
        items.push(item);
        localStorage.setItem('productItems',JSON.stringify(items));
    }
}

function deleteItemFromLocalStorage(id){
    let items = JSON.parse(localStorage.getItem('productItems'));
    let result = items.filter(productItem => {
        return productItem.id !== id;
      });
      localStorage.setItem('productItems',JSON.stringify(result));
      if(result.length === 0) location.reload();
}

function getData(productList){

    if (productData.length>0){
        let li = '';
        productList.forEach(({id,name,price}) => {
            //const {id,name,price} = data;
            li = document.createElement('li');
            li.className = 'list-group-item collection-item';
            li.id = `product-${id}`;
            li.innerHTML = `<strong>${name}</strong>-<span class="price">
            $${price}
        </span>
        <i class="fas fa-trash-alt float-right delete-product"></i>`;
        productListUl.append(li);
        msg.innerHTML = " ";
        });
    }else{
        showMessage("Please add item to your catalouge");
    }

}



//Add product function
const addProduct = evt=>{
    evt.preventDefault();

    const name = nameInput.value;
    const price = priceInput.value;
    let id;

    if(productData.length === 0){
        id = 0;
    }else{
        id = productData[productData.length -1].id + 1;
    }

    if(name === '' || price === '' || !(!isNaN(parseFloat(price)) && isFinite(price))){
        alert("Please fillup necessary information");
    } else{
        const data ={
            id,
            name,
            price,
        };
        productData.push(data);
        saveDataToLocalStorage(data);
        productListUl.innerHTML = '';
        getData(productData);
        nameInput.value = '';
        priceInput.value = '';
    }
}

//Delete Item function
const deleteProduct = e =>{
    if(e.target.classList.contains('delete-product')){

        //removing target from the ui
        const target = e.target.parentElement;
        e.target.parentElement.parentElement.removeChild(target);


        //removing item from the store.
        let id = Number(target.id.split('-')[1]);
        let result = productData.filter(productItem => {
            return productItem.id !== id;
          });
          productData = result;
        deleteItemFromLocalStorage(id);
        //result return array

    }

}
//Search product function
const filterProduct = e=>{
    let itemLength = 0;
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection .collection-item').forEach(item=>{
        const productName = item.firstElementChild.textContent.toLocaleLowerCase();
        if(productName.indexOf(text) === -1){
            item.style.display = 'none';
        }else{
            item.style.display = 'block';
            itemLength ++; 
        }   
        
        itemLength > 0 ? showMessage() : showMessage('No item found');
    }) 
}
//messager function
function showMessage(message = ''){
    msg.innerHTML = message;
 }

 //EventListener function
 function eventListener() {

    addBtn.addEventListener('click', addProduct);
    window.addEventListener('DOMContentLoaded',getData.bind(null,productData));
    productListUl.addEventListener('click', deleteProduct);

    filterInput.addEventListener('keyup', filterProduct);
 }

 eventListener();
 
