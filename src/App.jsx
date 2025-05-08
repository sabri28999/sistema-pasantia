// Proyecto React con TailwindCSS - Registro Estudiante
import React, { useState } from "react";

const fakeRegisteredEmails = ["juan@mail.com", "ana@mail.com"];
const fakeRegisteredLegajos = [1234, 5678];

export default function RegistroEstudiante() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    legajo: "",
    fechaNacimiento: "",
    carrera: "",
    anio: "",
    habilidades: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [step, setStep] = useState("form");
  const [codigo, setCodigo] = useState("");
  const [codigoIngresado, setCodigoIngresado] = useState("");

  const validarFormulario = () => {
    const newErrors = {};
    if (!form.nombre) newErrors.nombre = "Nombre requerido";
    if (!form.apellido) newErrors.apellido = "Apellido requerido";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Email inválido";
    else if (fakeRegisteredEmails.includes(form.email)) newErrors.email = "Este correo ya está registrado";

    if (!form.legajo) newErrors.legajo = "Legajo requerido";
    else if (isNaN(form.legajo)) newErrors.legajo = "Legajo debe ser numérico";
    else if (fakeRegisteredLegajos.includes(Number(form.legajo))) newErrors.legajo = "Este legajo ya está registrado";

    if (!form.fechaNacimiento) newErrors.fechaNacimiento = "Fecha de nacimiento requerida";
    if (!form.carrera) newErrors.carrera = "Carrera requerida";
    if (!form.anio) newErrors.anio = "Año de cursada requerido";

    if (form.password.length < 6) newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Las contraseñas no coinciden";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      const codigoGenerado = Math.floor(1000 + Math.random() * 9000).toString();
      setCodigo(codigoGenerado);
      setStep("confirmacion");
      alert("Código enviado por email: " + codigoGenerado);
    }
  };

  const handleConfirmar = () => {
    if (codigoIngresado === codigo) {
      alert("¡Registro exitoso!");
      setStep("completado");
    } else {
      alert("Código incorrecto");
    }
  };

  const inputClass = "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        {step === "form" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">Registro de Estudiante</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Nombre</label>
                <input
                  type="text"
                  placeholder="Ej: Juan"
                  className={inputClass}
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                />
                {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Apellido</label>
                <input
                  type="text"
                  placeholder="Ej: Pérez"
                  className={inputClass}
                  value={form.apellido}
                  onChange={(e) => setForm({ ...form, apellido: e.target.value })}
                />
                {errors.apellido && <p className="text-red-500 text-sm mt-1">{errors.apellido}</p>}
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Correo electrónico</label>
                <input
                  type="email"
                  placeholder="Ej: estudiante@mail.com"
                  className={inputClass}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Legajo</label>
                <input
                  type="text"
                  placeholder="Ej: 12345"
                  className={inputClass}
                  value={form.legajo}
                  onChange={(e) => setForm({ ...form, legajo: e.target.value })}
                />
                {errors.legajo && <p className="text-red-500 text-sm mt-1">{errors.legajo}</p>}
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Fecha de nacimiento</label>
                <input
                  type="date"
                  className={inputClass}
                  value={form.fechaNacimiento}
                  onChange={(e) => setForm({ ...form, fechaNacimiento: e.target.value })}
                />
                {errors.fechaNacimiento && <p className="text-red-500 text-sm mt-1">{errors.fechaNacimiento}</p>}
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Carrera</label>
                <select
                  className={inputClass}
                  value={form.carrera}
                  onChange={(e) => setForm({ ...form, carrera: e.target.value })}
                >
                  <option value="">Seleccioná tu carrera</option>
                  <option>Ingeniería Electromecánica</option>
                  <option>Ingeniería Electrónica</option>
                  <option>Ingeniería en Sistemas de información</option>
                  <option>Ingeniería Química</option>
                  <option>Ingeniería Industrial</option>
                  <option>Tec. universitaria en programación</option>
                  <option>Lic. en administración rural</option>
                </select>
                {errors.carrera && <p className="text-red-500 text-sm mt-1">{errors.carrera}</p>}
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Año de cursada</label>
                <select
                  className={inputClass}
                  value={form.anio}
                  onChange={(e) => setForm({ ...form, anio: e.target.value })}
                >
                  <option value="">Seleccioná el año</option>
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>{n}°</option>
                  ))}
                </select>
                {errors.anio && <p className="text-red-500 text-sm mt-1">{errors.anio}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-600 mb-1">Conocimientos y habilidades</label>
                <textarea
                  placeholder="Describe tus habilidades técnicas, idiomas, certificaciones, etc."
                  className={inputClass}
                  maxLength={300}
                  value={form.habilidades}
                  onChange={(e) => setForm({ ...form, habilidades: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Contraseña</label>
                <input
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  className={inputClass}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Confirmar contraseña</label>
                <input
                  type="password"
                  placeholder="Repetir contraseña"
                  className={inputClass}
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 mt-4"
            >
              Registrarse
            </button>
          </form>
        )}

        {step === "confirmacion" && (
          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-blue-700 text-center">Confirmación</h2>
            <p className="text-gray-700 text-center">Revisá tu correo y colocá el código de confirmación</p>
            <input
              type="text"
              placeholder="Código de confirmación"
              className={inputClass}
              value={codigoIngresado}
              onChange={(e) => setCodigoIngresado(e.target.value)}
            />
            <button
              onClick={handleConfirmar}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
            >
              Confirmar
            </button>
          </div>
        )}

        {step === "completado" && (
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-bold text-green-700">¡Registro completado!</h2>
            <p className="text-gray-600">Ya podés iniciar sesión en el sistema de pasantías.</p>
          </div>
        )}
      </div>
    </div>
  );
}
