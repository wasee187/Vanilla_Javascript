class ProductData{
    constructor(id,name,price){
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
//storing data to local storage
class StoreData{
    static addToLocalStorage(item){
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
    static getDataFromLocalStorage(){
            let items = '';
        if(localStorage.getItem('productItems') === null){
            items = [];
        }else{
            items =JSON.parse(localStorage.getItem('productItems'));
        }
        return items; 
    }
    static displayProduct(){
        const products = StoreData.getDataFromLocalStorage();
        console.log(products);
        products.forEach(product =>{
            const ui = new UI;
            ui.addDataTolist(product);
        });
    }
    static deleteFromLocalStore(id){
        let items = JSON.parse(localStorage.getItem('productItems'));
        let result = items.filter(productItem =>{
            return productItem.id !== id;
        });
        localStorage.setItem('productItems',JSON.stringify(result));
        if (result.length === 0) location.reload();
    }
}

//creating window event
window.addEventListener('DOMContentLoaded',StoreData.displayProduct);
//UI display class
class UI{
    addDataTolist({id,name,price}){
        let li = document.createElement('li');  
        li.className = 'list-group-item collection-item';
            li.id = `product-${id}`;
            li.innerHTML = `<strong>${name}</strong>-<span class="price">
            $${price}
        </span>
        <i class="fas fa-trash-alt float-right delete-product"></i>`;
        document.querySelector('.collection').append(li);

    }
    clearField(){
        document.querySelector('#name').value = '';
        document.querySelector('#price').value = '';
    }
    deleteProduct(target){
        if(target.classList.contains('delete-product')){
            const point = target.parentElement;
            let id = Number(point.id.split('-')[1]);
            
            target.parentElement.remove(target);
            StoreData.deleteFromLocalStore(id);

        }
    }
    filterData(target){
        let itemLength = 0;
        const find = target;
        const ui = new UI;
        document.querySelectorAll('.collection .collection-item').forEach(item =>{
            const productName = item.firstElementChild.textContent.toLocaleLowerCase();
            if(productName.indexOf(find)===-1){
                item.style.display = 'none';
                ui.showMessage('No item to show','danger');
            }else{
                item.style.display = 'block';
                itemLength ++; 
            }
        });
    }
    getID(){
        return document.querySelectorAll('li').length;
    }
    showMessage(message,className){
        const div = document.createElement('div');
        const ul = document.querySelector('ul')
        const container = document.querySelector('.card');
        div.className = `alert alert-${className}`;
        div.textContent = message;
        container.insertBefore(div,ul);
        setTimeout(()=>{
            document.querySelector('.alert').remove();
        },2000);
    }

}

//input product
document.querySelector('form').addEventListener('submit', e=>{
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const price = document.querySelector('#price').value;
    let id ;

    //initiate of ui
    const ui = new UI;
    id = ui.getID();  
    const products = new ProductData(id,name,price);
    //validation
    if(name === '' || price === '' || !(!isNaN(parseFloat(price)) && isFinite(price))){
        ui.showMessage('Please fill up neccessary information', 'danger');
    }else{
        ui.addDataTolist(products);
        ui.showMessage('product listed successfully', 'success');
        StoreData.addToLocalStorage(products);
        ui.clearField();
        console.log(products);
        console.log(id);
    }
})

//delete product
document.querySelector('.collection').addEventListener('click', e=>{
    const ui = new UI;
    ui.deleteProduct(e.target);
    ui.showMessage('Product removed successfully','success');
})


//search product

document.querySelector('#filter').addEventListener('keyup', e=>{
    const ui = new UI;
    const text = e.target.value.toLowerCase();
    ui.filterData(text);
});