import { log } from "node_modules/astro/dist/core/logger/core";
import { useState } from "react";

const Formulario = () => {
  const classBefore =
    "before:leading-3 before:pb-[3px] before:z-20 before:-translate-y-1/2 before:top-1/2 before:absolute before:left-4 before:font-sf-medium relative";
  const [isChecked, setIsChecked] = useState(true);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const createNewContact = (e) => {
    e.preventDefault();
    const newContact = {
      nombre,
      correo,
      mensaje,
      asistencia: isChecked ? "Asistiré" : "No asistiré",
    };
    console.log(newContact.asistencia);
    //Regex for email
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(correo) || !nombre || !mensaje) {
      alert("Por favor, ingresar correctamente los datos");
      return;
    }

    fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.PUBLIC_APIKEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: newContact.correo,
        fields: {
          name: newContact.nombre,
          message: newContact.mensaje,
          assitance: newContact.asistencia,
          groups: [import.meta.env.PUBLIC_GROUPKEY],
        },
      }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    alert("Enviado correctamente");
  };

  return (
    <form className="flex flex-col gap-4 " onSubmit={createNewContact}>
      <section className={classBefore + " before:content-['Nombre:']"}>
        <input
          className=" placeholder-slate-500 text-sm rounded-full py-4 px-6 pl-20 bg-white opacity-90 w-full border-white"
          type="text"
          placeholder="Ej: Uziel"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </section>
      <section className={classBefore + " before:content-['Correo:']"}>
        <input
          className="relative placeholder-slate-500 text-sm rounded-full py-4 px-6 pl-20 bg-white opacity-90 w-full border-white"
          type="text"
          placeholder="Ej: example@gmail.com"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
      </section>
      <textarea
        className="placeholder-slate-500 text-sm rounded-2xl py-4 px-6 bg-white opacity-90 w-full border-white min-h-32 max-h-32"
        placeholder="Algo que nos quieras decir"
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
      ></textarea>
      <label className="flex cursor-pointer select-none items-center justify-center">
        <div className="relative">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="sr-only"
          />
          <div
            className={`h-5 w-14 rounded-full ${
              !isChecked
                ? "bg-gradient-to-l from-[#8FA7FF] to-[#5344FF]"
                : "bg-gradient-to-l from-[#00A64C] to-[#4EE870]"
            } shadow-inner`}
          ></div>
          <div
            className={`dot shadow-switch-1 absolute left-0 -top-1 flex h-7 w-7 items-center justify-center rounded-full transition ${
              !isChecked
                ? "bg-gradient-to-t from-[#5E44FF] to-[#9281FF]"
                : "bg-gradient-to-b from-[#4EE870] to-[#00A64C] translate-x-full"
            }`}
          >
            <span className="active h-4 w-4 rounded-full  bg-white"></span>
          </div>
          <div className="bg-[#DFDFF5] border-[0.5px] border-white w-full h-full absolute -z-10 px-9 py-4 rounded-full -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 "></div>
        </div>
      </label>
      <span className="text-xl font-sf-medium  text-gray-900 dark:text-gray-300 text-center">
        {isChecked ? "Acepto con gusto" : "Lamento no asistir"}
      </span>
      <p className="text-center">
        Si tienes alguna duda o alguno de tus acompañantes no podrá asistir,
        puedes comunicarte con la wedding planner, al final de esta pagina te
        dejaremos el contacto
      </p>
      <button
        type="submit"
        className="font-sf-light primary-button text-white px-12 py-4 text-sm rounded-full mt-7"
      >
        Guardar cambios
      </button>
    </form>
  );
};

export default Formulario;
