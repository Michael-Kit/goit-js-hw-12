import{a as y,S as w,i as a}from"./assets/vendor-rOMtvQ2t.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function t(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=t(o);fetch(o.href,n)}})();const L="51392705-c835407a6ad34302eafe3f79f",b="https://pixabay.com/api/";async function h(e,r=1,t=15){return(await y.get(b,{params:{key:L,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:t}})).data}const v=new w(".gallery a",{captionsData:"alt",captionDelay:250});function l(){const e=document.querySelector(".loader");e&&e.classList.add("hidden")}function p(){const e=document.querySelector(".loader");e&&e.classList.remove("hidden")}function S(){const e=document.querySelector(".gallery");e&&(e.innerHTML="")}function m(e){const r=document.querySelector(".gallery"),t=e.map(s=>`
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
    `).join("");r.insertAdjacentHTML("beforeend",t),v.refresh()}function q(){const e=document.querySelector(".load-more");e&&e.classList.remove("hidden")}function u(){const e=document.querySelector(".load-more");e&&e.classList.add("hidden")}const g=document.querySelector(".form"),f=g.elements["search-text"],R=document.querySelector(".load-more");let i=1,c="";g.addEventListener("submit",async e=>{e.preventDefault();const r=f.value.trim();if(!r){a.show({message:"Please fill out this field!",backgroundColor:"#ff4e4e",position:"topRight"});return}i=1,c=r,S(),u(),p();try{const t=await h(c,i);if(l(),t.hits.length===0){a.show({message:"No images found. Try another query!",backgroundColor:"#ff4e4e",position:"topRight"});return}m(t.hits),f.value="",a.show({message:`Found ${t.totalHits} images for "${c}".`,backgroundColor:"#00c851",position:"topRight",timeout:3e3}),t.totalHits>t.hits.length?q():(u(),a.show({message:"You've reached the end of search results.",backgroundColor:"#ffcc00",position:"topRight"}))}catch(t){l(),console.error("Search error:",t.message),a.show({message:"Error while fetching images.",backgroundColor:"#ffcc00",position:"topRight"})}});R.addEventListener("click",async()=>{i++,p();try{const e=await h(c,i);l(),m(e.hits);const{height:r}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"}),i*15>=e.totalHits&&(u(),a.show({message:"You've reached the end of search results.",backgroundColor:"#ffcc00",position:"topRight"}))}catch(e){l(),console.error("Load more error:",e.message),a.show({message:"Error while loading more images.",backgroundColor:"#ff4e4e",position:"topRight"})}});
//# sourceMappingURL=index.js.map
