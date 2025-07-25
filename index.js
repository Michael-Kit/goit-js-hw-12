import{a as d,S as f,i as n}from"./assets/vendor-DqB7j7Ix.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function a(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(t){if(t.ep)return;t.ep=!0;const o=a(t);fetch(t.href,o)}})();const p="51392705-c835407a6ad34302eafe3f79f",m="https://pixabay.com/api/";async function g(e){return(await d.get(m,{params:{key:p,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data}const h=new f(".gallery a",{captionsData:"alt",captionDelay:250});function c(){const e=document.querySelector(".loader");e&&e.classList.add("hidden")}function y(){const e=document.querySelector(".loader");e&&e.classList.remove("hidden")}function L(){const e=document.querySelector(".gallery");e&&(e.innerHTML="")}function w(e){const s=document.querySelector(".gallery"),a=e.map(r=>`
      <li class="gallery-item">
        <a href="${r.largeImageURL}">
          <img src="${r.webformatURL}" alt="${r.tags}" />
        </a>
       <div class="info">
           <div class="labels">
              <span>Likes</span>
              <span>Views</span>
              <span>Comments</span>
              <span>Downloads</span>
           </div>
         <div class="stats">
              <span>${r.likes}</span>
              <span>${r.views}</span>
              <span>${r.comments}</span>
              <span>${r.downloads}</span>
         </div>
       </div>

      </li>
    `).join("");s.insertAdjacentHTML("beforeend",a),h.refresh()}const u=document.querySelector(".form"),l=u.elements["search-text"];u.addEventListener("submit",async e=>{e.preventDefault();const s=l.value.trim();if(!s){n.show({message:"Please fill out this field !",backgroundColor:"#ff4e4e",position:"topRight"});return}L(),y();try{const a=await g(s);if(c(),a.hits.length===0){n.show({message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"#ff4e4e",position:"topRight"});return}w(a.hits),l.value="",n.show({message:`Found ${a.hits.length} images.`,backgroundColor:"#00c851",position:"topRight",timeout:3e3})}catch(a){c(),console.error("Помилка запиту:",a.message),n.show({message:"An error occurred while fetching images. Please try again later.",backgroundColor:"#ffcc00",position:"topRight"})}});
//# sourceMappingURL=index.js.map
