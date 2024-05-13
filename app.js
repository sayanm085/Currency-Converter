let inputs=document.querySelector("input")
let dropdowen=document.querySelectorAll("select")
let flag= document.querySelectorAll(".flag")
let msg=document.querySelector(".msg")
let button=document.querySelector(".div")
let urlfrom=()=>{
for(let select of dropdowen){
    if(select.name=="from"){
       let Country= select.value.toLowerCase()
       let url=`https://latest.currency-api.pages.dev/v1/currencies/${Country}.json`
       return url;
    }
}
}


let from=()=>{
    for(let select of dropdowen){
        if(select.name=="from"){
           let Country= select.value.toLowerCase()
           return Country;
        }
    }
    }


let to=()=>{
    for(let select of dropdowen){
        if(select.name=="to"){
           let Country= select.value.toLowerCase()
           return Country;
        }
    }
    }


for(let select of dropdowen){
    for(let code in countryList){
        
        let newopsion=document.createElement("option")
        newopsion.innerText=code;
        newopsion.value=code;
        if( select.name =="from"&& code==="USD" ){
            newopsion.selected="selected"
        }
        if( select.name =="to"&& code==="INR"){
            newopsion.selected="selected"
        }
        select.append(newopsion)
    }

    select.addEventListener("change",(evt)=>{
        updateflag(evt.target)
    })
}

let updateflag=(eliment)=>{
    let corrcode= eliment.value
    let newsrc=`https://flagsapi.com/${countryList[corrcode]}/flat/64.png`
    let img = eliment.parentElement.querySelector("img")
    img.src=newsrc
    
 }


let info = async()=>{
    let curntry= await fetch(urlfrom())
    let respons= await curntry.json()
    for (let key in respons[from()]){

        if(key ==to()){
            let valu=respons[from()][key]
            console.log (respons[from()][key]);
            cheackprice(valu)
        } 
    }
}

let cheackprice=(num)=>{
    let inr = Number(inputs.value)
    let finaleprice= inr*num;
    msg.innerText=`${inr} ${from().toUpperCase()}=> ${finaleprice} ${to().toUpperCase()}`
}


button.addEventListener("click",info)
