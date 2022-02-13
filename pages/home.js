import Head from 'next/head'
import React from "react";
import anime from "animejs";

export default function Home() {
   const [dest_name, setDesName] = React.useState('Petit coeur')

   React.useEffect(() => {
      setHearts()
      setAnimation()
      const url = new URL(window.location.href).searchParams.toString()
      const name = url.replace('dest=', '').split('&')[0].replaceAll('+', ' ')
      setDesName(name)
      showMessage()
   }, [])

   function showMessage(){
      let ta = document.querySelector(".message_container"),
         duration = 500,
         delay = 5000
      anime({
         targets: ta,
         scale: 0,
         duration: duration,
      })
      setTimeout(() => {
         anime({
            targets: ta,
            scale: 1,
            duration: duration,
            complete: () => {
               setTimeout(() => {
                  showMessage()
               }, delay + delay)
            }
         })
      }, delay)
   }

   function setAnimation() {
      anime({
         targets: '.heart',
         translateX: function () {
            const w = window.innerWidth - 50
            return anime.random(-1 * w, w)
         },
         translateY: function () {
            const h = window.innerHeight - 50
            return anime.random(-1 * h, h)
         },
         rotate: 45,
         scale: function () {
            const w = window.innerWidth
            let s = 5
            if (w <= 800)
               s = 3.5
            return anime.random(1, s)
         },
         easing: 'easeInOutBack',
         duration: 3000,
         delay: anime.stagger(20),
         complete: setAnimation
      })
   }

   function setHearts() {
      let container = document.querySelector('.container')
      const w = window.innerWidth
      let size = 40
      if (w <= 800)
         size = 20
      for (let i = 0; i < 100; i++) {
         let block = document.createElement('div')
         block.classList.add('heart')
         block.style.width = `${size}px`
         block.style.height = `${size}px`
         block.style.zIndex = anime.random(0, 120)
         container.appendChild(block)
      }
   }

   return (
      <div className={"body"}>
         <Head>
            <title>My Love</title>
            <meta name="description" content="Generated by create next app"/>
            <link rel="icon" href={'/favicon.ico'}/>
         </Head>
         <div className="container">
            <h2>{"Bonne fête de l'amour"}<br/><br/>mon</h2>
            <h1>{dest_name}</h1>
         </div>
         <div className={"message_container"}>
            <img src={"/heart.png"} alt="Heart Image"/>
            <p className={'message'}>
               {"Mon `petit coeur Junisse`, pour exprimer l'amour que j'ai pour toi, je n'est pas trouvé un cadeau plus beau et plus assurant que mon petit coeur." +
                  " Je pris que le Seigneur me donne la chance de passer le restant de mon existance à tes côtés." +
                  " Pour toi je suis près à tout. Gros bisous"}
            </p>
         </div>
      </div>
   )
}