document.addEventListener("DOMContentLoaded", () => {
  let videos = [];
  
  function selectVideo(id) {
    const mainVideoRef = document.querySelector('.main-video');

    if (videos.length > 0) {
      const video = videos.find(el => el.id === id);
      const date = new Date(video.publishedAt);

      mainVideoRef.innerHTML = `
        <img class="main-video__video" src="${video.src}" alt="${video.title}">
        <h2 class="main-video__title">${video.title}</h2>
        <h3 class="main-video__subtitle">${video.channelTitle}</h3>
        <h6 class="main-video__published">${date.toLocaleString()}</h6>
        <p class="main-video__description">${video.description}</p>
      `;
      mainVideoRef.scrollIntoView({ behavior: "smooth" });
    }
  }

  function renderSuggested() {
    document.querySelector('.suggested-videos').innerHTML = videos.map(
      video => `
        <button type="button" data-id="${video.id}" class="suggested-videos__item" role="listitem">
          <img class="suggested-videos__placeholder" src="${video.src}" alt="${video.title}">
          <h6 class="suggested-videos__title">${video.title}</h6>
        </button>
      `).join('');
    
    // suscribe to click event
    document.querySelectorAll('.suggested-videos__item')
      .forEach(el => el.addEventListener('click', function() {
        selectVideo(this.dataset.id);
      }));
  }

  function executeQuery() {
    return gapi.client.youtube.videos.list({
      "part": [ "snippet" ],
      "id": [
        "sPBVzqOax3Y,Ff_7iTz-lLQ,ID1l12yEFGk,u1V8YRJnr4Q,oIhNoeKFwbE,XlpTLDulFe8,aAAnWl-aO5g,Epj84QVw2rc,tOOXFCpAxnY,ucVUEmjKsko,aZsEdGvm5IY,FS07b8EUlCs,njR5UBSryv8,9M0kwjH4GQ4,kxyf3kva6oY,pw_PJ6YJdfo,Y5InCC9DBOM,X_a_SMeJuZk,pXpjDIeVuVk,HiBxdACoXYY,K3JGxj2rvAs"
      ]
    })
    .then(
      (response) => {
        if (response.status === 200) {
          videos = response.result.items.map(el => (
            {
              id: el.id,
              channelTitle: el.snippet.channelTitle,
              description: el.snippet.description,
              publishedAt: el.snippet.publishedAt,
              title: el.snippet.title,
              src: el.snippet.thumbnails?.maxres?.url || el.snippet.thumbnails?.standard?.url,
            }
          ));

          renderSuggested();
          selectVideo(videos[0].id);
        }
      },
      (err) => console.error("Execute error", err)
    );
  }

  function loadClient() {
    gapi.client.setApiKey("YOUR_API_KEY");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(() => {
          executeQuery();
        },
        (err) => console.error("Error loading GAPI client for API", err));
  }

  gapi.load("client");

  setTimeout(() => loadClient(), 500);
});
