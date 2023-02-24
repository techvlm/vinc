// deno-lint-ignore-file
const cartbtn=document.querySelector(".cart-btn")
const closecartbtn=document.querySelector(".close-cart")
const clearcartbtn=document.querySelector(".clear-cart")
const cartDom=document.querySelector(".cart")
const cartoverlay=document.querySelector(".cart-overlay")
const cartitems=document.querySelector(".cart-itmes")
const carttotal=document.querySelector(".cart-total")
const cartcontent=document.querySelector(".cart-content")
const productsDOM=document.querySelector(".products-center")



// vlmset classes cart
let cart =[];

// getting the products

class Products{
    async getproducts(){
        try {
            let res=await fetch("products.json");
            let data = await res.json();
            let prod= data.items;
            // prod=prod.map(item=>{
            //     const {title,price}=item.fields;
            //     const {id}=item.sys;
            //     const img=item.fields.image.fields.fields.url;

            //     return {title,price,id,img}
            // })
          const take=  prod.map(items=>{
                const {title,price}=items.fields;
                const {id}=items.sys;
                return {title,price,id};
            })
            return take
        } catch (error) {
            console.log(error)
        }
    }
}

// display products

class ui{

}

// localstorage
class storage{

}

document.addEventListener("DOMContentLoaded",()=>{
    const vlmui=new ui();
    const products=new Products();

    // get all products
    products.getproducts().then(data=>console.log(data))
})
