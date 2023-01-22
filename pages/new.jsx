import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

export default function New() {
  const router = useRouter()
  const inputTitleRef = useRef();
  const inputPlotRef = useRef();
  // const [form, setForm] = useState({
  //   title: "",
  //   plot: ""
  // })
  const [errorMessages, setErrorMessages] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      title: inputTitleRef.current.value,
      plot: inputPlotRef.current.value,
    });
    postData({
      title: inputTitleRef.current.value,
      plot: inputPlotRef.current.value,
    })
  };

  const postData = async (form) => {
    try {
      const res = await fetch("/api/movie", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if(!data.success){
        let newErrors = []
        for (const key in data.error.errors) {
          const error = data.error.errors[key];
          newErrors.push(error.message)
        }
        setErrorMessages(newErrors)
      } else {
        router.push("/")
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <h1 className="my-3">Agregar movie</h1>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputTitleRef}
          type="text"
          className="form-control my-2"
          placeholder="Title"
          name="title"
          autoComplete="off"
        />
        <input
          ref={inputPlotRef}
          type="text"
          className="form-control my-2"
          placeholder="Plot"
          name="plot"
          autoComplete="off"
        />
        {/* <input
          type="text"
          className="form-control my-2"
          placeholder="Title"
          name="title"
          autoComplete="off"
          value={form.title}
          onChange={(e)=>{
            const { value, name } = e.target
            setForm(p=>({
              ...p,
              [name]: value
            }))
          }}
        />
        <input
          type="text"
          className="form-control my-2"
          placeholder="Plot"
          name="plot"
          autoComplete="off"
          value={form.plot}
          onChange={(e)=>{
            const { value, name } = e.target
            setForm(p=>({
              ...p,
              [name]: value
            }))
          }}
        /> */}
        {errorMessages.map((errorMessage) => (
          <p key={errorMessage}>{errorMessage}</p>
        )) }
        <button className="btn btn-primary w-100 my-2" type="submit">
          Agregar
        </button>
        <Link href="/" className="btn btn-warning w-100">
          {/* <a className="btn btn-primary w-100">Volver...</a> */}
          Volver...
        </Link>
      </form>
    </div>
  );
}
