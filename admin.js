function submitHandler(event) {
    event.preventDefault();
    const Product = event.target.productName.value;
    const price = event.target.price.value;
    const category = event.target.category.value;
    const obj = {
         Product, 
         price, 
         category 
        };

axios.post("https://crudcrud.com/api/2f4581313bdf4892941ca24fed3f7c47/appointmentData",obj).then((response)=>{
console.log(response);
})
.catch((err)=>{
document.body.innerHTML+="<h4>Something went wrong....</h4>"
console.log(err);
})
  localStorage.setItem(obj, JSON.stringify(obj));
  showProductOnScreen(obj);
}
window.addEventListener('DOMContentLoaded',()=>{
    axios.get("https://crudcrud.com/api/2f4581313bdf4892941ca24fed3f7c47/appointmentData")
    .then((response)=>{
        console.log(response)
        for(var i=0;i<response.data.length;i++){
            showProductOnScreen(response.data[i]);
        }
    })
    .catch((error)=>{
      console.log(error);  
    })
const localStorageObj = localStorage;
const localStoragekeys = Object.keys(localStorageObj);

for(var i=0;i<localStoragekeys.length;i++){
    const key = localStoragekeys[i];
    const userDetailsString = localStorageObj[key];
    const userDetailsObj = JSON.parse(userDetailsString);
    showProductOnScreen(userDetailsObj);
}
})
//showProductOnScreen
function showProductOnScreen(product){
document.getElementById('productName').value='';
document.getElementById('price').value='';
document.getElementById('category').value='';

    if(localStorage.getItem(product.Product)!=null){
        removeProductFromScreen(product.productName);
    }
const parentNode = document.getElementById("listOfItems");
const childHTML=`<li id='${product._id}'> ${product.Product} - Rs. ${product.price}  -/ ${product.category} 
    <button onclick=deleteOrder("${product._id}")> Delete Order</button>
    </li>`
parentNode.innerHTML=parentNode.innerHTML + childHTML; 
}

//DeleteProductFrom_CRUD
function deleteUser(productId){
    axios.delete(`https://crudcrud.com/api/2f4581313bdf4892941ca24fed3f7c47/appointmentData/${productId}`)
    .then((response)=>{
        removeProductFromScreen(productId)
    })
    .catch((err)=>{
        console.log(err);
    })
    }
    
    function removeProductFromScreen(productId){
        const parentNode = document.getElementById("listOfItems")
        const childNodeToBeDeleted = document.getElementById(productName)
        if(childNodeToBeDeleted){
            parentNode.removeChild(childNodeToBeDeleted);
        }
    } 