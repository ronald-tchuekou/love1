import React from "react"

export default function Form() {
   const link_ref = React.useRef(null)
   const [form_data, setFormData] = React.useState({
      name: {value: '', error: ''},
      message: {value: '', error: ''}
   })
   const [content, setContent] = React.useState('')

   function validate() {
      let valide = true
      if (form_data.name.value.trim() === "") {
         const error = "Veuillez indiquer un nom (pas plus de 13 caractères)"
         setFormData(s => ({...s, name: {...s.name, error: error}}))
         valide = false
      } else if (form_data.name.value.length > 13) {
         const error = "Le nom ne doit pas être plus de 13 caractères)"
         setFormData(s => ({...s, name: {...s.name, error: error}}))
         valide = false
      } else if (form_data.message.value.trim() === "") {
         const error = "Veuillez indiquer un message (pas plus de 285 caractères)"
         setFormData(s => ({...s, message: {...s.message, error: error}}))
         valide = false
      } else if (form_data.name.value.length > 285) {
         const error = "Le message ne doit pas être plus de 285 caractères)"
         setFormData(s => ({...s, name: {...s.name, error: error}}))
         valide = false
      }
      if (valide)
         setFormData(s => ({name: {...s.name, error: ""}, message: {...s.message, error: ""}}))
      return valide
   }

   function share() {
      if (validate()) {
         setContent(`Un petit message pour toi. \n\n https://love1-three.vercel.app/home?dest="${
            form_data.name.value.replaceAll(' ', '%20')
         }"&message="${
            form_data.message.value.replaceAll(' ', '%20')
         }"`)
         setTimeout(() => link_ref.current.click(), 300)
      }
   }

   return (
      <div className={"body"}>
         <div className={"form_container"}>
            <img src={"/heart.png"} alt="Heart image"/>
            <h1>Grace à ce formulaire vous pouvez transmetre un message à un être qui vous-êtes cher.</h1>
            <input
               type="text"
               name="name"
               id="name"
               placeholder={"Nom du destinataire"}
               className={"input_form"}
               onChange={(e) => {
                  const val = e.target.value
                  setFormData(s => ({...s, name: {...s.name, value: val}}))
               }}
            />
            {form_data.name.error.trim() !== "" ? <div className={"error"}>{form_data.name.error}</div> : <></>}
            <textarea
               name="message"
               id="message"
               rows="5"
               className={"input_form"}
               placeholder={"Contenu de votre message..."}
               onChange={(e) => {
                  const val = e.target.value
                  setFormData(s => ({...s, message: {...s.message, value: val}}))
               }}
            ></textarea>
            {form_data.message.error.trim() !== "" ? <div className={"error"}>{form_data.message.error}</div> : <></>}
            <button onClick={share}
                    className={"button"}>Cliquer ici pour envoyer
            </button>
            <a ref={link_ref}
               href={`whatsapp://send?text=${content}`}
               data-action="share/whatsapp/share"
            ></a>
            <p className={"copyright"}>&copy; Copyright 2022 - Created by Ronald Tchuekou</p>
         </div>
      </div>
   )
}
