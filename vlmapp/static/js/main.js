// // deno-lint-ignore-file
const cartbtn=document.querySelector(".cart-btn")
const closecartbtn=document.querySelector(".close-cart")
const clearcartbtn=document.querySelector(".clear-cart")
const cartDom=document.querySelector(".cart")
const cartoverlay=document.querySelector(".cart-overlay")
const cartitems=document.querySelector(".cart-items")
const carttotal=document.querySelector(".cart-total")
const cartcontent=document.querySelector(".cart-content")
const productsDOM=document.querySelector(".products-center")


// // vlmset classes cart
let cart =[];
let butdom=[]
// getting the products

class Products{
    async getproducts(){
        try {
            let res=await fetch("products.json");
            let data = await res.json();
            let prod= data.items;
          const take=  prod.map(items=>{
                const {title,price}=items.fields;
                const {id}=items.sys;
                const img=items.fields.image.fields.file.url;
                return {title,price,id,img};
            })
            return take;
        } catch (error) {
            console.log(error)
        }
    }
}

// display products

class ui{
     vlmdisplay(data){
       let res= '';
       data.forEach(data => {
        res +=`
        <!-- single product -->
        <article class="product">
          <div class="img-container">
            <img src=${data.img} alt="course" class="product-img">
            <button class="bag-btn" data-id=${data.id}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus-fill" viewBox="0 0 16 16">
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z"/>
              </svg>
              add to cart 
            </button>
          </div>
          <h3>${data.title}</h3>
          <h4>Ksh ${data.price}</h4>
        </article>
        <!--end of single product -->
         `
        });
        productsDOM.innerHTML=res;
    }

     vlmgetbag(){
        const btn = [...document.querySelectorAll(".bag-btn")];
        butdom=btn;

        btn.forEach(btn=>{
            let id=btn.dataset.id;
            let incart = cart.find(item=>item.id===id);
            if (incart) {
                btn.innerText="in cart"
                btn.disabled=true
            }else{
                btn.addEventListener('click',(ev)=>{
                    ev.target.innerText="in cart"
                    ev.target.disabled=true
                    // get product from products
                    let cartitem= {...storage.vlmget(id),amount:1}
                    // add product to cart
                    cart=[...cart,cartitem]
                    // saveproduct
                    storage.vlmsavecart(cart)
                    // set cartvalues
                    this.vlmsetvalues(cart);
                    // add cart items
                    this.vlmaddcartitem(cartitem);
                    // show cart
                    this.vlmshowcart()
                    
                })
            }

        })
        
    }
     vlmsetvalues(cart){
        let temptotal=0
        let itemstotal=0
        cart.map(item=>{
            temptotal += item.price * item.amount;
            itemstotal += item.amount;
        })
        carttotal.innerText=parseFloat(temptotal.toFixed(2))
        cartitems.innerText=itemstotal
    }
     vlmaddcartitem(item){
        const div= document.createElement("div");
        div.classList.add('cart-item');
        div.innerHTML=`
        <img src=${item.img} alt="course">
          <div>
          <h4>${item.title}</h4>
          <h5>Ksh ${item.price}</h5>
            <span class="remove-item" data-id=${item.id}> 
            remove
            </span>
          </div>
        `
        cartcontent.appendChild(div)
    }
vlmshowcart(){
    cartoverlay.classList.add('transparentBcg');
    cartDom.classList.add('showCart');
}
vlmhide(){
    cartoverlay.classList.remove('transparentBcg');
    cartDom.classList.remove('showCart');
}
vlmpop(cart){
    cart.forEach(item=>this.vlmaddcartitem(item))

}
 vlmsetup(){
    cart =  storage.vlmgetcart();
    this.vlmsetvalues(cart);
    this.vlmpop(cart)
    cartbtn.addEventListener('click',this.vlmshowcart)
    closecartbtn.addEventListener('click',this.vlmhide)
 }
 vlmcartlog(){
    clearcartbtn.addEventListener('click',()=>{
        this.vlmclear();
    })
    cartcontent.addEventListener('click',(ev)=>{
        if (ev.target.classList.contains('remove-item')) {
            const remove= ev.target;
            let id=remove.dataset.id;
            cartcontent.removeChild
            (remove.parentElement.parentElement);
            this.vlmremove(id);
        }

    })
 }
 vlmclear(){
    let cartitems= cart.map(item=>item.id);
    cartitems.forEach(id=>this.vlmremove(id))
    while (cartcontent.children.length>0) {
        cartcontent.removeChild(cartcontent.children[0])
    }
    this.vlmhide()
 }
 vlmremove(id){
    cart= cart.filter(item => item.id !== id);
    this.vlmsetvalues(cart);
    storage.vlmsavecart(cart)
    const button=this.getSingle(id);
    button.disabled=false
    button.innerHTML=`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus-fill" viewBox="0 0 16 16">
      <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z"/>
    </svg>
    add to cart 
    `
 }
 getSingle(id){
    return butdom.find(btn => btn.dataset.id===id);
 }
}

// localstorage
class storage{
    static vlmsave(data){
        localStorage.setItem("vlmproducts",JSON.stringify(data))
    }
    static vlmget(id){
        let prod=JSON.parse(localStorage.getItem("vlmproducts"));
        return prod.find(data=>data.id===id)
    }
    static vlmsavecart(cart){
        localStorage.setItem('vlmcart',JSON.stringify(cart))
    }
    static vlmgetcart(){
        return localStorage.getItem("vlmcart")?JSON.parse(localStorage.getItem('vlmcart')):[]
    }
}

// function view(){
//     const vlmmin=document.getElementById("mn")
//     const vlmsec=document.getElementById("sc")
//     const vlmhour = document.getElementById("hr");
//     const day = new Date();
//     const hour= day.getHours()* 30;
//     const min = day.getMinutes() * 6;
//     const sec  =day.getSeconds() * 6;
    
//     setTimeout(()=>{
        
//     vlmhour.style.transform = `rotateZ(${hour+(min/12)}deg)`;
//     vlmmin.style.transform = `rotateZ(${min}deg)`;
//     vlmsec.style.transform = `rotateZ(${sec}deg)`;
//     })
// }

document.addEventListener("DOMContentLoaded",()=>{
    const vlmui=new ui();
    // set app
    vlmui.vlmsetup()
    const products=new Products();
    // get all products
    products.getproducts().then(data=>{
        vlmui.vlmdisplay(data)
        storage.vlmsave(data)
    }
    ).then(()=>{
        vlmui.vlmgetbag();
        vlmui.vlmcartlog();
    })
})
