import{a as y,S as w,i as a}from"./assets/vendor-DqB7j7Ix.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function r(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(t){if(t.ep)return;t.ep=!0;const n=r(t);fetch(t.href,n)}})();const L="51392705-c835407a6ad34302eafe3f79f",b="https://pixabay.com/api/";async function u(e,o=1,r=15){return(await y.get(b,{params:{key:L,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:r}})).data}const v=new w(".gallery a",{captionsData:"alt",captionDelay:250});function c(){const e=document.querySelector(".loader");e&&e.classList.add("hidden")}function f(){const e=document.querySelector(".loader");e&&e.classList.remove("hidden")}function S(){const e=document.querySelector(".gallery");e&&(e.innerHTML="")}function m(e){const o=document.querySelector(".gallery"),r=e.map(s=>`
      <li class="gallery-item">
        <a href="${s.largeImageURL}">
          <img src="${s.webformatURL}" alt="${s.tags}" />
        </a>
       <div class="info">
           <div class="labels">
              <span>Likes</span>
              <span>Views</span>
              <span>Comments</span>
              <span>Downloads</span>
           </div>
         <div class="stats">
              <span>${s.likes}</span>
              <span>${s.views}</span>
              <span>${s.comments}</span>
              <span>${s.downloads}</span>
         </div>
       </div>

      </li>
    `).join("");o.insertAdjacentHTML("beforeend",r),v.refresh()}function q(){const e=document.querySelector(".load-more");e&&e.classList.remove("hidden")}function h(){const e=document.querySelector(".load-more");e&&e.classList.add("hidden")}const p=document.querySelector(".form"),d=p.elements["search-text"],R=document.querySelector(".load-more");let i=1,g="";p.addEventListener("submit",async e=>{e.preventDefault();const o=d.value.trim();if(!o){a.show({message:"Please fill out this field !",backgroundColor:"#ff4e4e",position:"topRight"});return}i=1,g=o,S(),f();try{const r=await u(o);if(c(),r.hits.length===0){a.show({message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"#ff4e4e",position:"topRight"}),h();return}m(r.hits),q(),d.value="",a.show({message:`Found ${r.hits.length} images.`,backgroundColor:"#00c851",position:"topRight",timeout:3e3})}catch(r){c(),console.error("Помилка запиту:",r.message),a.show({message:"An error occurred while fetching images. Please try again later.",backgroundColor:"#ffcc00",position:"topRight"})}});R.addEventListener("click",async()=>{i++,f();try{const e=await u(g,i);c(),m(e.hits);const{height:o}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"}),i*15>=e.totalHits&&(h(),a.show({message:"You've reached the end of search results.",backgroundColor:"#ffcc00",position:"topRight"}))}catch(e){c(),console.error("Помилка завантаження наступної сторінки:",e.message),a.show({message:"An error occurred while loading more images.",backgroundColor:"#ff4e4e",position:"topRight"})}});document.getElementById("loading-message");
//# sourceMappingURL=index.js.map
