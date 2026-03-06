function getRecommendation(){

let skinType=document.getElementById("skinType").value;

if(skinType===""){
alert("Please select a skin type");
return;
}

let concerns=[];

document.querySelectorAll('input[type="checkbox"]:checked')
.forEach(cb=>{
concerns.push(cb.value);
});

fetch("/recommend",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
skinType:skinType,
concerns:concerns
})

})

.then(response=>response.json())

.then(data=>{

let cleanser="";
let moisturizer="";
let sunscreen="";

if(skinType=="normal"){
cleanser="Gentle cleanser (Glycerin, Aloe vera)";
moisturizer="Lightweight lotion (Hyaluronic acid, Glycerin)";
sunscreen="Lotion sunscreen (Zinc oxide, Avobenzone) SPF 30+";
}

if(skinType=="oily"){
cleanser="Foaming/Gel cleanser (Salicylic acid, Niacinamide)";
moisturizer="Oil-free gel moisturizer (Niacinamide, Hyaluronic acid)";
sunscreen="Gel/Matte sunscreen (Zinc oxide, Niacinamide) SPF 30-50";
}

if(skinType=="dry"){
cleanser="Cream/Hydrating cleanser (Hyaluronic acid, Ceramides)";
moisturizer="Thick cream moisturizer (Ceramides, Shea butter, Squalane)";
sunscreen="Cream sunscreen (Ceramides, Hyaluronic acid) SPF 30+";
}

if(skinType=="combination"){
cleanser="Mild gel cleanser (Niacinamide, Hyaluronic acid)";
moisturizer="Gel-cream moisturizer (Ceramides, Niacinamide)";
sunscreen="Lightweight lotion (Zinc oxide, Titanium dioxide) SPF 30+";
}

if(skinType=="sensitive"){
cleanser="Soap-free gentle cleanser (Panthenol, Allantoin, Oat extract)";
moisturizer="Fragrance-free soothing cream (Panthenol, Allantoin, Ceramides)";
sunscreen="Mineral sunscreen (Zinc oxide, Titanium dioxide) SPF 30+";
}

document.getElementById("result").innerHTML=

"<h3>Recommended Ingredients</h3>"+
data.recommended.join(", ")

+

"<h3>Avoid Ingredients</h3>"+
data.avoid.join(", ")

+

"<h3>Cleanser Recommendation</h3>"+
cleanser

+

"<h3>Moisturizer Recommendation</h3>"+
moisturizer

+

"<h3>Sunscreen Recommendation</h3>"+
sunscreen;

});

}

function resetForm(){

document.getElementById("skinType").selectedIndex = 0;

document.querySelectorAll('input[type="checkbox"]')
.forEach(cb => cb.checked = false);

document.getElementById("result").innerHTML=
'<div class="result-card">'+
"<h3>Recommended Ingredients</h3>"+
"<p>"+data.recommended.join(", ")+"</p>"+
'</div>'+

'<div class="result-card">'+
"<h3>Avoid Ingredients</h3>"+
"<p>"+data.avoid.join(", ")+"</p>"+
'</div>'+

'<div class="result-card">'+
"<h3>Cleanser Recommendation</h3>"+
"<p>"+cleanser+"</p>"+
'</div>'+

'<div class="result-card">'+
"<h3>Moisturizer Recommendation</h3>"+
"<p>"+moisturizer+"</p>"+
'</div>'+

'<div class="result-card">'+
"<h3>Sunscreen Recommendation</h3>"+
"<p>"+sunscreen+"</p>"+
'</div>';

}


function resetForm(){

// reset skin type dropdown
document.getElementById("skinType").selectedIndex = 0;

// uncheck all concerns
document.querySelectorAll('input[type="checkbox"]')
.forEach(cb => cb.checked = false);

// clear result
document.getElementById("result").innerHTML = "";

}