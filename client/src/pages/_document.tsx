import { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'
import { BASE_URL } from '../helpers/constants/baseUrl'

const Document = () => (
  <Html>
    <Head>
      <link rel='shortcut icon' href={`${BASE_URL}/files/favicon.ico`} />
      <meta
        name='description'
        content='U PROJECT STUDIO - это магазин, который продаёт качественную мужскую и женскую парфюмерию как оптом, так и в розницу. Мы сотрудничаем с многими брендами, чтобы предоставить нашим покупателям широкий спектр выбора ароматов - от авторских до популярных парфюмерных композиций. Наша парфюмерия создана из натуральных ингредиентов высокого качества, которые будут приятно дополнять вашу индивидуальность и стиль.

Наши клиенты ценят нашу парфюмерию за высокое качество и доступные цены. Наш ассортимент отличается от других магазинов тем, что мы предлагаем только настоящие парфюмерные композиции, которые не разочаруют ваши ожидания. Вы всегда найдете у нас что-то, что подойдет для вашего настроения и повседневной жизни.

Мы гарантируем быструю доставку и высокий уровень обслуживания наших клиентов. Если вы ищете парфюмерию высокого качества, заходите на наш сайт и выбирайте ваш идеальный аромат прямо сегодня!'
      />
    </Head>
    <body>
      <Main />
      <NextScript />
      <script
        dangerouslySetInnerHTML={{
          __html: `
                   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                   m[i].l=1*new Date();
                   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                
                   ym(93498794, "init", {
                        clickmap:true,
                        trackLinks:true,
                        accurateTrackBounce:true,
                        webvisor:true
                   }); 
                  `,
        }}
      />
      <noscript>
        <div>
          <img
            src='https://mc.yandex.ru/watch/93498794'
            style={{ position: 'absolute', left: '-9999px' }}
            alt=''
          />
        </div>
      </noscript>
    </body>
  </Html>
)
export default Document
