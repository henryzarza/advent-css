const CONTENT = {
  'episode-39': {
    title: 'Tech to Look Forward to in 2022',
    img: './images/cover__episode-39.png',
    description: 'In this episode, Amy and James discuss the future of web development: Astro, Veet, Supabase, SvelteKit, Redwood.js, Blitz.js, GitHub Co-Pilot, Web Assembly, Blockchain, w3, no-code, and low-code.'
  },
  'episode-38': {
    title: '2021 Gift Guide',
    img: './images/cover__episode-38.png',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, adipisci fuga repudiandae labore asperiores hic, itaque ut iure praesentium qui totam officiis, aperiam exercitationem modi dolores. Optio reiciendis voluptas ab.'
  },
  'episode-37': {
    title: 'Building a Course',
    img: './images/cover__episode-37.png',
    description: 'Voluptatem ducimus vel totam. Tempore similique, voluptates sint illum dolor nisi laudantium enim harum? Necessitatibus reprehenderit expedita quas inventore quasi totam magnam dolores beatae minus veritatis sequi vel, debitis non.'
  },
  'episode-36': {
    title: 'SVGs FTW',
    img: './images/cover__episode-36.png',
    description: 'Modi, accusamus. Officiis nemo nihil similique sed dignissimos amet impedit aliquam eius perspiciatis atque inventore ullam architecto reprehenderit soluta, nobis maiores voluptas facere, cum molestiae nisi placeat rerum asperiores! Voluptates!'
  },
  'episode-35': {
    title: 'Crossover Episode with Purrfect Dev',
    img: './images/cover__episode-35.png',
    description: 'Officia mollitia totam eius at dolores, impedit non unde aliquam adipisci quisquam quod provident praesentium magnam libero commodi aperiam magni tenetur corporis veritatis. Sint quisquam enim esse reiciendis hic natus.'
  },
  'episode-34': {
    title: 'Getting git',
    img: './images/cover__episode-34.png',
    description: 'Officia mollitia totam eius at dolores, impedit non unde aliquam adipisci quisquam quod provident praesentium magnam libero commodi aperiam magni tenetur corporis veritatis. Sint quisquam enim esse reiciendis hic natus.'
  },
  'episode-33': {
    title: 'Small Design Tweaks that Make All the Difference',
    img: './images/cover__episode-33.png',
    description: 'Ducimus voluptas quisquam natus asperiores, cum itaque autem at numquam non voluptatem dolorum sapiente ad delectus repellat nesciunt omnis ratione consequatur, similique perferendis est esse harum! Delectus quasi voluptas incidunt.'
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const mainRef = document.querySelector('.main');
  const imgRef = mainRef.querySelector('img');
  const titleRef = mainRef.querySelector('.main__section-title');
  const descriptionRef = mainRef.querySelector('.main__section-description');
  const asideIndicator = document.querySelector('.aside__indicator');

  document.querySelectorAll('.aside__list li').forEach(list => 
    list.addEventListener('click', function() {
      imgRef.setAttribute('src', CONTENT[this.dataset.ref].img);
      imgRef.setAttribute('alt', `Cover ${CONTENT[this.dataset.ref].title}`);
      titleRef.textContent = CONTENT[this.dataset.ref].title;
      descriptionRef.textContent = CONTENT[this.dataset.ref].description;
      asideIndicator.style.top = `${this.getBoundingClientRect().top}px`;
    })
  );
});
